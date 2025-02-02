import AOS from "aos"; // Anime on scorll library installation
import "aos/dist/aos.css"; // Anime on scorll library installation
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { useEffect } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  const fetcher = async (url) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // still try to parse and throw it.
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");

      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  // Use Anime on scroll library
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 1000,
    });
  }, []);

  return (
    <RouteGuard>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </RouteGuard>
  );
}
