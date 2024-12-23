import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Form} from "react-bootstrap";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

 

export default function Calculator(){

    const {register, handleSubmit, formState:{errors}} = useForm();
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [submitted, setSubmitted] = useState(false);


    const getDistanceBetweenPoints = (latitude1, longitude1, latitude2, longitude2, unit = "miles") => {

    let theta = longitude1 - longitude2;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
      );
    if (unit === "miles") {
      return Math.round(distance * 100) / 100; 
    } else if (unit === "kilometers") {
      return Math.round(distance * 1.609344 * 100) / 100; 
    }
  };

    

    async function submitForm(data){

        const {origin, dest} = data;
        setErrorMessage(null);
        setDistance(null);
        setSubmitted(false);

        try {
            
            const originResponse = await fetch(
              `${serverUrl}/calculator?iata=${origin}`,
              {
                method: "GET",
              }
            );
            if (!originResponse.ok) {
              throw new Error(`Failed to fetch origin airport: ${originResponse.status}`);
            }
            const originData = await originResponse.json();
      
            
            const destResponse = await fetch(
              `${serverUrl}/calculator?iata=${dest}`,
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
                "kilometers"
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
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3">
            <Form.Label>Origin Airport:</Form.Label>
            <Form.Control type="text" placeholder="" {...register('origin', { required: true })} className={errors.origin ? "is-invalid" : ""} />
                {errors.origin && <div className="invalid-feedback">This field is required</div>}
            </Form.Group>
        <br />
        <br />
            <Form.Group className="mb-3">
            <Form.Label>Destination Airport:</Form.Label>
            <Form.Control type="text" placeholder="" {...register('dest', {required:true})} className={errors.dest ? "is-invalid" : ""} />
                {errors.dest && <div className="invalid-feedback">This field is required</div>}
                
            </Form.Group>
        <br />
        <Button variant="primary" type="submit">Submit</Button>
    </Form>
         {submitted && (
            <div style={{ marginTop: "20px" }}>
              {distance !== null && (
                <h5>The distance between the two airports is: <strong>{distance}</strong> kilometers</h5>
              )}
              {errorMessage && (
                <h5 style={{ color: "red" }}>Error: {errorMessage}</h5>
              )}
            </div>
          )}
         </>
      );
  
    };
