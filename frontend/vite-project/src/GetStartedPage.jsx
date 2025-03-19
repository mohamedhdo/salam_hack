import React from 'react';
import './GetStartedPage.css';

function GetStartedPage({ formData, handleFormChange, handleSubmit }) {
  return (
    <div className="get-started-container">
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      <div className="get-started-wrapper">
        <div className="get-started-left">
          <div className="get-started-content">
            <h1 className="get-started-title">
              Your Personalized
              <span className="highlight"> Fitness</span> &
              <span className="highlight"> Nutrition</span> Journey
            </h1>
            <p className="get-started-description">
              Transform your body and improve your health with our AI-powered program
              customized to your unique profile. Our advanced algorithm creates the
              perfect fitness plan tailored to your goals, body type, and preferences.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div className="feature-text">Goal-oriented training schedules</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🍎</div>
                <div className="feature-text">Personalized nutrition guidance</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div className="feature-text">Progress tracking and adjustments</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="get-started-right">
          <div className="form-card">
            <div className="form-header">
              <h2>Create Your Profile</h2>
              <p >We'll use this information to personalize your plan</p>
            </div>
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Your first name" 
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
                    placeholder="Your last name" 
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input 
                    type="number" 
                    id="age" 
                    placeholder="Your age" 
                    value={formData.age}
                    onChange={handleFormChange}
                    min="18"
                    max="99"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="height">Height (cm)</label>
                  <input 
                    type="text" 
                    id="height" 
                    placeholder="Your height in cm" 
                    value={formData.height}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input 
                    type="text" 
                    id="weight" 
                    placeholder="Your weight in kg" 
                    value={formData.weight}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="goal">Your Fitness Goal</label>
                  <select 
                    id="goal" 
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
              </div>
              
              <button type="submit" className="submit-button">
                <span className="button-text">Generate My Plan</span>
                <span className="button-icon">→</span>
              </button>
              
              <p className="privacy-notice">
                <span className="privacy-icon">🔒</span>
                Your data is secure and will only be used to create your personalized program
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;