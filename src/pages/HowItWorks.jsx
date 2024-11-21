import React from 'react';
import './HowItWorks.css';
import { Link } from "react-router-dom"; 

function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <section className="how-it-works-header">
        <h1>Our Simple Credit <span>Evaluation Process</span> </h1>
         
        <p>We’ve simplified the process of assessing your creditworthiness using AI-powered tools. Just follow these simple steps to get started and improve your financial health.</p>
      </section>

      <section className="wsteps">
        <div className="wstep">
          <div className="icon">
            <i className="ri-user-fill"></i>
          </div>
          <div className="step-content">
            <h3>Step 1: Enter Your Basic Details</h3>
            <p>Provide us with some basic personal information, such as your name, income, and other necessary details to begin the credit assessment process. This step helps us understand your financial background.</p>
          </div>
        </div>

        <div className="line"></div>

        <div className="wstep">
          <div className="icon">
            <i className="ri-calculator-fill"></i>
          </div>
          <div className="wstep-content">
            <h3>Step 2: AI-Powered Credit Assessment</h3>
            <p>Our AI algorithms analyze the data you provided and assess your financial health. This step uses machine learning models to calculate your creditworthiness and predict how likely you are to be approved for a loan or credit.</p>
          </div>
        </div>

        <div className="line"></div>

        <div className="wstep">
          <div className="icon">
            <i className="ri-contacts-book-fill"></i>
          </div>
          <div className="step-content">
            <h3>Step 3: Receive Your Credit Score & Insights</h3>
            <p>Once the assessment is complete, you'll receive your credit score along with tailored financial insights. We provide you with a detailed breakdown of what influences your score and actionable recommendations to improve it.</p>
          </div>
        </div>

        <div className="line"></div>

        <div className="wstep">
          <div className="icon">
            <i className="ri-hand-coin-fill"></i>
          </div>
          <div className="step-content">
            <h3>Step 4: Improve Your Financial Health</h3>
            <p>Based on the insights you received, take steps to improve your creditworthiness. Whether it’s paying off debts, managing expenses, or building savings, we provide you with the guidance needed to increase your score and financial stability.</p>
          </div>
        </div>

        <div className="line"></div>

        <div className="wstep">
          <div className="icon">
            <i className="ri-refresh-fill"></i>
          </div>
          <div className="step-content">
            <h3>Step 5: Reassess Your Credit Score</h3>
            <p>Once you’ve taken steps to improve your financial habits, come back to reassess your credit score. We’ll continuously help you track your progress and provide new recommendations to keep your financial health on track.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today and begin your journey to better creditworthiness with our easy-to-use AI-powered platform!</p>
        <Link to="/Login">
        <button className="cta-btn">Start Now</button>
        </Link>
      </section>
    </div>
  );
}

export default HowItWorks;
