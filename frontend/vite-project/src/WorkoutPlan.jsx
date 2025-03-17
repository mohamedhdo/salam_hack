import React, { useState, useEffect } from 'react';
import './WorkoutPlan.css';

function WorkoutPlan({ userData }) {
  const [workoutData, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userData) return;
      
      setLoading(true);
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
        setWorkoutData(JSON.parse(data.workout_plan));
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
        <p>Generating your personalized program...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!workoutData) {
    return (
      <div className="empty-plan-container">
        <p>Submit your information to get your personalized workout plan</p>
      </div>
    );
  }

  return (
    <div className="workout-plan-container">
      <div className="program-header">
        <h2>Your Personalized Workout Plan</h2>
        <p>Follow this program for optimal results</p>
      </div>

      <div className="user-stats">
        <div className="stat-box">
          <div className="stat-value">{userData.weight} kg</div>
          <div className="stat-label">Weight</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{userData.height} cm</div>
          <div className="stat-label">Height</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{userData.goal}</div>
          <div className="stat-label">Goal</div>
        </div>
      </div>

      <div className="workout-schedule">
        {Object.entries(workoutData).map(([day, exercises]) => (
          <div key={day} className="day-plan">
            <h3 className="day-header">{day}</h3>
            <div className="exercises-list">
              {exercises.map((exercise, index) => (
                <div key={index} className="exercise-item">
                  <div className="exercise-name">{exercise}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutPlan;
