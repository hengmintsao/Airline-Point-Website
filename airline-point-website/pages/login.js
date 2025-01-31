import { Card, Button, Form, Alert} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { getComparsion, getHistory } from "@/lib/userData";
import { useAtom } from "jotai";
import { comparsionAtom, searchHistoryAtom } from "@/store";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: Create Login page, input user and password  #TO-DO: Test
2. Date: 2025-Jan-28 Description: Update CSS(Complete)  #TO-DO: Test
3. Date: 2025-Jan-29 Description: Revise required * symbols  #TO-DO: Test



=====================================================================================================================================================
*/



export default function Login(props){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const [comparsionList, setComparsionList] = useAtom(comparsionAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();


    // Fetch comparsion and history list and set into comparsionlist and history list
    async function updateAtoms(){
        setComparsionList(await getComparsion());
        setSearchHistory(await getHistory());
    }


    // Function to handle after submit, authenticate user, fetch and push to comparsion page
    async function handleSubmit(e){
        e.preventDefault();
        try{
            await authenticateUser(user, password); // Authenticates user
            await updateAtoms(); 
            router.push('/');
        }catch(err){
            setWarning(err.message);
        }
    }



    return (
        <>
        {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
        <div className="login-form">
        <h2 className="text-center">Login</h2>
        <h5 className="text-center">Enter your login information below:</h5>
      
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
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      </div>
        </>
    );
}