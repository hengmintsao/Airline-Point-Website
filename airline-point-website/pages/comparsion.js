import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { comparsionAtom } from "@/store";
import AirlineCard from "@/components/AirlineCard";
import { Row, Col, Card } from "react-bootstrap";
import { readToken } from "@/lib/authenticate";

// /* =============================================================History==============================================================================
// 1. Date: 2025-Jan-12 Description: Using Jotai to implement comparsion table(similar to shopping cart feature), add/delete in AirlineCardDetail.js and shown on comparsion.js. #TO-DO: might need to change required information.
// 2. Date: 2025-Jan-17 Description:  update useEffect  #TO-DO: might need to change required information.
// 3. Date: 2025-Jan-25 Description: Comparsion CSS design  #TO-DO: test
// 4. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None
// =====================================================================================================================================================
// */

export default function Comparsion() {
  const [comparsionList] = useAtom(comparsionAtom);
  const [airlinesData, setAirlinesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllAirlines() {

      const token = readToken();

      if (!token) {
        setAirlinesData([]);
        return;
      }

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
      } catch (err) {
        setError(err.message);
      }
    }

    fetchAllAirlines();
  }, [comparsionList]);

  if (error) {
    return (
      <div className="comparison-empty">
        <h4>No Airlines Selected</h4>
        <p>Add airlines to compare them!</p>
      </div>
    );
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
    <>
      <section id="airlineComparison" className="align-items-center">
        <div>
        <h1>Comparsion</h1>
        <p>
          This page allows you to compare selected airlines side-by-side based
          on their attributes and services.
        </p>
      
      
        <Row className="gy-4 justify-content-start">
          {airlinesData.map((airline) => (
            <Col xxl={3} xl={4} lg={4} md={6} sm={12} key={airline._id}>
              <AirlineCard airline={airline} />
            </Col>
          ))}
        </Row>
        </div>
      </section>
    </>
  );
}
