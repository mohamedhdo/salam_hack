import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    goal: ''
  });

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => navigateToPage('home')}>FitGenAI</div>
        <nav className="nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
            onClick={() => navigateToPage('home')}
          >
            Home
          </button>
          <button
            className="nav-link"
            onClick={() => navigateToPage('home')}
          >
            how it works
          </button>
          <button className="nav-link">Log in</button>
        </nav>
      </header>
      
      {currentPage === 'home' ? (
        <HomePage navigateToPage={navigateToPage} />
      ) : (
        <GetStartedPage 
          navigateToPage={navigateToPage} 
          formData={formData}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
        />
      )}

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
          <img src="/api/placeholder/400/320" alt="Fitness illustration" />
        </div>
      </div>
      
      <div className="how-it-works">
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

function GetStartedPage({ formData, handleFormChange, handleSubmit }) {
  return (
    <div className="get-started-container">
      <div className="get-started-content">
        <h1 className="get-started-title">Your personalized fitness<br />& nutrition program by AI</h1>
        <p className="get-started-text">
          Transform your body and improve your health with a program tailored<br />
          to your goals, body type and preferences. Our advanced AI creates<br />
          the perfect fitness plan for your unique needs.
        </p>
      </div>
      
      <div className="get-started-form">
        <div className="form-header">
          <h2>Get Started Now</h2>
          <p>Just provide your basic information</p>
        </div>
        
        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="Enter your first name" 
              className="form-input"
              value={formData.firstName}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="Enter your last name" 
              className="form-input"
              value={formData.lastName}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id="age" 
              placeholder="Enter your age" 
              className="form-input"
              value={formData.age}
              onChange={handleFormChange}
              min="18"
              max="99"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input 
              type="text" 
              id="height" 
              placeholder="Enter your Height...(cm)" 
              className="form-input"
              value={formData.height}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input 
              type="text" 
              id="weight" 
              placeholder="Enter your Weight...(kg)" 
              className="form-input"
              value={formData.weight}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="goal">Your Goal</label>
            <select 
              id="goal" 
              className="form-input"
              value={formData.goal}
              onChange={handleFormChange}
              required
            >
              <option value="">Select your goal...</option>
              <option value="lose-weight">Lose Weight</option>
              <option value="build-muscle">Build Muscle</option>
              <option value="improve-fitness">Improve Fitness</option>
            </select>
          </div>
          
          <button type="submit" className="submit-button">Submit</button>
          
          <p className="privacy-notice">
            Your data is secure and will only be used to create your personalized program
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;