import React, { useState, useEffect } from 'react';
import './WorkoutPlan.css';

function WorkoutPlan({ userData }) {
  const [workoutData, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeSection, setActiveSection] = useState('workout');

  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userData) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: userData.firstName,
            last_name: userData.lastName,
            age: Number(userData.age),
            height: Number(userData.height),
            weight: Number(userData.weight),
            goal: userData.goal
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workout plan');
        }

        const data = await response.json();
        console.log("Received data from API:", data);
        
        let parsedData;
        if (typeof data.workout_plan === 'string') {
          parsedData = JSON.parse(data.workout_plan);
        } else {
          parsedData = data.workout_plan;
        }
        
        setWorkoutData(parsedData);
        // Set the first day as active by default
        if (parsedData && Object.keys(parsedData).length > 0) {
          setActiveDay(Object.keys(parsedData)[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [userData]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Generation of your personalized program...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>An error has occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!workoutData) {
    return (
      <div className="empty-plan-container">
        <h3>No program available</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  const getProgressPercentage = () => {
    const totalDays = Object.keys(workoutData).length;
    const currentDayIndex = Object.keys(workoutData).indexOf(activeDay) + 1;
    return (currentDayIndex / totalDays) * 100;
  };

  return (
    <div className="workout-plan-container">
      <div className="program-header">
        <div className="program-badges">
          <span className="program-badge">personalized</span>
          <span className="program-badge">AI Optimized</span>
        </div>
        <h2>Your training program</h2>
        <p>Objective:<span className="goal-highlight">{userData.goal.replace('-', ' ')}</span></p>
        
        <div className="user-stats">
          <div className="stat-box">
            <div className="stat-icon">⚖️</div>
            <div className="stat-value">{userData.weight} kg</div>
            <div className="stat-label">Weight</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📏</div>
            <div className="stat-value">{userData.height} cm</div>
            <div className="stat-label">Height</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{userData.age}</div>
            <div className="stat-label">Age</div>
          </div>
        </div>
      </div>

      <div className="calendar-timeline">
        <div className="timeline-header">
          <h3>Your Program</h3>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
        </div>
        <div className="days-selector">
          {Object.keys(workoutData).map((day) => (
            <button 
              key={day} 
              className={`day-tab ${activeDay === day ? 'active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {activeDay && (
        <>
          <div className="section-tabs">
            <button 
              className={`section-tab ${activeSection === 'workout' ? 'active' : ''}`}
              onClick={() => setActiveSection('workout')}
            >
              <span className="tab-icon">💪</span> Training
            </button>
            <button 
              className={`section-tab ${activeSection === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveSection('nutrition')}
            >
              <span className="tab-icon">🍎</span> Nutrition
            </button>
          </div>

          <div className="daily-content">
            {activeSection === 'workout' && (
              <div className="workout-content">
                <div className="workout-header">
                  <h3>Training program - {activeDay}</h3>
                  <span className="workout-time">60-90 minutes</span>
                </div>
                <div className="exercise-grid">
                  {workoutData[activeDay].Workout.map((exercise, index) => (
                    <div key={index} className="exercise-card">
                      <div className="exercise-card-header">
                        <div className="exercise-number">{index + 1}</div>
                        <div className="exercise-intensity">
                          {Array(3).fill().map((_, i) => (
                            <span key={i} className={`intensity-dot ${i < Math.floor(Math.random() * 3) + 1 ? 'active' : ''}`}></span>
                          ))}
                        </div>
                      </div>
                      <div className="exercise-details">
                        <p>{exercise}</p>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'nutrition' && (
              <div className="nutrition-content">
                <div className="nutrition-header">
                  <h3>Nutrition Plan - {activeDay}</h3>
                  <div className="nutrition-summary">
                    <span className="nutrition-stat">~2000 kcal</span>
                    <span className="nutrition-stat">Protein: 30%</span>
                    <span className="nutrition-stat">Carbohydrates: 40%</span>
                    <span className="nutrition-stat">Lipids: 30%</span>
                  </div>
                </div>
                <div className="meals-timeline">
                  {workoutData[activeDay].Nutrition.map((meal, index) => {
                    const mealTimes = ['08:00', '12:30', '16:00', '19:30'];
                    const mealNames = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
                    
                    return (
                      <div key={index} className="meal-card">
                        <div className="meal-time-badge">{mealTimes[index]}</div>
                        <div className="meal-content">
                          <div className="meal-header">
                            <h4>{mealNames[index]}</h4>
                            <span className="meal-icon">{['🍳', '🥗', '🥤', '🍽️'][index]}</span>
                          </div>
                          <div className="meal-details">
                            <p>{meal}</p>
                          </div>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <div className="daily-summary">
            <div className="summary-header">
              <h3>Summary of the day</h3>
            </div>
            <div className="summary-content">
              <div className="summary-item">
                <div className="summary-icon">🔥</div>
                <div className="summary-text">
                  <div className="summary-label">Calories burned (estimated)</div>
                  <div className="summary-value">400-600 kcal</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">⏱️</div>
                <div className="summary-text">
                  <div className="summary-label">Training Time</div>
                  <div className="summary-value">60-90 min</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">💧</div>
                <div className="summary-text">
                  <div className="summary-label">Recommended hydration</div>
                  <div className="summary-value">2.5-3 L</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutPlan;