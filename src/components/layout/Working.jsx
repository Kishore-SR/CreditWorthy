import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Working.css";

gsap.registerPlugin(ScrollTrigger);

export const Working = () => {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each step with ScrollTrigger
      stepRefs.current.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate lines with ScrollTrigger
      lineRefs.current.forEach((line, index) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepRefs.current[index],
              start: "bottom bottom",
              toggleActions: "play none none reverse",
              transformOrigin: "left",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="how-it-works" ref={sectionRef}>
      <div className="heading">
        <h4>How It Works</h4>
        <h3>
          Simple Steps to Assess Your Creditworthiness
        </h3>
      </div>

      <section className="steps">
        <div className="step step1" ref={(el) => (stepRefs.current[0] = el)}>
          <div className="icon">
            <i className="ri-user-fill"></i>
          </div>
          <div className="step-text">
            <h5>Enter Your Details</h5>
            <p>Start by providing basic information for an initial evaluation.</p>
          </div>
        </div>

        <div className="line" ref={(el) => (lineRefs.current[0] = el)}></div>

        <div className="step step2" ref={(el) => (stepRefs.current[1] = el)}>
          <div className="icon">
            <i className="ri-calculator-fill"></i>
          </div>
          <div className="step-text">
            <h5>AI-Powered Assessment</h5>
            <p>Our AI analyzes your data and provides a detailed credit score.</p>
          </div>
        </div>

        <div className="line" ref={(el) => (lineRefs.current[1] = el)}></div>

        <div className="step step3" ref={(el) => (stepRefs.current[2] = el)}>
          <div className="icon">
            <i className="ri-contacts-book-fill"></i>
          </div>
          <div className="step-text">
            <h5>Get Your Results</h5>
            <p>Receive your creditworthiness score and tailored financial advice.</p>
          </div>
        </div>

        <div className="line" ref={(el) => (lineRefs.current[2] = el)}></div>

        <div className="step step4" ref={(el) => (stepRefs.current[3] = el)}>
          <div className="icon">
            <i className="ri-hand-coin-fill"></i>
          </div>
          <div className="step-text">
            <h5>Improve Your Score</h5>
            <p>Get actionable insights to improve your financial health.</p>
          </div>
        </div>
      </section>

      <div className="works-more">
        <Link to="/HowItWorks">
          <button>Explore More</button>
        </Link>
      </div>
    </section>
  );
};
