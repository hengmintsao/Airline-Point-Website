import { registerUser } from "@/lib/authenticate";
import AutoComplete from "@/components/AutoComplete";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: Create Register page, basic implementation   #TO-DO: AutoComplete(Not yet finished, has errors)
1. Date: 2025-Jan-28 Description: AutoComplete finished, Update CSS   #TO-DO: 


=====================================================================================================================================================
*/


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Register(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [nationality, setNationality] = useState("");
    const [mainAirport, setMainAirport] = useState("");
    const [preferenceCarrier, setPreferenceCarrier] = useState("");
    const [preferenceAlliance, setPreferenceAlliance] = useState("");
    const [warning , setWarning] = useState("");
    const [nationalityOption, setNationalityOption] = useState([]);
    const [airportOption, setAirportOption] = useState([]);
    

    // Has CORS errors
    useEffect(() =>{

        async function fetchAllNationalityDetails(){

            try{
                const response = await fetch(`${serverUrl}/api/users/countries`);
                if(!response.ok){
                    throw new Error("Failed to fetch countries details");
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                  throw new Error("Invalid data format received");
              }
              const countries = data.map((country) => country.name || "Unknown Country");
                console.log("Those datas are: ", countries); // test codes
                setNationalityOption(countries);

            }catch(err){
                setWarning(err.message);
                setNationalityOption([]);
            }
        
            
        }
        
        fetchAllNationalityDetails();
    },[]);


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
          setWarning(err.message);
          setAirportOption([]);
        }
      }
  
      fetchAirports();
    }, []);

    
    const router = useRouter();

async function handleSubmit(e){
    e.preventDefault();
    console.log("Submitting with nationality:", nationality);
    try{
        await registerUser(user, password, password2, email, nationality, mainAirport, preferenceCarrier, preferenceAlliance);
        router.push('/login');

    }catch(err){
        setWarning(err.message);
    }
}


return(
    <>
    {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
    <div className="register-form">
        <h2 className="text-center">Register</h2>
        <h5 className="text-center">Enter information below:</h5>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>*User:</Form.Label><Form.Control type="text" id="userName" name="userName" onChange={e => setUser(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>*Password:</Form.Label><Form.Control type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>*Confirm Password:</Form.Label><Form.Control type="password" id="password2" name="password2" onChange={e => setPassword2(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>*Email:</Form.Label><Form.Control type="text" id="email" name="email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <br/ >
        <Form.Group>
          <Form.Label>*Nationality:</Form.Label><AutoComplete id="nationality" name="nationality" options={Array.isArray(nationalityOption) ? nationalityOption : []} onChange={(value) => {
        /*console.log("Selected nationality:", value);*/ setNationality(value || ""); /*console.log("Nationality options:", nationalityOption);*/}}  /> 
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>*Main Airport:</Form.Label><AutoComplete type="text" id="origin" name="origin" options={Array.isArray(airportOption) ? airportOption : []} onChange={(value) => {
                        setMainAirport(value || ""); }}  />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Preference Carrier:</Form.Label><Form.Control type="text" id="preferenceCarrier" name="preferenceCarrier" placeholder="Optional" onChange={e => setPreferenceCarrier(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Preference Alliance:</Form.Label><Form.Control type="text" id="preferenceAlliance" name="preferenceAlliance" placeholder="Optional" onChange={e => setPreferenceAlliance(e.target.value)}/>
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
      </div>
    </>
    
)


}