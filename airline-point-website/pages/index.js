import { Container, Row, Col, Button, Image } from "react-bootstrap";
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
                Welcome to Airline-Point
              </h1>
              <h5 className="mt-3">
                THIS IS THE WEBSITE FOR AIRLINE POINT LOVERS!
              </h5>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      
      <section id="about">
        <Container>
          <Row>
            {/* Text and icons */}
            <Col md={6} className="about-text">
              <h1>About Author</h1>
              <p>
                Experienced in aviation field, from service to revenue
                management
              </p>

              {/* Icon + Text list */}
              <div className="icon-list">
                <div className="icon-item">
                  <div className="icon-container">
                    <Image
                      src="/pics/plane-line.png"
                      alt="plane-line"
                      className="icon"
                    />
                  </div>
                  <div>
                    <h5>6-year experience in aviation industry</h5>
                    <p>From ground staff, sales to revenue management</p>
                  </div>
                </div>
                <div className="icon-item">
                  <div className="icon-container">
                    <Image
                      src="/pics/pie-chart-line.png"
                      alt="pie-chart"
                      className="icon"
                    />
                  </div>
                  <div>
                    <h5>Point analysis</h5>
                    <p>Spend less money, earn more points!</p>
                  </div>
                </div>
                <div className="icon-item">
                  <div className="icon-container">
                    <Image
                      src="/pics/calculator-line.png"
                      alt="calculator-line"
                      className="icon"
                    />
                  </div>
                  <div>
                    <h5>Airports distance calculator</h5>
                    <p>Easy to use!</p>
                  </div>
                </div>
              </div>
            </Col>

            {/* Image */}
            <Col md={6} className="about-photo">
              <Image
                src="/pics/aboutMe.jpg"
                alt="About Author"
                className="author-photo"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
