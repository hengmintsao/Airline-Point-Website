import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";


export default function Home() {
  return (
      <>
        {/* Hero Section */}
        <section id="hero" className="min-vh-100 d-flex align-items-center">
          <Container>
            <Row>
              <Col className="text-center">
                <h1 className="text-uppercase fw-semibold display-1">
                  Welcome to Airline-Point Website
                </h1>
                <h5 className="mt-3">
                  This is the website for airline point lovers!
                </h5>
                <div className="mt-4">
                  {/* Buttons */}
                  <Link href="/about" passHref>
                    <Button variant="white" className="me-3" size="lg" id="hero-button">
                      Check Airlines
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
  );
}
