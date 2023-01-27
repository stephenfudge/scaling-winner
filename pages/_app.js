import Navbar from "./components/navbar";
import Footer from "./components/footer";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="backing">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
