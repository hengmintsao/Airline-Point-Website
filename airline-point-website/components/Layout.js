import MainNav from "./MainNav";
import { Container } from "react-bootstrap";


export default function Layout({children}){

    return(
    <>
    <MainNav />
    
    {/* <Container> */}
        {children}
    {/* </Container> */}
    <br />
    </>
    );
}