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
                Experienced in aviation field, from service to revenue management
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
            <h1>3 Alliances included</h1>
            <h6>Analysis pros & cons</h6>
          </div>
          <div className="col-lg-3 col-sm-6">
            <h1>Canada based</h1>
            <h6>From the perspective of departing from Canada, looking at various airlines</h6>
          </div>
        </div>
      </div>
    </section>

      {/*About the features accomplish in this project */}
      <section id="features" className="section-padding">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="150">
                    <div className="section-title">
                        <h1 className="display-4 fw-semibold">Features Accomplishment</h1>
                        <div className="line"></div>
                        <p>Easy to use those features!</p>
                    </div>
                </div>
            </div>
            <div className="row g-4 text-center">
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="150">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-pen-nib-fill"></i>
                        </div>
                        <h5 className="mt-4 mb-3">Airport Distance Calculator</h5>
                        <p>Use API to retrieve airport-related information (latitude and longitude), 
                          then use formula to calculate the distance in miles between two airports. </p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="250">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-stack-fill"></i>
                        </div>
                        <h5 className="mt-4 mb-3">Pie Chart</h5>
                        <p>Use third-party npm package for quickly and easily creating pie chart in React</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="350">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-ruler-2-fill"></i>
                        </div>
                        <h5 className="mt-4 mb-3">Web API with authentication</h5>
                        <p>A Web API with authentication functionality is implemented to secure the API and ensure that only authorized users can access specific resources or perform operations. This is achieved using JSON Web Tokens (JWT) for stateless and secure authentication.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="450">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-pie-chart-2-fill"></i>
                        </div>
                        <h5 className="mt-4 mb-3">Comparison Table</h5>
                        <p>Using atomic state management with Jotai simplifies the implementation and management of the comparison table's state. It eliminates the need for boilerplate code, making the development process more efficient and maintainable.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="550">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-code-box-line"></i>
                        </div>
                        <h5 className="mt-4 mb-3">Search History</h5>
                        <p>After inputting data and generating the pie chart, the entered data is stored in an array using Jotai, allowing users to quickly access previously entered records.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="650">
                    <div className="features theme-shadow p-lg-5 p-4">
                        <div className="iconbox">
                            <i className="ri-user-2-fill"></i>
                        </div>
                        <h5 className="mt-4 mb-3">AutoComplete</h5>
                        <p>After retrieving all data via the API, a designed AutoComplete dropdown dynamically displays matching options in real-time. Users can enter keywords or directly click on suggested information to quickly select the desired item, improving input efficiency and reducing errors.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
  );
}
