import MainNav from "./MainNav";
import Footer from "./Footer";


export default function Layout({children}){

    return(
    <>
    <MainNav />
        {children}
    <Footer />
    </>
    );
}