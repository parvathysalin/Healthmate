import React, { useState, useEffect } from 'react';
import './Dietplans.css';

const dietMappings = {
  'Heart Disease': [
    'Oats or whole-grain cereal for breakfast',
    'Leafy greens and colorful vegetables',
    'Fatty fish (salmon, mackerel) twice a week',
    'Nuts and seeds as snacks',
    'Limit saturated fats; use olive oil',
    'Fresh fruits (berries, apples)',
    'Reduce salt intake; use herbs/spices',
    'Stay hydrated with water and herbal teas',
  ],
  Diabetes: [
    'Whole grains (brown rice, quinoa)',
    'Non-starchy vegetables (broccoli, spinach)',
    'Lean protein (chicken, turkey, legumes)',
    'Healthy fats (avocado, nuts, olive oil)',
    'Monitor portion sizes; eat small frequent meals',
    'Low-GI fruits (berries, apples, pears)',
    'Limit sugary drinks; choose water or unsweetened tea',
  ],
  Hypertension: [
    'DASH-style diet: fruits, vegetables, low-fat dairy',
    'Whole grains and legumes',
    'Reduce sodium: avoid processed foods',
    'Potassium-rich foods (bananas, sweet potatoes)',
    'Lean proteins (fish, poultry, beans)',
    'Limit red meat and full-fat dairy',
    'Use herbs/spices instead of salt',
    'Regular hydration with water',
  ],
  'General Wellness': [
    'Balanced plate: half vegetables/fruit, quarter protein, quarter whole grains',
    'Include a variety of colors in meals',
    'Healthy fats in moderation (olive oil, nuts, seeds)',
    'Stay hydrated; limit sugary beverages',
    'Mindful eating: eat slowly and stop when full',
    'Regular meal times; avoid late-night heavy meals',
    'Include probiotic foods (yogurt, kefir) if tolerated',
  ],
};

const conditionOptions = Object.keys(dietMappings);

const DietPlans = () => {
  const [selectedCondition, setSelectedCondition] = useState(conditionOptions[0]);
  const [planItems, setPlanItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a slight delay for smooth transition
    const timer = setTimeout(() => {
      setPlanItems(dietMappings[selectedCondition] || []);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCondition]);

  return (
    <div className="dietplans-container">
      <h2>Diet Plan Recommendations</h2>
      <div className="condition-select">
        <label htmlFor="condition" className="visually-hidden">
          Select Health Condition
        </label>
        <select
          id="condition"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          aria-label="Select health condition for diet plan"
          disabled={isLoading}
        >
          {conditionOptions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>
      <div className={`diet-list ${isLoading ? 'loading' : ''}`}>
        {isLoading ? (
          <p className="loading-text">Loading diet plan...</p>
        ) : planItems.length > 0 ? (
          planItems.map((item, idx) => (
            <div
              key={idx}
              className="diet-card"
              role="listitem"
              aria-label={`Diet recommendation: ${item}`}
            >
              <span className="diet-icon"></span>
              <p>{item}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No diet recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default DietPlans;