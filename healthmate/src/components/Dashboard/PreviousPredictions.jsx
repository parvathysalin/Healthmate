import React, { useEffect, useState } from 'react';
import './PreviousPredictions.css';

const PreviousPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setIsLoading(false);
      setError('Please log in to view your predictions.');
      return;
    }

    setIsLoading(true);
    fetch(`http://localhost:5000/api/predictions/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch predictions.');
        return res.json();
      })
      .then((data) => {
        setPredictions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching predictions:', err);
        setError('Unable to load predictions. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="predictions-container">
      <h2>Your Previous Predictions</h2>
      {isLoading ? (
        <p className="status-message">Loading predictions...</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : predictions.length === 0 ? (
        <p className="status-message">No predictions found. Make a new prediction to get started.</p>
      ) : (
        <div className="predictions-grid" role="list" aria-label="Previous predictions">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="prediction-card"
              role="listitem"
              aria-label={`Prediction: ${prediction.condition}`}
            >
              <span className="prediction-icon"></span>
              <h3>{prediction.condition}</h3>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(prediction.createdAt?.$date || prediction.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Result:</strong> {prediction.result}
              </p>
              <p>
                <strong>Accuracy:</strong> {prediction.accuracy}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousPredictions;