import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import AutoComplete from "@/components/AutoComplete";

/* =============================================================History==============================================================================
1. Date: 2024-Dec-22 Description: Update calculator.js. Basic features, connect to API to get info, calculate miles by two airports. #TO-DO: Add swap button feature to origin and dest airport
2. Date: 2024-Dec-23 Description: Swap feature complete. #TO-DO: UI, but currently no ideas at the moment
3. Date: 2025-Jan-23 Description: CSS Added(Still working). #TO-DO: Might need AutoComplete here
4. Date: 2025-Jan-27 Description: CSS Added. #TO-DO: Might need AutoComplete here

=====================================================================================================================================================
*/




const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

 

export default function Calculator(){

    const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    
    // Handle Swap
    function handleSwap(){ 
      const currentOrigin = getValues("origin");
      const currentDest = getValues("dest");
      
      setValue("origin", currentDest);
      setValue("dest", currentOrigin);
      
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

        const {origin, dest} = data;
        setErrorMessage(null);
        setDistance(null);
        setSubmitted(false);

        try {
            
          // Origin 
            const originResponse = await fetch(
              `${serverUrl}/api/user/calculator?iata=${origin}`,
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
              `${serverUrl}/api/user/calculator?iata=${dest}`,
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
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className="form-row">
            <Form.Group className="form-group">
            <Form.Label>Origin Airport:</Form.Label>
            <Form.Control type="text" placeholder="" {...register('origin', { required: true })} className={errors.origin ? "is-invalid" : ""} />
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
            <Form.Label>Destination Airport:</Form.Label>
            <Form.Control type="text" placeholder="" {...register('dest', {required:true})} className={errors.dest ? "is-invalid" : ""} />
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
