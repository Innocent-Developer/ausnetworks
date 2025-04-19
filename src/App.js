import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Compontents/Navbar";
import Footer from "./Compontents/footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/Aboutpage";
import NotFoundPage from "./Pages/404page";
import LatestTransaction from "./Pages/Latest-transaction";
import Login from "./Pages/Login";
import Wallet from "./Pages/Wallet";
import Signup from "./Pages/Signup";
import SignupbyReferall from "./Pages/signupbyreferallcode";
import Miningapp from "./mining-app/miningapp";
import KYC from "./KYC/kyc";
import LoginMining from "./mining-app/Login-mining";

AOS.init();

function AppContent() {
  const location = useLocation();
  const hideLayout = 
    location.pathname === "/web-app/mining/mobile-app" || 
    location.pathname === "/web-app/mining/mobile-app/node" || 
    location.pathname === "/web-app/mining/mobile-app/chat" || 
    location.pathname === "/web-app/mining/mobile-app/refferal" || 
    location.pathname === "/web-app/mining/mobile-app/setting" || 
    location.pathname === "/web-app/mining/mobile-app/kyc";

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/transaction" element={<LatestTransaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-mining" element={<LoginMining />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup-rc-new/:id" element={<SignupbyReferall />} />
        <Route path="/web-app/mining/mobile-app" element={<Miningapp />} />
        <Route path="/web-app/mining/mobile-app/kyc" element={<KYC />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hideLayout && <Footer />}
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
