import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>Credit Assessment</li>
            <li>Our Services</li>
            <li>Contact</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Account Settings</li>
            <li>Booking Guide</li>
            <li>Financial Resources</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>kishoresr01@gmail.com</li>
            <li>123 Street, Bengaluru</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>
      </div>

      <div className="footer-line"></div>

      <div className="footer-bottom">
        <p>CreditWorthy &copy; 2024</p>
        <p className="my-name">
          <i className="ri-sparkling-2-fill"></i> Team Cosmic
        </p>
      </div>
    </footer>
  );
};
