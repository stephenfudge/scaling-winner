import Navbar from "../components/navbar"
import Footer from "../components/footer";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="backing flex flex-col min-h-screen">
     {/* <header> */}
     <Navbar />
      {/* </header>  */}
      {/* <main className="flex-grow"> */}
      <Component {...pageProps} />

      {/* </main> */}
      {/* <footer> */}

      <Footer />
      {/* </footer> */}
    </div>
  );
}
