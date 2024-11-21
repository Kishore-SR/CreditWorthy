import { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    emailError2: false,
    messageError: false,
  });

  const isValidEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim().length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [`${name}Error`]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [`${name}Error`]: false }));
    }

    if (name === 'email' && value.trim().length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError2: !isValidEmail(value),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'contact') setContact(value);
    if (name === 'message') setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const updatedErrors = {
      nameError: name.trim() === '',
      emailError: email.trim() === '',
      emailError2: email.trim() !== '' && !isValidEmail(email),
      messageError: message.trim() === '',
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some((error) => error);
    if (hasErrors) {
      setFormValid(false);
      return;
    }

    // If no errors, submit the form
    const contactData = { name, email, contact, message };

    try {
      await axios.post('http://localhost:5000/submit-contact', contactData);
      setFormValid(true); // Show the thank-you message on success
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="contact-form-container">
      {!formValid ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <h3>Contact Form</h3>
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nameError && <div className="error">Name is required</div>}
          </div>
          <div className="form-group">
            <label>Your Email *</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emailError && <div className="error">Email is required</div>}
            {errors.emailError2 && <div className="error">Invalid email</div>}
          </div>
          <div className="form-group">
            <label>Your Contact Number (Optional)</label>
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              value={message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.messageError && <div className="error">Message is required</div>}
          </div>
          <button type="submit">Submit Now</button>
        </form>
      ) : (
        <div className="thank-you-message">Thank you for your submission!</div>
      )}
    </div>
  );
};

export default Contact;
