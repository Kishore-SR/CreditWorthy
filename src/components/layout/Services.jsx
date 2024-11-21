import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./Services.css";

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import img6 from "../../assets/images/img6.png";

export const Services = () => {
  const imgImages = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imgImages.length]);

  return (
    <section className="services" id="services">
      <div className="header-text">
        <h4>Our Services</h4>
        <h3>
          We Ensure the Best <span>Customer Experience</span>
        </h3>
      </div>

      <div className="features">
        <div className="features-column">
          <div className="feature-item">
            <div className="sicon">
              <i className="ri-bar-chart-box-fill"></i>
            </div>
            <h4>AI-Powered Credit Assessment</h4>
          </div>

          <div className="feature-item">
            <div className="sicon">
              <i className="ri-pie-chart-fill"></i>
            </div>
            <h4>Data-Driven Financial Insights</h4>
          </div>

          <div className="feature-item">
            <div className="sicon">
              <i className="ri-community-fill"></i>
            </div>
            <h4>Support for Local Entrepreneurs</h4>
          </div>
        </div>

        <div className="service-image">
          <img src={imgImages[currentImageIndex]} alt="Service Highlight" />
        </div>

        <div className="features-column">
          <div className="feature-item">
            <div className="sicon">
              <i className="ri-global-fill"></i>
            </div>
            <h4>Accessible Solutions for All</h4>
          </div>

          <div className="feature-item">
            <div className="sicon">
              <i className="ri-smartphone-fill"></i>
            </div>
            <h4>Mobile-Friendly Experience</h4>
          </div>

          <div className="feature-item">
            <div className="sicon">
              <i className="ri-secure-payment-fill"></i>
            </div>
            <h4>Secure & Transparent Processes</h4>
          </div>
        </div>
      </div>

      <div className="service-more">
        <Link to="/services">
          <button>Explore More</button>
        </Link>
      </div>
    </section>
  );
};
