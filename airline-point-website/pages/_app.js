import AOS from "aos"; // Anime on scorll library installation
import "aos/dist/aos.css"; // Anime on scorll library installation
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "@/components/Layout";
import RouteGuard from '@/components/RouteGuard';
import { useEffect } from 'react'; 





export default function App({ Component, pageProps }) {

  // Use Anime on scroll library
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 1000
    });
  }, []);

  return (
    <RouteGuard>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RouteGuard>
  );
}
