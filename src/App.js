import Navbar from "./Compontents/Navbar";
import Footer from "./Compontents/footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/Aboutpage";
import NotFoundPage from "./Pages/404page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LatestTransaction from "./Pages/Latest-transaction";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/mining" element={<MiningPage />} />
        <Route path="/wallet" element={<WalletPage />} /> */}
        <Route path="/transaction" element={<LatestTransaction />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
