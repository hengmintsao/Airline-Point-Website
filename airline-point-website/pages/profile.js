import { readToken } from "@/lib/authenticate";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState} from "react";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-29 Description: Try to get profile data from mongoDB(haven't finished yet)  #TO-DO: 


=====================================================================================================================================================
*/

export default function Profile(){

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        if (!userName) {
            setError("UserName not found");
            return;
        }

        async function fetchUserData() {
            try {
                const response = await fetch(`/api/user/profile/${userName}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
    }, [userName]);

    
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {userData && (
                <Form>
                    <h3>User: {userData.userName}</h3>
                    <h3>Email: {userData.email}</h3>
                    <h3>Nationality: {userData.nationality}</h3>
                    <h3>Main Airport: {userData.mainAirport}</h3>
                    <h3>Preference Carrier: {userData.preferenceCarrier?.join(", ") || "None"}</h3>
                    <h3>Preference Alliance: {userData.preferenceAlliance?.join(", ") || "None"}</h3>
                </Form>
            )}
        </>
    );

}