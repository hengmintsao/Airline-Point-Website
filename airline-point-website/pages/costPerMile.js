import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart"; // https://www.npmjs.com/package/react-minimal-pie-chart


/* =============================================================History==============================================================================
1. Date: 2025-Jan-09 Description: Implement select airline, enter mileage, earn type(with "+" button to create new earn type) and find resource online to implement piechart. #TO-DO: add input cost for each earn type. 



=====================================================================================================================================================
*/

// This CostPerMiles calculator allows users to calculate the cost of earning required miles.
// Users can input their desired mileage, select earning types (By flights, buying points...etc), 
// and add costs for each earning type. The data is then visualized using a pie chart.
export default function CostPerMiles(){

    const {register, handleSubmit, getValues, formState:{errors}} = useForm();
    const [airlineName, setAirlineName] = useState([]);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [typeGroup, setTypeGroup] = useState([{ id: 1 }]); //set typeGroup into a array
    const [pieChartData, setPieChartData] = useState([]); // set piechart data to an empty array

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
    function calculatePieChartData(data){

        /*
        1.By flight #FF0000  Red 
        2.By buying points #FF8000  Orange
        3.By credit card program #3333FF  Blue
        4.Others #00CC66  Green
        */
        const chartData = [
            { title: 'By flight', value: 0, color: '#FF0000' },
            { title: '', value: 0, color: '#FF8000' },
            { title: 'By credit card program', value: 0, color: '#3333FF' }, 
            { title: 'Others', value: 0, color: '#CC0066' },
          ];


          typeGroup.forEach((group) =>{
            
            const type = data[`type_${group.id}`];

            const mileage = parseInt(data[`typeNumber_${group.id}`], 10 || 0); 

            // By flight
            if(type === "1"){
                chartData[0].value += mileage;
            }
            
            // By buying points
            if(type === "2"){
                chartData[1].value += mileage;
            }

            // By credit card program
            if(type === "3"){
                chartData[2].value += mileage;
            }

            // By Others
            if(type === "4"){
                chartData[3].value += mileage;
            }
          })

          return chartData.filter((pie) => pie.value > 0); // filter if the value is 0
    }

    function submitForm(){
        const data = getValues();
        //console.log(data); test code

        const chartData = calculatePieChartData(data);
        //console.log('PieChart Data:', chartData); //test code
        setPieChartData(chartData);

        setSubmitted(true);
    }


    return(
        <>
        <Form onSubmit={handleSubmit(submitForm)}>
            {/*1. Select airline */}
            <Form.Group className="mb-3">
            <Form.Label>Please select your airline:</Form.Label>
            <select {...register('airline', { required: true })} className={errors.airline ? "is-invalid" : ""} >
                <option value="" defaultValue>Choose...</option>
                    {airlineName.map((airline, index) => (
                <option key={index} value={airline.id}>
                {airline.Name}
                </option>
            ))}
            </select>
            {errors.airline && <div className="invalid-feedback">You have to select one airline</div>}
            </Form.Group>
            <br />

            {/*2. Enter mileage */}
            <Form.Group className="mb-3">
            <Form.Label>Please enter the mileages you required:</Form.Label>
            <Form.Control type="number" placeholder="" {...register('mileage', {required:true})} className={errors.mileage ? "is-invalid" : ""} />
                {errors.mileage && <div className="invalid-feedback">This field is required</div>}   
            </Form.Group>
            <br />

            {/*3. Earn type */}
            {typeGroup.map((group)=>{
                return(
                <Form.Group key={group.id} className="mb-3">
                    <Form.Label>Please add your earn type:</Form.Label>
                    <select {...register(`type_${group.id}`, { required: true })} className={errors[`type_${group.id}`]? "is-invalid" : ""} >
                    <option value="" defaultValue>Choose...</option>
                    <option value="1">By flight</option>
                    <option value="2">By buying points</option>
                    <option value="3">By credit card program</option>
                    <option value="4">Others</option>
                    </select>
                    {errors[`type_${group.id}`] && ( <div className="invalid-feedback">This field is required</div>)}

                    <Form.Control type="number" placeholder="Please enter the mileage you earn" {...register(`typeNumber_${group.id}`, { required : true })} />
                    {errors[`typeNumber_${group.id}`] && (<div className="invalid-feedback">Mileage is required</div>)}
                    <br />
                    <Form.Control type="text" placeholder="Description is optional" {...register('description')} />

                </Form.Group>
                );
            })}
            {/* + button */}
            <button type="button" className="btn btn-secondary" onClick={addTypeGroup}>+</button>
            
        <Button variant="primary" type="submit">Submit</Button>
    </Form>
        {/*submit pop-up information*/}
         {submitted && (
            <PieChart data={pieChartData}/> // Pie chart
            
          )}
         </>
    )
}