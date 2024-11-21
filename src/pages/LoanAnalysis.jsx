import { UserButton } from "@clerk/clerk-react";
import "./LoanAnalysis.css"
import { Footer } from "../components/layout/Footer";
const LoanAnalysis = () => {
  return (
    <section className="analysis-section">
        {/* Navbar */}
        <nav className="adashboard-navbar">
          <div className="dashboard-logo">
            Credit<i className="ri-money-rupee-circle-fill"></i>Worthy
          </div>
          <div className="dashboard-user-icon">
            <UserButton />
          </div>
        </nav>

        {/* Main Analysis Section */}
        <section className="main-analysis d-text">
          <div className="analysis-heading">
            <h1>Welcome to our <span>CreditWorthy Dashboard</span></h1>
            <p>Your loan application has been submitted successfully. View your personalized loan insights and recommendations instantly!</p>
          </div>
        </section>

      {/* Embed Streamlit App */}
      <iframe
          src="http://localhost:8501"
          title="Nano Entrepreneur App"
          width="100%"
          height="800px"
          style={{ border: "none", marginTop: "20px" }}
        />
        
      <Footer/>
    </section>
  );
};

export default LoanAnalysis;