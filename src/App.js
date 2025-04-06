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
import SignupbyReferall from "./Pages/signupbyreferallcode";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

  
AOS.init();
function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/transaction" element={<LatestTransaction />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup-rc-new/:id" element={<SignupbyReferall />} />


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
