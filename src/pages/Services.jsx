import "./Services.css"
import serviceImg from "../assets/services.webp"
import { useEffect } from "react";
import { Link } from "react-router-dom"; 

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Empowering Nano Businesses with Cutting-Edge Solutions</p>
      </div>
      <div className="img-ser">
        <img src={serviceImg} alt="image" />
      </div>
      <div className="services-grid">
        <div className="service-item">
          <i className="ri-bar-chart-box-fill service-icon"></i>
          <h3>AI-Powered Credit Assessment</h3>
          <p>Leverage AI to assess creditworthiness efficiently.</p>
        </div>
        <div className="service-item">
          <i className="ri-pie-chart-fill service-icon"></i>
          <h3>Data-Driven Financial Insights</h3>
          <p>Get actionable insights to enhance financial decisions.</p>
        </div>
        <div className="service-item">
          <i className="ri-community-fill service-icon"></i>
          <h3>Support for Local Entrepreneurs</h3>
          <p>Empower local businesses with tailored solutions.</p>
        </div>
        <div className="service-item">
          <i className="ri-global-fill service-icon"></i>
          <h3>Accessible Solutions for All</h3>
          <p>Ensure inclusivity with accessible financial services.</p>
        </div>
        <div className="service-item">
          <i className="ri-smartphone-fill service-icon"></i>
          <h3>Mobile-Friendly Experience</h3>
          <p>Access services seamlessly on mobile devices.</p>
        </div>
        <div className="service-item">
          <i className="ri-secure-payment-fill service-icon"></i>
          <h3>Secure & Transparent Processes</h3>
          <p>Trustworthy and secure solutions for peace of mind.</p>
        </div>
      </div>
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today and begin your journey to better creditworthiness with our easy-to-use AI-powered platform!</p>
        <Link to="/Login">
        <button className="cta-btn">Start Now</button>
        </Link>
      </div>
      
    </section>
  );
}

export default Services;
