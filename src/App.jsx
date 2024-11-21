import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Footer } from "./components/layout/Footer";
import { SignIn, SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
