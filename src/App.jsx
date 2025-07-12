import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const activities = [
    "Прикоснись лбом к лбу и задержись на 5 секунд",
    "Погладь волосы или щёку — как в романтическом фильме",
    "Легонько укусить за ухо или шею",
    "Сделай массаж одной стопы",
    "Обними участника как будто вы — страстные влюблённые",
    "Поцелуй в щёку, но медленно и чувственно (с языком)",
    "Медленный поцелуй в шею",
    "Прошепчи что-то игривое прямо на ухо",
    "Заяц несудьбы - в другой раз",
    "Нарисуй пальцем сердечко на спине партнёра"
  ];

  const flagColors = [
    '#FF6289', // Red
    '#FF9B55', // Orange
    '#FCD757', // Yellow
    '#8EE08E', // Green
    '#62B6CB', // Blue
    '#8B62C9'  // Violet
  ];

  const [stripeData, setStripeData] = useState([]);

  const generateNewStripeData = () => {
    const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());
    const selectedActivities = shuffledActivities.slice(0, 6);

    const newStripeData = flagColors.map((color, index) => ({
      color: color,
      activity: selectedActivities[index],
      isExpanded: false,
      isFlipped: false
    }));
    setStripeData(newStripeData);
  };

  useEffect(() => {
    generateNewStripeData();
  }, []);

  const handleStripeTouch = (index) => {
    setStripeData(prevStripeData => {
      const newStripeData = [...prevStripeData];
      const currentStripe = newStripeData[index];

      if (!currentStripe.isExpanded) {
        // First, expand the stripe
        newStripeData[index] = { ...currentStripe, isExpanded: true };
        // Then, after expansion, flip it
        setTimeout(() => {
          setStripeData(currentData => {
            const updatedData = [...currentData];
            updatedData[index] = { ...updatedData[index], isFlipped: true };
            return updatedData;
          });
        }, 500); // Matches the transition duration for expansion in App.css
      } else if (currentStripe.isExpanded && currentStripe.isFlipped) {
        // Card is flipped, flip back
        newStripeData[index] = { ...currentStripe, isFlipped: false };
        // After flip back animation, shrink
        setTimeout(() => {
          setStripeData(currentData => {
            const updatedData = [...currentData];
            updatedData[index] = { ...updatedData[index], isExpanded: false };
            return updatedData;
          });
        }, 500); // Matches the transition duration for flip in App.css
      }
      return newStripeData;
    });
  };

  return (
    <div className="app-container">
      {stripeData.map((stripe, index) => (
        <div
          key={index}
          className={`flag-stripe ${stripe.isExpanded ? 'expanded' : ''} ${stripe.isFlipped ? 'flipped' : ''}`}
          style={{ backgroundColor: stripe.color }}
          onTouchStart={() => handleStripeTouch(index)}
          onClick={() => handleStripeTouch(index)}
        >
          <div className="card-front"></div>
          <div className="card-back">
            <span className="activity-text">{stripe.activity}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
