import Navbar from "./Compontents/Navbar";
import Footer from "./Compontents/footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/Aboutpage";
import NotFoundPage from "./Pages/404page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LatestTransaction from "./Pages/Latest-transaction";
import Login from "./Pages/Login";
import Wallet from "./Pages/Wallet";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
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
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<Wallet />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
