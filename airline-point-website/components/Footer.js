import { Container, Row, Col, Image} from "react-bootstrap";
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
              <h3>
                Airline-Point
              </h3>
              <div className="line my-3"></div>
              <p>
              Airline-Point is a website designed to help users efficiently manage their points, making life easier!
              </p>
            </Col>

            {/* Services Section */}
            <Col lg={3} sm={6}>
              <h5 className="mb-0">SERVICES</h5>
              <div className="line my-3"></div>
              <ul className="list-unstyled">
                <li>
                  <Link href="/about">Airline introduction(Login Required)</Link>
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
                  <Link href="/">Home</Link>
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
              </ul>
              <div className="social-icons">
                <Link href="https://www.linkedin.com/in/hengmin-tsao-3b3403239/">
                <Image src="/pics/linkedin-box-fill.png" alt="linkedin" className="icon" /> 
                </Link>
                <Link href="https://github.com/hengmintsao">
                <Image src="/pics/github-fill.png" alt="github" className="icon" /> 
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
