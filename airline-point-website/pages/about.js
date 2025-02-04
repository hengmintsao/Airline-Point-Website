import { useEffect, useState } from "react";
import AirlineCard from "@/components/AirlineCard";
import { Row, Col } from "react-bootstrap";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: Add new functionality: Sort by different attributes(nationality, alliance, English proficiency etc) 
2. Date: 2025-Jan-22 Description: Add CSS feature. #TO-DO: Test 
3. Date: 2025-Jan-25 Description: Revise CSS design #TO-DO: Test 
4. Date: 2025-Jan-29 Description: Revise some contents #TO-DO: Test 
5. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None

=====================================================================================================================================================
*/

export default function About(){

    const [airlines, setAirlines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAirlines() {
          try {
            const response = await fetch("/api/airline");
            if (!response.ok) {
              throw new Error("Failed to fetch airline data");
            }
            const data = await response.json();
            setAirlines(data);
          } catch (err) {
            setError(err.message);
          }
        }
    
        fetchAirlines();
      }, []);

      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <>
        <section id="airlineAbout" className="align-items-center">
        <div>
          <h1>About Airlines</h1>
          <p>
            This page contains many airlines, their pros and cons, and other relevant information.
          </p>
        
        
          <Row className="gy-4">
            {airlines.map((airline) => (
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