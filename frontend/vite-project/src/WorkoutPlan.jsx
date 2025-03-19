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
        
        if (typeof data.workout_plan === 'string') {
          setWorkoutData(JSON.parse(data.workout_plan));
        } else {
          setWorkoutData(data.workout_plan);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [userData]);

  useEffect(() => {
    console.log("Updated workoutData:", workoutData);
  }, [workoutData]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Generating your personalized program...</p>
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
        {Object.entries(workoutData).map(([day, data]) => (
          <div key={day} className="day-plan">
            <h3 className="day-header">{day}</h3>
            
           
            <div  >
              <h4>Workout</h4>
              <ul>
                {data.Workout.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
            </div>

             
            <div >
              <h4>Nutrition</h4>
              <ul>
                {data.Nutrition.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutPlan;
