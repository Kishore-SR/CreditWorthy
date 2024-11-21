import "./Services.css"
import serviceImg from "../assets/services.webp"

function Services() {
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
    </section>
  );
}

export default Services;
