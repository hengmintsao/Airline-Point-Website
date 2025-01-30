import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart"; // https://www.npmjs.com/package/react-minimal-pie-chart
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-09 Description: Implement select airline, enter mileage, earn type(with "+" button to create new earn type) and find resource online to implement piechart. #TO-DO: add input cost for each earn type. 
2. Date: 2025-Jan-11 Description: Basic history feature completed.   #TO-DO: only MileCostCalculator history completed, might consider others calculator?
3. Date: 2025-Jan-17 Description: Add addToHistory, update submitform function   #TO-DO: Haven't test
4. Date: 2025-Jan-24 Description: Update CSS for piechart, redesign costPerMile calculator   #TO-DO: Haven't test
5. Date: 2025-Jan-29 Description: Update a function to check if history is exceed limit   #TO-DO: Haven't test



=====================================================================================================================================================
*/

// This CostPerMiles calculator allows users to calculate the cost of earning required miles.
// Users can input their desired mileage, select earning types (By flights, buying points...etc),
// and add costs for each earning type. The data is then visualized using a pie chart.
export default function CostPerMiles() {
  //const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [airlineName, setAirlineName] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [typeGroup, setTypeGroup] = useState([{ id: 1 }]); //set typeGroup into a array
  const [pieChartData, setPieChartData] = useState([]); // set piechart data to an empty array
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [costPerMile, setCostPerMile] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const response = await fetch("/api/airline");
        if (!response.ok) {
          throw new Error("Failed to fetch airline data");
        }
        const data = await response.json();
        setAirlineName(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchAirlines();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // increase TypeGroup by 1
  function addTypeGroup() {
    setTypeGroup((prev) => [...prev, { id: prev.length + 1 }]); // add 1
  }

  // Calculate mileages into pieChartData
  function calculatePieChartData(data) {
    /*
        1.By flight #FF0000  Red 
        2.By buying points #FF8000  Orange
        3.By credit card program #3333FF  Blue
        4.Others #00CC66  Green
        */
    const chartData = [
      { title: "By flight", value: 0, color: "#FF0000" },
      { title: "By buying points", value: 0, color: "#FF8000" },
      { title: "By credit card program", value: 0, color: "#3333FF" },
      { title: "Others", value: 0, color: "#CC0066" },
    ];

    typeGroup.forEach((group) => {
      const type = data[`type_${group.id}`];
      const mileage = parseInt(data[`typeNumber_${group.id}`], 10 || 0);

      // By flight
      if (type === "1") {
        chartData[0].value += mileage;
      }

      // By buying points
      if (type === "2") {
        chartData[1].value += mileage;
      }

      // By credit card program
      if (type === "3") {
        chartData[2].value += mileage;
      }

      // By Others
      if (type === "4") {
        chartData[3].value += mileage;
      }
    });

    return chartData.filter((pie) => pie.value > 0); // filter if the value is 0
  }

  async function submitForm() {
    const data = getValues();
    //console.log(data); //test code

    if(searchHistory.length >= 20){
      alert("You have reached the maximum limit of 20 history records. Please delete old records at 'Search History' to add new ones.");
      return;
    }


    let totalMileage = 0;
    let totalCost = 0;
    const formattedHistory = [];

    const typeDescriptions = {
        1: "By flight",
        2: "By buying points",
        3: "By credit card program",
        4: "Others",
      };

      typeGroup.forEach((group) => {
        const type = data[`type_${group.id}`];
        const mileage = parseInt(data[`typeNumber_${group.id}`], 10) || 0;
        const cost = parseFloat(data[`typeCost_${group.id}`]) || 0;
        const description = data[`description_${group.id}`] || "None";
  
        totalMileage += mileage;
        totalCost += cost;
  
        if (type && mileage > 0) {
          formattedHistory.push({
            type: typeDescriptions[type],
            mileage,
            cost,
            description,
            
          });
        }
      });
  
      const costPerMile = totalMileage > 0 ? (totalCost / totalMileage).toFixed(2) : 0;
      setCostPerMile(costPerMile);
      setTotalMileage(totalMileage);

    const chartData = calculatePieChartData(data);
    //console.log('PieChart Data:', chartData); //test code
    setPieChartData(chartData);

    try {
        const formattedData = { airline: data.airline, history: formattedHistory, totalMileage,  costPerMile};
        await addToHistory(formattedData);
        //console.log("History successfully added"); // test code
        setSearchHistory((prev) => [...prev, formattedData]);
    } catch (error) {
        console.error("Failed to add history:", error);
    }
    setSubmitted(true);
    //setSearchHistory(await addToHistory(data));

    // setSearchHistory(current => {
    //     const newHistory = [...current, data];
    //     //console.log('After push -> newHistory:', newHistory); // test code

    //     return newHistory;
    //   });
   
  }

  return (
    <>
    <div className="cost-per-mile-form">
        <h2 className="text-center">Mile Cost Calculator</h2>
        <h5 className="text-center">Please select airline, earn type, and input miles you need and the cost of the miles.</h5>
        <h5 className="text-center">The calculation and pie chart will shown after click submit button</h5>
        <h5 className="text-center">(You can store up to 20 searches in 'Search History')</h5>
      <Form onSubmit={handleSubmit(submitForm)} className="form-group">
        {/*1. Select airline */}
        <Form.Group className="form-group">
          <Form.Label className="form-label">*Please select your airline:</Form.Label>
          <select
            {...register("airline", { required: true })}
            className={`form-select ${errors.airline ? "is-invalid" : ""}`}
          >
            <option value="" defaultValue>
              Choose...
            </option>
            {airlineName.map((airline, index) => (
              <option key={index} value={airline.id}>
                {airline.Name}
              </option>
            ))}
          </select>
          {errors.airline && (
            <div className="invalid-feedback">
              You have to select one airline
            </div>
          )}
        </Form.Group>

        {/*2. Earn type */}
        {typeGroup.map((group) => {
          return (
            <Form.Group key={group.id} className="form-group">
              <Form.Label className="form-label">*Please select your earn type:</Form.Label>
              <select
                {...register(`type_${group.id}`, { required: true })}
                className={`form-select ${errors[`type_${group.id}`] ? "is-invalid" : ""}`}
              >
                <option value="" defaultValue>
                  Choose...
                </option>
                <option value="1">By flight</option>
                <option value="2">By buying points</option>
                <option value="3">By credit card program</option>
                <option value="4">Others</option>
              </select>
              <br />
              {errors[`type_${group.id}`] && (
                <div className="form-error">This field is required</div>
              )}
            {/*3. Mileage */} 
            <Form.Label className="form-label">*Please enter mileages:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Please enter the mileage you earn"
                {...register(`typeNumber_${group.id}`, { required: true })}
                className={`form-input ${errors[`typeNumber_${group.id}`] ? "is-invalid" : ""}`}
              />
              {errors[`typeNumber_${group.id}`] && (
                <div className="form-error">Mileage is required</div>
              )}
              
              {/*4. Cost */} 
              <Form.Label className="form-label">*Please enter cost:</Form.Label>
              <Form.Control
              type="number"
              placeholder="Please enter the cost"
              {...register(`typeCost_${group.id}`, { required: true })}
              className={`form-input ${errors[`typeCost_${group.id}`] ? "is-invalid" : ""}`}
            />
            {errors[`typeCost_${group.id}`] && (
              <div div className="form-error">Cost is required</div>
            )}
              <Form.Label className="form-label">Please enter description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description is optional"
                {...register(`description_${group.id}`)}
                className="form-input"
              />
            </Form.Group>
          );
        })}
        {/* + button */}
        <div className="button-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={addTypeGroup}
          >
            +
          </button>

          <Button variant="primary" type="submit" className="btn-primary">
            Submit
          </Button>
        </div>
      </Form>
      {/*submit pop-up information*/}
      {submitted && (
        <div className="result-section">
        <div className="pie-chart-container">
          <PieChart
            data={pieChartData}
            animate={true}
            animationDuration={1000}
            animationEasing="ease-out"
            onClick={(e, index) => console.log(`Clicked segment: ${index}`)}
            label={({ dataEntry }) =>
              `${dataEntry.value} (${Math.round(dataEntry.percentage)}%)`
            }
            labelStyle={() => ({
              fill: "black",
              fontSize: "5px",
              fontFamily: "sans-serif",
            })}
            labelPosition={60}
          />
        </div>
        <div className="result-container">
            <h4>Total Miles: ${totalMileage}</h4>
            <h4>Cost Per Mile: ${costPerMile}</h4>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
