import { UserButton } from "@clerk/clerk-react";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          Credit<i className="ri-money-rupee-circle-fill"></i>Worthy
        </div>
        <div className="dashboard-user-icon">
          <UserButton/>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="dashboard-content">
        <h1>Welcome to the Dashboard!</h1>
        <p>Start exploring your CreditWorthy journey here.</p>
      </section>
    </div>
  );
};
