import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

export default function MainNav(){


    return (
        <Navbar expand="lg" className="navbar bg-primary">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/calculator">Airport Calculator</Nav.Link>
                <Nav.Link href="/costPerMile">Mile cost Calculator</Nav.Link>
                {/* implement history */}
                <Link href="/history" passHref legacyBehavior>
                  <Nav.Link>History</Nav.Link>
                  </Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}