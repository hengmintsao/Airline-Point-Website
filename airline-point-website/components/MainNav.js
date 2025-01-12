import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";


export default function MainNav(){

    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();



    return (
        <Navbar expand="lg" className="navbar bg-primary">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
                <Nav.Link href="/calculator">Airport Calculator</Nav.Link>
                <Nav.Link href="/costPerMile">Mile cost Calculator</Nav.Link>
                {/* implement history */}
                {/* <Link href="/history" passHref legacyBehavior>
                  <Nav.Link>History</Nav.Link>
                  </Link> */}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Link href="/comparsion" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Comparsion</NavDropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === '/history'} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
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