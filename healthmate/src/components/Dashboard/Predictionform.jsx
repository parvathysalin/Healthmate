import React, { useState, useEffect } from 'react';
import './PredictionForm.css';
import { useNavigate } from 'react-router-dom';

const fieldConfigs = {
  heart: [
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'sex', label: 'Gender (M/F)', type: 'text' },
    { name: 'cp', label: 'Chest Pain Type', type: 'text' },
    { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number' },
    { name: 'chol', label: 'Cholesterol', type: 'number' },
    { name: 'fbs', label: 'Fasting Blood Sugar (>120 mg/dl) (Y/N)', type: 'text' },
    { name: 'restecg', label: 'Rest ECG Result', type: 'text' },
    { name: 'thalach', label: 'Max Heart Rate Achieved', type: 'number' },
    { name: 'exang', label: 'Exercise Induced Angina (Y/N)', type: 'text' },
    { name: 'oldpeak', label: 'ST Depression', type: 'number' },
    { name: 'slope', label: 'Slope of ST Segment', type: 'text' },
    { name: 'ca', label: 'Number of Major Vessels (0-3)', type: 'number' },
    { name: 'thal', label: 'Thalassemia Value', type: 'text' },
  ],
  diabetes: [
    { name: 'pregnancies', label: 'Pregnancies', type: 'number' },
    { name: 'glucose', label: 'Glucose Level', type: 'number' },
    { name: 'bloodPressure', label: 'Blood Pressure', type: 'number' },
    { name: 'skinThickness', label: 'Skin Thickness', type: 'number' },
    { name: 'insulin', label: 'Insulin Level', type: 'number' },
    { name: 'bmi', label: 'BMI', type: 'number' },
    { name: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', type: 'number' },
    { name: 'age', label: 'Age', type: 'number' },
  ],
  symptom: [
    { name: 'symptoms', label: 'Describe Symptoms', type: 'textarea' },
  ],
};

const PredictionForm = () => {
  const [predictionType, setPredictionType] = useState('heart');
  const [formData, setFormData] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);
  const [recommendedSpecialty, setRecommendedSpecialty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const config = fieldConfigs[predictionType] || [];
    const initialData = {};
    config.forEach((field) => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
    setPredictionResult(null);
    setRecommendedSpecialty('');
  }, [predictionType]);

  const handleTypeChange = (e) => {
    setPredictionType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictionResult(null);
    setRecommendedSpecialty('');

    try {
      let endpoint = '';
      if (predictionType === 'heart') {
        endpoint = 'http://localhost:3000/api/predict/heart';
      } else if (predictionType === 'diabetes') {
        endpoint = 'http://localhost:3000/api/predict/diabetes';
      } else if (predictionType === 'symptom') {
        endpoint = 'http://localhost:3000/api/predict/symptom';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result) {
        setPredictionResult(result.result);

        // Determine recommended specialty
        let specialty = '';
        const prediction = result.result.toLowerCase();

        if (prediction.includes('heart')) {
          specialty = 'Cardiologist';
        } else if (prediction.includes('diabetes')) {
          specialty = 'Endocrinologist';
        } else if (prediction.includes('fever') || prediction.includes('cold') || prediction.includes('cough')) {
          specialty = 'Pulmonologist';
        } else if (prediction.includes('allergy')) {
          specialty = 'Allergist/Immunologist';
        } else {
          specialty = 'General Physician';
        }

        setRecommendedSpecialty(specialty);

        // Get logged-in userId from localStorage
        const userId = localStorage.getItem('userId');

        // Save prediction to backend
        if (userId) {
          await fetch('http://localhost:5000/api/predictions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              condition: getTitle(),
              result: result.result,
              accuracy: result.accuracy || 'N/A',
            }),
          });
        }
      } else {
        setPredictionResult('Prediction failed.');
      }
    } catch (error) {
      console.error('Error in prediction:', error);
      setPredictionResult('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => {
    const config = fieldConfigs[predictionType] || [];
    return config.map((field) => (
      <div key={field.name} className="form-field">
        <label htmlFor={field.name}>{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required
            aria-label={field.label}
            disabled={isLoading}
          />
        ) : (
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required
            aria-label={field.label}
            disabled={isLoading}
          />
        )}
      </div>
    ));
  };

  const getTitle = () => {
    if (predictionType === 'heart') return 'Heart Disease Risk Prediction';
    if (predictionType === 'diabetes') return 'Diabetes Risk Prediction';
    if (predictionType === 'symptom') return 'Symptom Checker';
    return 'Health Prediction';
  };

  return (
    <div className="predictionform-container">
      <h2>{getTitle()}</h2>
      <div className="type-select">
        <label htmlFor="predictionType" className="visually-hidden">
          Select Prediction Type
        </label>
        <select
          id="predictionType"
          value={predictionType}
          onChange={handleTypeChange}
          aria-label="Select prediction type"
          disabled={isLoading}
        >
          <option value="heart">Heart Disease</option>
          <option value="diabetes">Diabetes</option>
          <option value="symptom">Symptom Checker</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} aria-busy={isLoading}>
        {renderFields()}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {predictionResult && (
        <div className="prediction-result">
          <h3>Prediction Result</h3>
          <p>{predictionResult}</p>
          {recommendedSpecialty && (
            <button
              className="view-doctors-btn"
              onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(recommendedSpecialty)}`)}
              aria-label={`View recommended ${recommendedSpecialty} doctors`}
              title="View Recommended Doctors"
            >
              View Recommended Doctors
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;