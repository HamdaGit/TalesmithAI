import React, { useState } from 'react';
import axiosInstance from './axiosSetup';
import './Feedback.css';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/submit_feedback/', { feedback });
      console.log('Submitted Feedback:', response.data);
      setFeedback('');
      setSuccessMessage('Your feedback has been submitted successfully!'); // Set success message
      setTimeout(() => setSuccessMessage(''), 5000); // Clear message after 5 seconds
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="Feedback">
      <div className='links'>
        <a href="/mainapp">Home /</a>
        <a href="/feedback">Feedback</a>
      </div>
      <header className="Feedback-header">
        <h1>Share Your Feedback</h1>
        <p>Please provide us with your thoughts and suggestions to help us improve our services. Your input is important to us.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="textarea"
              name="feedback"
              value={feedback}
              onChange={handleChange}
              required
            />
          </div>
          <div className='Feedback-button-container'>
          <button className='Feedback-button' type="submit">Submit Feedback</button>


          </div>
        

          {/* <button className='Feedback-button' type="submit">Submit Feedback</button> */}
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Render success message */}
      </header>
    </div>
  );
}

export default Feedback;
