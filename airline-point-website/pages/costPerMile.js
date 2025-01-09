import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";



export default function CostPerMiles(){

    const {register, handleSubmit, getValues, formState:{errors}} = useForm();
    const [airlineName, setAirlineName] = useState([]);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [typeGroup, setTypeGroup] = useState([{ id: 1 }]); //set typeGroup into a array

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
    
    async function submitForm(){
        const data = getValues();
        console.log(data);
        setSubmitted(true);
    }

    // increase TypeGroup by 1
    function addTypeGroup() {
        setTypeGroup((prev) => [...prev, { id: prev.length + 1 }]); // add 1
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
            <div style={{ marginTop: "20px" }}>
              {distance !== null && (
                <h5>The distance between the two airports is: <strong>{distance}</strong> miles</h5>
              )}
              {errorMessage && (
                <h5 style={{ color: "red" }}>Error: {errorMessage}</h5>
              )}
            </div>
          )}
         </>
        // <>
        // {/*1.Please input the airline and miles required: */}
        // <div class="input-group mb-3">
        // <label class="input-group-text" for="inputGroupSelect01">Please select airline</label>
        // <select class="form-select" id="inputGroupSelect01">
        // <option selected>Choose...</option>
        // {/*select airline */}
        // {airlineName.map((airline, index) => (
        //     <option key={index} value={airline.id}>
        //       {airline.Name}
        //     </option>
        //   ))}
        // </select>
        // </div>
        // <br />
        // <div class="mb-3">
        // <label for="mileControlInput" class="form-label">Please enter the mileages:</label>
        // <input type="number" class="form-control" id="mileControlInput" placeholder=""></input>
        // </div>
        // </>
        
        

        //2.Please insert your method of earning mileage: by flying, credit card program, buying points from their website....
        //  Bootstrap range https://getbootstrap.com/docs/5.3/forms/range/
        //  Input groups https://getbootstrap.com/docs/5.3/forms/input-group/


        //3. submit and show the result (Hope there is a pie chart or something which and have visialization format to see the miles)
    )
}