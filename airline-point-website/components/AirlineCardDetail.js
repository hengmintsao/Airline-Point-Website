import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { comparsionAtom } from "@/store";
import { addToComparsion, removeComparsion } from "@/lib/userData";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: The code needs to be concise. Remove any unnecessary or unused code during subsequent reviews
2. Date: 2025-Jan-12 Description: Using Jotai to implement comparsion table(similar to shopping cart feature), add/delete in AirlineCardDetail.js and shown on comparsion.js. #TO-DO: might need to change required information.
3. Date: 2025-Jan-17 Description: Change showAdded, update useEffect and import from userdata to fit features #TO-DO: might need to change required information.
4. Date: 2025-Jan-22 Description: Add CSS feature. #TO-DO: Test 
5. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None
=====================================================================================================================================================
*/

export default function AirlineCardDetail({id}){
    const [airline, setAirline] = useState(null);
    const [error, setError] = useState(null);
    const [comparsionList, setComparsionList] = useAtom(comparsionAtom);
    const [showAdded, setShowAdded] = useState(false); 

    // Function to control comparsion List, change to async
    async function comparsionClicked(){
      if(showAdded === true){
        setComparsionList(await removeComparsion(id));
        setShowAdded(false);
      }else{
        setComparsionList(await addToComparsion(id)); 
        setShowAdded(true);
      }
    }

    useEffect(() => {
      
      setShowAdded(comparsionList?.includes(id)); 
      
    }, [comparsionList, id]);

    useEffect(() =>{
        async function fetchAirlineDetails(){

            try{
                const response = await fetch(`/api/airlines/${id}`);
                if(!response.ok){
                    throw new Error("Failed to fetch airline details");
                }
                const data = await response.json();
                setAirline(data);
            }catch(err){
                setError(err.message);
            }
        }
        if(id){
            fetchAirlineDetails();
        }
    },[id]);

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!airline) {
      return <p>Loading...</p>;
    }

    const { Name, Code, Alliance, Website, Image, Advantage, Disadvantage } = airline;
    console.log("the pics is", Image);
    return (
        <Card className="airline-card-detail">
          <Card.Img
            variant="top"
            src={Image || "https://via.placeholder.com/375x375.png?text=No+Image+Available"}
            alt={Name || "Airline Image"}
          />
          <Card.Body>
            <Card.Title>{Name}</Card.Title>
            <Card.Text>
              <strong>IATA Code:</strong> {Code || "N/A"} <br />
              <strong>Alliance:</strong> {Alliance || "N/A"} <br />
              <strong>Website:</strong>{" "}
              {Website ? (
                <a href={Website} target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              ) : (
                "N/A"
              )}
            </Card.Text>
            {/*Advantages */}
            <Card.Text>
              <strong>Advantages:</strong>
              <ul>
                {Advantage?.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
              {/*Disdvantages */}
              <strong>Disadvantages:</strong>
              <ul>
                {Disadvantage?.map((dis, index) => (
                  <li key={index}>{dis}</li>
                ))}
              </ul>
              {/*Button for add/delete it into comparsionList*/}
              <button variant={showAdded ? "primary" : "outline-primary"} onClick={comparsionClicked}>{showAdded ? "+ Comparsion (added)" : "+ Compare"}</button>
            </Card.Text>
          </Card.Body>
        </Card>
      );

}