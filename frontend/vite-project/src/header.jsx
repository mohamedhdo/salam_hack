import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({ navigateToPage, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-section">
          <div className="logo" onClick={() => navigateToPage('home')}>
            <span className="logo-icon">🏋️</span>
            <span className="logo-text">FitGenAI</span>
          </div>
        </div>
        
        {/* Navigation on the right */}
        <div className="nav-section">
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <button 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
                  onClick={() => navigateToPage('home')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link"
                  onClick={scrollToHowItWorks}
                >
                  How it Works
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="get-started-btn"
                  onClick={() => navigateToPage('getStarted')}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;