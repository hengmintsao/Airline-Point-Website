import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import { contactMe } from "@/lib/authenticate";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-22 Description: Create Home page, all introduction and information(Using css) #TO-DO: Test



=====================================================================================================================================================
*/

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (warning) {
      alert(warning);
    }
  }, [warning]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await contactMe(firstName, lastName, email, phone, description);
      alert("Form submitted successfully!");
      setWarning("");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="min-vh-100 d-flex align-items-center">
        <Container>
          <Row>
            <Col className="text-center">
              <h1
                data-aos="fade-left"
                className="text-uppercase fw-semibold display-1"
              >
                Welcome to Airline-Point
              </h1>
              <h5 className="mt-3" data-aos="fade-right">
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
              <h1>About the website</h1>
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
                    <h5>Airline introduction</h5>
                    <p>Contain an overview of major North American airlines</p>
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
                    <p>
                      Calculate the distance between airports to see how many
                      miles you can earn
                    </p>
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
                    <p>
                      Quickly compute the cost per mile, then viewing the
                      results along with a pie chart
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            {/* Image */}
            <Col md={6} className="about-photo">
              <Image
                src="/pics/airlineAnalysis.jpg"
                alt="About Website"
                className="author-photo"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/*Counter */}
      <section id="counter" className="section-padding">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6">
              <h1>9,000+</h1>
              <h6>Airports</h6>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1>4 Types</h1>
              <h6>Earn points methods</h6>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1>3 Airline Alliances</h1>
              <h6>Analysis pros & cons</h6>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1>Canada based</h1>
              <h6>
                From the perspective of departing from Canada, looking at
                various airlines
              </h6>
            </div>
          </div>
        </div>
      </section>

      {/*Contact */}
      <section id="features" className="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-title">
                <h1>Contact</h1>
              </div>
            </div>
          </div>
        </div>
        <Form className="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            {/* First Name and Last Name */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>*First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>*Last Name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastname"
                  name="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Email Field */}
          <Form.Group>
            <Form.Label>*Email</Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Phone Field */}
          <Form.Group>
            <Form.Label>*Phone</Form.Label>
            <Form.Control
              type="number"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Description Field */}
          <Form.Group>
            <Form.Label>*Description</Form.Label>
            <Form.Control
              type="textarea"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br />
          {/* Submit Button */}
          <button variant="primary" className="submit-button" type="submit">
            Submit
          </button>
        </Form>
      </section>
    </>
  );
}
