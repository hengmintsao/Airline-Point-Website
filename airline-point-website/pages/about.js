import { useEffect, useState } from "react";
import AirlineCard from "@/components/AirlineCard";
import { Row, Col } from "react-bootstrap";
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
        <div>
          <h1>About Canadian Airlines</h1>
          <p>
            This page contains all Canadian airlines, their pros and cons, and other relevant information.
          </p>
          <Row className="gy-4">
            {airlines.map((airline) => (
              <Col lg={4} md={6} sm={12} key={airline._id}>
                <AirlineCard airline={airline} />
              </Col>
            ))}
          </Row>
        </div>
      );
}