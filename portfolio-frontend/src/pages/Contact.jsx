import { useState } from 'react';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Me</h1>
        <p>Have a question or want to work together? Get in touch!</p>
      </div>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          {success && (
            <div className="success-message">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your message..."
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <h3>Other Ways to Reach Me</h3>
          <div className="info-item">
            <strong>Email:</strong>
            <a href="mailto:email@example.com">email@example.com</a>
          </div>
          <div className="info-item">
            <strong>GitHub:</strong>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/username</a>
          </div>
          <div className="info-item">
            <strong>LinkedIn:</strong>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin.com/in/username</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
