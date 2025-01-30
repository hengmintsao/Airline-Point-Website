import { Form, Button } from "react-bootstrap";
import { useEffect, useState} from "react";
import { getToken } from "@/lib/authenticate";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-29 Description: Try to get profile data from mongoDB(haven't finished yet)  #TO-DO: Finish it
2. Date: 2025-Jan-30 Description: Finish get profile data from mongoDB and CSS  #TO-DO: Add edit feature

=====================================================================================================================================================
*/

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Profile(){

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    
    const token = getToken();
    
    useEffect(() => {


        async function fetchUserData() {
            try {
                const response = await fetch(`${serverUrl}/api/user/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUserData();
    }, []);

    
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="profile-container">
            
                <Form className="form">
                    <h3 className="title">User Profile</h3>
                    <div className="info-row">
                        <h5>User: {userData?.userName}</h5>
                    </div>
                    <div className="info-row">
                        <h5>Email: {userData?.email}</h5>
                    </div>
                    <div className="info-row">
                        <h5>Nationality: {userData?.nationality}</h5>
                    </div>
                    <div className="info-row">
                        <h5>Main Airport: {userData?.mainAirport}</h5>
                    </div>
                    <div className="info-row">
                        <h5>Preference Carrier: {userData?.preferenceCarrier?.join(", ") || "None"}</h5>
                    </div>
                    <div className="info-row">
                        <h5>Preference Alliance: {userData?.preferenceAlliance?.join(", ") || "None"}</h5>
                    </div>
                    <Button className="edit-button" href="/editProfile">Edit</Button>
                </Form>
            
        </div>
    );

}