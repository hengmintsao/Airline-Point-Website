import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";

export default function AirlineCardDetail(){
    const [airline, setAirline] = useState(null);
    const [error, setError] = useState(null);
    router = useRouter();
    const {id} = router.query; 

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

            if(id){
                fetchAirlineDetails();
            }
        }
    },[id]);

    const { Name, Code, Alliance, Website, Image, Advantage, Disadvantage } = airline;

    return (
        <Card className="mb-3">
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
            <Card.Text>
              <strong>Advantages:</strong>
              <ul>
                {Advantage?.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
              <strong>Disadvantages:</strong>
              <ul>
                {Disadvantage?.map((dis, index) => (
                  <li key={index}>{dis}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      );

}