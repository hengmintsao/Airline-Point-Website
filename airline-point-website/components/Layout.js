import MainNav from "./MainNav";
import Footer from "./Footer";
import { Container } from "react-bootstrap";


export default function Layout({children}){

    return(
    <>
    <MainNav />
    {/* <Container> */}
        {children}
    {/* </Container> */}
    <Footer />
    </>
    );
}