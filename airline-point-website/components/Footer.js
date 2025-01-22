import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function Footer() {
  return  (
    <footer className="bg-dark text-white">
      {/* Footer Top Section */}
      <div className="footer-top py-5">
        <Container>
          <Row className="gy-5">
            {/* Logo and About */}
            <Col lg={3} sm={6}>
              <Link href="/">
                Airline-Point
              </Link>
              <div className="line my-3"></div>
              <p>
              In the aviation industry for 6.5 years, I still feel excited every time I board a plane. 
              Flying carries the purpose of every individual. A plane is not just a mode of transportation; 
              it also carries people's dreams and hopes. 
              </p>
            </Col>

            {/* Services Section */}
            <Col lg={3} sm={6}>
              <h5 className="mb-0">SERVICES</h5>
              <div className="line my-3"></div>
              <ul className="list-unstyled">
                <li>
                  <Link href="/about">Airline introduction</Link>
                </li>
                <li>
                  <Link href="/calculator" passHref legacyBehavior>Airport Calculator(Login Required)</Link>
                </li>
                <li>
                  <Link href="/costPerMile" passHref legacyBehavior>Mile Cost Calculator(Login Required)</Link>
                </li>
                <li>
                  <Link href="/comparsion" passHref legacyBehavior>Comparison(Login Required)</Link>
                </li>
                <li>
                  <Link href="/history" passHref legacyBehavior>History(Login Required)</Link>
                </li>
              </ul>
            </Col>

            {/* About Section */}
            <Col lg={3} sm={6}>
              <h5 className="mb-0">ABOUT</h5>
              <div className="line my-3"></div>
              <ul className="list-unstyled">
                <li>
                  <Link href="#">About Author</Link>
                </li>
                <li>
                  <Link href="#">Features Accomplishment</Link>
                </li>
                <li>
                  <Link href="#">Back to top</Link>
                </li>
              </ul>
            </Col>

            {/* Contact Section */}
            <Col lg={3} sm={6}>
              <h5 className="mb-0">CONTACT</h5>
              <div className="line my-3"></div>
              <ul className="list-unstyled">
                <li>Hengmin Tsao</li>
                <li>Email:henrygood32@gmail.com</li>
                <li>
                  <Link href="http://www.example.com">www.example.com</Link>
                </li>
              </ul>
              <div className="social-icons">
                <Link href="#">
                  <i className="ri-linkedin-fill">linkedin</i>
                </Link>
                <Link href="#">
                  <i className="ri-github-fill">Github</i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom py-3 bg-secondary">
        <Container>
          <Row className="g-4 justify-content-between align-items-center">
            <Col className="col-auto">
              <p className="mb-0">© Copyright Airline-Point. All Rights Reserved</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
