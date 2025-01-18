import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";


export default function MainNav(){

    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    let token = readToken();

    function logout() {
      removeToken();
      router.push('/');
    }

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
                {token && <Link href="/costPerMile" passHref legacyBehavior><Nav.Link active={router.pathname === '/costPerMile'}>Mile cost Calculator</Nav.Link></Link>}
              </Nav>
              &nbsp;
              <Nav>
                {token ? (
                  <NavDropdown title={token.userName || "User Name"} id="basic-nav-dropdown">
                <Link href="/comparsion" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Comparsion</NavDropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === '/history'} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>) : (
                  <>
                  <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === '/register'} onClick={() => setIsExpanded(false)}>Register</Nav.Link></Link>
                  &nbsp;
                  <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === '/login'} onClick={() => setIsExpanded(false)}>Login</Nav.Link></Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}