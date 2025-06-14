import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './DoctorReccommendations.css';

const specialtyMap = {
  'Heart Disease': 'Cardiologist',
  'High Risk': 'Cardiologist',
  'Low Risk': 'Cardiologist',
  Diabetes: 'Endocrinologist',
  'Symptom Checker': 'General Physician',
  Cough: 'Pulmonologist',
  Fever: 'General Physician',
  Allergy: 'Allergist/Immunologist',
  Fatigue: 'General Physician',
};

const DoctorRecommendations = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const predictedSpecialty = queryParams.get('specialty');

  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [locationStatus, setLocationStatus] = useState('idle');
  const [coords, setCoords] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (predictedSpecialty && specialtyMap[predictedSpecialty]) {
      setSelectedSpecialty(specialtyMap[predictedSpecialty]);
    }
  }, [predictedSpecialty]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
    } else {
      setLocationStatus('fetching');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setLocationStatus('granted');
        },
        (error) => {
          console.error(error);
          setLocationStatus('denied');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (locationStatus === 'granted' && coords) {
      setIsLoading(true);
      const mock = [
        {
          name: 'Dr. Anjali Rao',
          specialty: 'Cardiologist',
          hospital: 'Apollo Hospitals',
          distance: '2.3 km',
        },
        {
          name: 'Dr. Vikram Singh',
          specialty: 'Endocrinologist',
          hospital: 'Fortis Healthcare',
          distance: '3.1 km',
        },
        {
          name: 'Dr. Neha Pillai',
          specialty: 'Pulmonologist',
          hospital: 'KIMS Hospital',
          distance: '1.2 km',
        },
        {
          name: 'Dr. Rohit Nair',
          specialty: 'Allergist/Immunologist',
          hospital: 'Amrita Hospital',
          distance: '2.5 km',
        },
        {
          name: 'City Care Clinic',
          specialty: 'General Physician',
          hospital: 'City Care Clinic',
          distance: '1.8 km',
        },
      ];
      setTimeout(() => {
        setRecommendations(mock);
        setIsLoading(false);
      }, 800);
    }
  }, [locationStatus, coords]);

  const filteredRecs =
    selectedSpecialty === 'All'
      ? recommendations
      : recommendations.filter((rec) => rec.specialty === selectedSpecialty);

  const renderContent = () => {
    if (locationStatus === 'idle' || locationStatus === 'fetching') {
      return <p className="status-message">Determining your location...</p>;
    }
    if (locationStatus === 'unsupported') {
      return (
        <p className="status-message error">
          Geolocation is not supported by your browser.
        </p>
      );
    }
    if (locationStatus === 'denied') {
      return (
        <p className="status-message error">
          Location access denied. Please enable location access or enter your city
          manually.
        </p>
      );
    }
    if (isLoading) {
      return <p className="status-message">Loading recommendations...</p>;
    }
    if (recommendations.length === 0) {
      return <p className="status-message">No recommendations available.</p>;
    }
    if (filteredRecs.length === 0) {
      return (
        <p className="status-message">
          No doctors found for "{selectedSpecialty}".
        </p>
      );
    }
    return (
      <div className="recommendations-list">
        {filteredRecs.map((rec, idx) => (
          <div
            key={idx}
            className="recommendation-card"
            role="listitem"
            aria-label={`Doctor: ${rec.name}, ${rec.specialty}`}
          >
            <span className="doctor-icon"></span>
            <h4>{rec.name}</h4>
            <p>
              <strong>Specialty:</strong> {rec.specialty}
            </p>
            <p>
              <strong>Hospital:</strong> {rec.hospital}
            </p>
            <p>
              <strong>Distance:</strong> {rec.distance}
            </p>
            <button
              className="contact-btn"
              aria-label={`Book appointment with ${rec.name}`}
              title="Book Appointment"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="recommendations-container">
      <h2>Doctor & Hospital Recommendations</h2>
      <div className="filter-container">
        <label htmlFor="specialty-select" className="visually-hidden">
          Filter by Specialty
        </label>
        <select
          id="specialty-select"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          aria-label="Filter doctors by specialty"
          disabled={isLoading}
        >
          <option value="All">All Specialties</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="Pulmonologist">Pulmonologist</option>
          <option value="Allergist/Immunologist">Allergist/Immunologist</option>
          <option value="General Physician">General Physician</option>
        </select>
      </div>
      {renderContent()}
    </div>
  );
};

export default DoctorRecommendations;