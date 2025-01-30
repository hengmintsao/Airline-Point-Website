import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import AutoComplete from "@/components/AutoComplete";

/* =============================================================History==============================================================================
1. Date: 2024-Dec-22 Description: Update calculator.js. Basic features, connect to API to get info, calculate miles by two airports. #TO-DO: Add swap button feature to origin and dest airport
2. Date: 2024-Dec-23 Description: Swap feature complete. #TO-DO: UI, but currently no ideas at the moment
3. Date: 2025-Jan-23 Description: CSS Added(Still working). #TO-DO: Might need AutoComplete here
4. Date: 2025-Jan-28 Description: CSS Added, AutoComplete complete. #TO-DO:

=====================================================================================================================================================
*/


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

 

export default function Calculator(){

  const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
  const [distance, setDistance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [airportOption, setAirportOption] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);

  useEffect(() => {
    async function fetchAirports() {
      try {
        const response = await fetch("/api/airport");
        if (!response.ok) {
          throw new Error("Failed to fetch airline data");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
      }
      const airports = data.map((airport) => airport.displayName || "Unknown Airport");
        setAirportOption(airports);
      } catch (err) {
        setErrorMessage(err.message);
        setAirportOption([]);
      }
    }

    fetchAirports();
  }, []);




    
    // Handle Swap
    function handleSwap(){ 
      const currentOrigin = getValues("origin");
      const currentDest = getValues("dest");
      
      setValue("origin", currentDest);
      setValue("dest", currentOrigin);
      setOrigin(currentDest);
      setDest(currentOrigin);
    };


    //Calculation function
    const getDistanceBetweenPoints = (latitude1, longitude1, latitude2, longitude2) => {

    let theta = longitude1 - longitude2;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
      );
    
      return Math.round(distance); 
    
  };

    

    async function submitForm(data){

        let {origin, dest} = data;
        console.log("Origin is: ", origin);
        console.log("Dest is :", dest);
        if (!origin || !dest) {
          setErrorMessage("Please select both Origin and Destination airports.");
          setSubmitted(true);
          return;
        }

        let originShort = origin.slice(0, 3);
        let destShort = dest.slice(0,3);
        setErrorMessage(null);
        setDistance(null);
        setSubmitted(false);

        try {
            
          // Origin 
            const originResponse = await fetch(
              `${serverUrl}/api/user/calculator?iata=${originShort}`,
              {
                method: "GET",
              }
            );
            if (!originResponse.ok) {
              throw new Error(`Failed to fetch origin airport: ${originResponse.status}`);
            }
            const originData = await originResponse.json();
      
            // Destination
            const destResponse = await fetch(
              `${serverUrl}/api/user/calculator?iata=${destShort}`,
              {
                method: "GET",
              }
            );
            if (!destResponse.ok) {
              throw new Error(`Failed to fetch destination airport: ${destResponse.status}`);
            }
            const destData = await destResponse.json();

            const calculatedDistance = getDistanceBetweenPoints(
                originData.latitude,
                originData.longitude,
                destData.latitude,
                destData.longitude,
              );
        
              setDistance(calculatedDistance);
              setSubmitted(true);
            } catch (error) {
              setErrorMessage(error.message);
              setSubmitted(true);
            }
    };
    

    return (
        <>
        <div className="calculator-form">
        <h2 className="text-center">Airport Distance Calculator</h2>
        <h5 className="text-center">Please enter airport iata code or airport name</h5>
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className="form-row">
            <Form.Group className="form-group">
            <Form.Label>*Origin Airport:</Form.Label>
            <AutoComplete type="text" id="origin" name="origin" value={getValues("origin")} options={Array.isArray(airportOption) ? airportOption : []} onChange={(value) => {
             setValue("origin", value); setOrigin(value || ""); }}  />
                {errors.origin && <div className="invalid-feedback">This field is required</div>}
            </Form.Group>
        <br />
        <Image src="/pics/repeat-line.png"
                      alt="repeat-line"
                      className="swap-icon"
                      onClick={handleSwap} />
        {/* <Button variant="primary" onClick={handleSwap}>Swap</Button> */}
        <br />
            <Form.Group className="form-group">
            <Form.Label>*Destination Airport:</Form.Label>
            <AutoComplete type="text" id="dest" name="dest" value={getValues("dest")} options={Array.isArray(airportOption) ? airportOption : []} onChange={(value) => {
              setValue("dest", value); setDest(value || ""); }}  />
                {errors.dest && <div className="invalid-feedback">This field is required</div>}
                
            </Form.Group>
        <br />
        <Button variant="primary" type="submit">Submit</Button>
        </div>
    </Form>
        {/*submit pop-up information*/}
         {submitted && (
            <div style={{ marginTop: "20px" }}>
              {distance !== null && (
                <h5>The distance between the two airports is: {distance} miles</h5>
              )}
              {errorMessage && (
                <h5 style={{ color: "red" }}>Error: {errorMessage}</h5>
              )}
            </div>
          )}
          </div>
         </>
      );
  
    };
