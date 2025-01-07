import { Card } from "react-bootstrap";
import Error from "next/error";
import Button from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AirlineCard({airline}){

    const { Image, Name, Alliance, Code, Website, _id } = airline;

    // const [airlines, setAirlines] = useState([]);
    // const [error, setError] = useState(null);

// Get airline from API
// useEffect(()=>{
//     async function fetchAirlines(){

//         try{
//             const response = await fetch("/api/airlines");
//             if(!response.ok){
//                 throw new Error("Failed to fetch airline data");
//             }
//             const data = await response.json();
//             setAirlines(data);

//         }catch(err){
//             setError(err.message);
//         }
//     }

//     fetchAirlines();
// },[]);


return (
    <>
    <Card className="mb-3" style={{ width: '18rem' }}>
    {/* Picture */}
    <Card.Img variant="top" src={Image || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
    <Card.Body>
    {/* Airline Name */}
    <Card.Title>{Name || "N/A"}</Card.Title>
    {/* Alrline IATA Code, Alliance, Website */}
    <Card.Text>
      <strong>IATA Code:</strong> {Code || "N/A"}<br />
      <strong>Alliance:</strong> {Alliance || "N/A"}<br />
      <strong>Website:</strong>{" "}
          {Website ? (
            <a href={Website} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
          ) : (
            "N/A"
          )}
    </Card.Text>
    <Link href={`/airline/${_id}`} passHref legacyBehavior>
          <Button variant="primary">View Details</Button>
        </Link>
    </Card.Body>
    </Card>
    </>
    );
}