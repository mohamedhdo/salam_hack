import React, { useState, useEffect } from 'react';
import './App.css';
import WorkoutPlan from './WorkoutPlan';
import Header from './Header';
import GetStartedPage from './GetStartedPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    userId: null
  });

  // Updated to match your Django server URL
  const API_BASE_URL = 'http://127.0.0.1:8000';

  const navigateToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Effect to ensure smooth scrolling works on initial page load
  useEffect(() => {
    if (currentPage === 'home') {
      // Wait for the home page to fully render
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash === '#how-it-works') {
          const section = document.getElementById('how-it-works-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPage]);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the data for the API
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        goal: formData.goal === 'lose-weight' ? 'weight loss' : formData.goal.replace('-', ' ')
      };

      console.log('Submitting user data:', userData);
      console.log('API URL:', `${API_BASE_URL}/fill`);

      // Use the Django API endpoint
      const response = await fetch(`${API_BASE_URL}/fill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to submit user data: ${response.status}`);
      }

      // Get the response data with the user ID
      const responseData = await response.json();
      console.log('User created successfully:', responseData);

      // Update form data with the user ID
      setFormData({
        ...formData,
        userId: responseData.id
      });

      // Show success message
      setShowSuccessMessage(true);
      
      // Navigate to workout plan after form submission
      setCurrentPage('workout');
      
      // Hide success message after timeout
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    }
  };

  return (
    <div className="app">
      <Header navigateToPage={navigateToPage} currentPage={currentPage} />
      
      {currentPage === 'home' ? (
        <HomePage navigateToPage={navigateToPage} />
      ) : currentPage === 'getStarted' ? (
        <GetStartedPage 
          navigateToPage={navigateToPage} 
          formData={formData}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
        />
      ) : currentPage === 'workout' ? (
        <WorkoutPlan userData={formData} />
      ) : null}

      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <p>Your information has been submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

function HomePage({ navigateToPage }) {
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">your personalized fitness &<br />nutrition program by AI</h1>
          <p className="hero-text">
            Transform your body and improve your health with a<br />
            program tailored to your goals, body type and<br />
            preferences.
          </p>
          <button 
            className="cta-button" 
            onClick={() => navigateToPage('getStarted')}
          >
            Start Now
          </button>
        </div>
        <div className="hero-image">
          <img src="/Fitness.jpg" alt="Fitness illustration" />
        </div>
      </div>
      
      <div className="how-it-works" id="how-it-works-section">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Share your information</h3>
            <p className="step-text">
              Enter your physical data, your goals and your dietary preferences.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Our AI analyzes your needs</h3>
            <p className="step-text">
              Our artificial intelligence creates a tailor-made program to maximize your results.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Follow your program</h3>
            <p className="step-text">
              Access your personalized training schedule and nutrition plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;