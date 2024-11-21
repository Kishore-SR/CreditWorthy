import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";

export const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate(); // Define navigate here

  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Business Details" },
    { id: 3, title: "Document Upload" },
    { id: 4, title: "Loan Application" },
    { id: 5, title: "Review & Submit" },
  ];

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Uploaded files:", files);
    }
  };

  const handleSubmit = () => {
    navigate("/LoanAnalysis"); // Use the navigate function to redirect
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3>Personal Information</h3>
            <div className="form-group">
              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Last Name" className="input" />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input full-width"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input full-width"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Business Details</h3>
            <input
              type="text"
              placeholder="Business Name"
              className="input full-width"
            />
            <select className="input full-width" defaultValue="">
              <option value="" disabled>
                Select Business Type
              </option>
              <option value="street-vendor">Street Vendor</option>
              <option value="food-truck">Food Truck</option>
              <option value="small-retail">Small Retail Shop</option>
              <option value="local-service">Local Service Provider</option>
              <option value="handicrafts">Handicrafts Seller</option>
              <option value="transport">Transport Business</option>
            </select>
            <input
              type="text"
              placeholder="Years in Business"
              className="input full-width"
            />
            <textarea
              placeholder="Business Description"
              className="input full-width"
            ></textarea>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Document Upload</h3>
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className="upload-input"
              />
            </div>
            <h2>Required Documents:</h2>
            <ul className="doc-list">
              <li>Business Registration (If available)</li>
              <li>Recent Bank Statements (If available)</li>
              <li>Proof of Business Location</li>
              <li>Any Govt. ID Proof</li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Loan Application</h3>
            <select className="input full-width" defaultValue="">
              <option value="" disabled>
                Select Loan Type
              </option>
              <option value="nano-loan">Nano Business Loan</option>
              <option value="working-capital">Working Capital Loan</option>
              <option value="equipment-financing">Equipment Financing</option>
              <option value="inventory-loan">Inventory Loan</option>
              <option value="growth-loan">Growth and Expansion Loan</option>
            </select>
            <input
              type="number"
              placeholder="Requested Amount"
              className="input full-width"
            />
            <textarea
              placeholder="Loan Purpose"
              className="input full-width"
            ></textarea>
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Review & Submit</h3>
            <p>Review your application before submitting.</p>
            <button className="btn" onClick={handleSubmit}>
              Submit Application
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          Credit<i className="ri-money-rupee-circle-fill"></i>Worthy
        </div>
        <div className="dashboard-user-icon">
          <UserButton />
        </div>
      </nav>

      {/* Main Content */}
      <section className="dashboard-content d-text">
        <h1>
          AI-Driven <span>Credit Access Portal</span>
        </h1>
        <p>
          Start exploring your journey to better credit access and management.
        </p>

        {/* Steps Navigation */}
        <div className="steps-nav">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step ${currentStep === step.id ? "active" : ""}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <span>{step.id}</span>
              <p>{step.title}</p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="step-buttons">
          <button
            className="prev-btn"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            onClick={() =>
              currentStep === steps.length
                ? handleSubmit()
                : setCurrentStep((prev) => Math.min(prev + 1, steps.length))
            }
          >
            {currentStep === steps.length ? "Submit" : "Next"}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
