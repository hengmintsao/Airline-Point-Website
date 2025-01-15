import { registerUser } from "@/lib/authenticate";
import AutoComplete from "@/components/AutoComplete";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: Create Register page, basic implementation   #TO-DO: AutoComplete(Not yet finished, has errors)



=====================================================================================================================================================
*/


export default function Register(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nationality, setNationality] = useState("");
    const [mainAirport, setMainAirport] = useState("");
    const [preferenceCarrier, setPreferenceCarrier] = useState("");
    const [preferenceAlliance, setPreferenceAlliance] = useState("");
    const [warning , setWarning] = useState("");
    const [nationalityOption, setNationalityOption] = useState([]);
    

    // Has CORS errors
    useEffect(() =>{

        async function fetchAllNationalityDetails(){

            try{
                const response = await fetch(`https://www.apicountries.com/countries`);
                if(!response.ok){
                    throw new Error("Failed to fetch countries details");
                }
                const data = await response.json();
                const countries = data.map((country) =>country.name);
                setNationalityOption(countries);
            }catch(err){
                setWarning(err.message);
                setNationalityOption([]);
            }
        
            
        }
        
        fetchAllNationalityDetails();
    },[]);

    const {name} = nationalityOption; // has error

    const router = useRouter();

async function handleSubmit(e){
    e.preventDefault();
    try{
        await registerUser(user, password, password2, nationality, mainAirport, preferenceCarrier, preferenceAlliance);
        router.push('/login');

    }catch(err){
        setWarning(err.message);
    }
}


return(
    <>
    {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" id="userName" name="userName" onChange={e => setUser(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label><Form.Control type="password" id="password2" name="password2" onChange={e => setPassword2(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
            {/* has to fix */}
          <Form.Label>Nationality:</Form.Label><AutoComplete ooptions={Array.isArray(nationalityOption) ? nationalityOption : []} onChange={(value) => setNationality(value || "")}/>
        </Form.Group>
        <br />
        <br />
        <br />
        <Form.Group>
          <Form.Label>Main Airport:</Form.Label><Form.Control type="text" id="nationality" name="nationality" onChange={e => setMainAirport(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Preference Carrier:</Form.Label><Form.Control type="text" id="nationality" name="nationality" onChange={e => setPreferenceCarrier(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Preference Alliance:</Form.Label><Form.Control type="text" id="nationality" name="nationality" onChange={e => setPreferenceAlliance(e.target.value)}/>
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
    
)


}