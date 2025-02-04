import { Card, Button } from "react-bootstrap";
import Link from "next/link";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: The code needs to be concise. Remove any unnecessary or unused code during subsequent reviews
2. Date: 2025-Jan-25 Description: Add CSS Design. #TO-DO: 
3. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None


=====================================================================================================================================================
*/

export default function AirlineCard({airline}){

    const { Image, Name, Alliance, Code, Website, _id } = airline;

return (
    <>
    <Card className="mb-3 airline-card">
    {/* Picture */}
    <Card.Img variant="top" className="airline-card-img" src={Image || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
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