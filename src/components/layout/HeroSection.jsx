import { useState, useEffect } from "react";
import "./HeroSection.css";
import HeroImg1 from "../../assets/HeroImg/Hero1.jpg";
import HeroImg2 from "../../assets/HeroImg/Hero2.jpg";
import HeroImg3 from "../../assets/HeroImg/Hero3.jpg";
import HeroImg4 from "../../assets/HeroImg/Hero4.jpg";

export const HeroSection = () => {
  const heroImages = [HeroImg1, HeroImg2, HeroImg3, HeroImg4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsImageVisible(true);
    }, 3000); 

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="text-section">
        <h1>
          Instant Loans for <span>Nano Businesses</span> Fast & Easy
        </h1>
        <p>
          AI-powered solutions to assess creditworthiness in minutes. Helping
          street vendors and small businesses grow financially. Start your
          journey today!
        </p>

        <div className="cta-buttons">
          <a href="/services" className="btn btn-gradient">
            Learn More
          </a>
          <a href="/contact" className="btn btn-border">
            Contact Us
          </a>
        </div>
      </section>

      <section className="hero-image-container">
        <div className="orange-box"></div>
        <img
          src={heroImages[currentImageIndex]}
          alt="Hero"
          className={`hero-image ${isImageVisible ? "show" : ""}`}
        />
      </section>
    </main>
  );
};
