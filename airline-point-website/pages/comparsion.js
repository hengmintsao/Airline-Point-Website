import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { comparsionAtom } from "@/store";
import AirlineCard from "@/components/AirlineCard";
import { Row, Col, Card } from "react-bootstrap";

// /* =============================================================History==============================================================================
// 1. Date: 2025-Jan-12 Description: Using Jotai to implement comparsion table(similar to shopping cart feature), add/delete in AirlineCardDetail.js and shown on comparsion.js. #TO-DO: might need to change required information.
// 1. Date: 2025-Jan-17 Description:  update useEffect  #TO-DO: might need to change required information.

// =====================================================================================================================================================
// */


export default function Comparsion() {
  const [comparsionList] = useAtom(comparsionAtom);
  const [airlinesData, setAirlinesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
 
    async function fetchAllAirlines() {

      if (!comparsionList || comparsionList.length === 0) {
        setAirlinesData([]); 
        return;
      }
      try {
        const results = await Promise.all(
          comparsionList.map(async (id) => {
            const response = await fetch(`/api/airlines/${id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch airline with id ${id}`);
            }
            return response.json();
          })
        );
        setAirlinesData(results); 
        //console.log("test",comparsionList); test
      } catch (err) {
        setError(err.message);
      }
    }

    fetchAllAirlines();
  }, [comparsionList]);

  if (error) {
    return <p>Error: {error}</p>;
  }


  if (airlinesData.length === 0) {
    return (
      <Card className="p-3">
        <h4>Nothing Here</h4>
        <p>Try searching for something else</p>
      </Card>
    );
  }

  
  return (
    <Row className="gy-4">
      {airlinesData.map((airline) => (
        <Col lg={3} key={airline._id}>
          <AirlineCard airline={airline} />
        </Col>
      ))}
    </Row>
  );
}
