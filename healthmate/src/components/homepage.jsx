import React, { useState } from 'react';
import Navbar from './Navbar';
import './homepage.css';
import logo from '../assets/logo.png';
const Homepage = () => {
  const [form, setForm] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    symptoms: ''
  });

  const [result, setResult] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = (formData, fields) => {
    const newErrors = {};
    fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleHeartSubmit = async (e) => {
    e.preventDefault();
    const fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    const newErrors = validateForm(form, fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const response = await fetch('http://localhost:3000/api/predict/heart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(`Heart Disease Prediction: ${data.result}`);
  };

  const handleDiabetesSubmit = async (e) => {
    e.preventDefault();
    const fields = ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness', 'insulin', 'bmi', 'diabetesPedigreeFunction', 'age'];
    const newErrors = validateForm(form, fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const response = await fetch('http://localhost:3000/api/predict/diabetes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(`Diabetes Risk Prediction: ${data.result}`);
  };

  const handleSymptomSubmit = async (e) => {
    e.preventDefault();
    if (!form.symptoms) {
      setErrors({ symptoms: 'Please enter symptoms' });
      return;
    }
    const response = await fetch('http://localhost:3000/api/predict/symptom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: form.symptoms }),
    });
    const data = await response.json();
    setResult(`Symptom Checker Result: ${data.result}`);
  };

  const toggleForm = (formName) => {
    setActiveForm(activeForm === formName ? null : formName);
    setErrors({});
    setResult(null);
  };

  return (
    <div className="homepage">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Your Health, Our Priority</h1>
            <p>Experience cutting-edge AI diagnostics and connect with top healthcare providers.</p>
            <a href="#assessment" className="hero-button" aria-label="Get started with health assessment">Get Started</a>
          </div>
        </section>

        {/* Services Section */}
        <section className="services" id="services">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="icon diagnostics"></span>
              <h3>AI Diagnostics</h3>
              <p>Predict health risks with advanced machine learning.</p>
            </div>
            <div className="service-card">
              <span className="icon monitoring"></span>
              <h3>Health Monitoring</h3>
              <p>Track your wellness with intuitive tools.</p>
            </div>
            <div className="service-card">
              <span className="icon triage"></span>
              <h3>Triage Support</h3>
              <p>Instant guidance on symptoms and care.</p>
            </div>
          </div>
        </section>

        {/* Providers Section */}
        <section className="providers" id="providers">
          <h2>Trusted Providers</h2>
          <div className="providers-grid">
            {[
              { name: 'Apollo Hospital', location: 'Chennai, India' },
              { name: 'AIIMS', location: 'New Delhi, India' },
              { name: 'Fortis', location: 'Mumbai, India' }
            ].map((provider, index) => (
              <div key={index} className="provider-card">
                <h3>{provider.name}</h3>
                <p>{provider.location}</p>
                <a href="#" className="provider-link" aria-label={`Learn more about ${provider.name}`}>Learn More</a>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Section */}
        <section className="assessment" id="assessment">
          <h2>Health Risk Assessment</h2>
          <div className="assessment-grid">
            <div className="assessment-card">
              <button 
                className={`assessment-header ${activeForm === 'heart' ? 'active' : ''}`}
                onClick={() => toggleForm('heart')}
                aria-expanded={activeForm === 'heart'}
                aria-controls="heart-form"
              >
                Heart Disease Risk
              </button>
              {activeForm === 'heart' && (
                <form id="heart-form" onSubmit={handleHeartSubmit} className="assessment-form">
                  {[
                    { id: 'heart-age', name: 'age', label: 'Age', placeholder: 'e.g., 45' },
                    { id: 'heart-sex', name: 'sex', label: 'Sex', placeholder: 'M or F' },
                    { id: 'heart-cp', name: 'cp', label: 'Chest Pain Type', placeholder: '0-3' },
                    { id: 'heart-trestbps', name: 'trestbps', label: 'Resting Blood Pressure (mm Hg)', placeholder: 'e.g., 120' },
                    { id: 'heart-chol', name: 'chol', label: 'Cholesterol (mg/dl)', placeholder: 'e.g., 200' },
                    { id: 'heart-fbs', name: 'fbs', label: 'Fasting Blood Sugar (Y/N)', placeholder: 'Y or N' },
                    { id: 'heart-restecg', name: 'restecg', label: 'Rest ECG (0-2)', placeholder: '0-2' },
                    { id: 'heart-thalach', name: 'thalach', label: 'Max Heart Rate', placeholder: 'e.g., 150' },
                    { id: 'heart-exang', name: 'exang', label: 'Exercise Induced Angina (Y/N)', placeholder: 'Y or N' },
                    { id: 'heart-oldpeak', name: 'oldpeak', label: 'Oldpeak', placeholder: 'e.g., 1.2' },
                    { id: 'heart-slope', name: 'slope', label: 'Slope (0-2)', placeholder: '0-2' },
                    { id: 'heart-ca', name: 'ca', label: 'Major Vessels (0-3)', placeholder: '0-3' },
                    { id: 'heart-thal', name: 'thal', label: 'Thal (normal/fixed/reversible)', placeholder: 'e.g., normal' }
                  ].map(field => (
                    <div key={field.id} className="form-group">
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        aria-required="true"
                      />
                      {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                    </div>
                  ))}
                  <button type="submit" className="submit-button" aria-label="Predict heart disease risk">Predict Risk</button>
                </form>
              )}
            </div>
            <div className="assessment-card">
              <button 
                className={`assessment-header ${activeForm === 'diabetes' ? 'active' : ''}`}
                onClick={() => toggleForm('diabetes')}
                aria-expanded={activeForm === 'diabetes'}
                aria-controls="diabetes-form"
              >
                Diabetes Risk
              </button>
              {activeForm === 'diabetes' && (
                <form id="diabetes-form" onSubmit={handleDiabetesSubmit} className="assessment-form">
                  {[
                    { id: 'diabetes-pregnancies', name: 'pregnancies', label: 'Number of Pregnancies', placeholder: 'e.g., 2' },
                    { id: 'diabetes-glucose', name: 'glucose', label: 'Glucose (mg/dl)', placeholder: 'e.g., 120' },
                    { id: 'diabetes-bloodPressure', name: 'bloodPressure', label: 'Blood Pressure (mm Hg)', placeholder: 'e.g., 80' },
                    { id: 'diabetes-skinThickness', name: 'skinThickness', label: 'Skin Thickness (mm)', placeholder: 'e.g., 20' },
                    { id: 'diabetes-insulin', name: 'insulin', label: 'Insulin (mu U/ml)', placeholder: 'e.g., 100' },
                    { id: 'diabetes-bmi', name: 'bmi', label: 'BMI', placeholder: 'e.g., 25.5' },
                    { id: 'diabetes-diabetesPedigreeFunction', name: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', placeholder: 'e.g., 0.5' },
                    { id: 'diabetes-age', name: 'age', label: 'Age', placeholder: 'e.g., 45' }
                  ].map(field => (
                    <div key={field.id} className="form-group">
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        aria-required="true"
                      />
                      {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                    </div>
                  ))}
                  <button type="submit" className="submit-button" aria-label="Predict diabetes risk">Predict Risk</button>
                </form>
              )}
            </div>
            <div className="assessment-card">
              <button 
                className={`assessment-header ${activeForm === 'symptom' ? 'active' : ''}`}
                onClick={() => toggleForm('symptom')}
                aria-expanded={activeForm === 'symptom'}
                aria-controls="symptom-form"
              >
                Symptom Checker
              </button>
              {activeForm === 'symptom' && (
                <form id="symptom-form" onSubmit={handleSymptomSubmit} className="assessment-form">
                  <div className="form-group">
                    <label htmlFor="symptoms">Symptoms</label>
                    <textarea
                      id="symptoms"
                      name="symptoms"
                      placeholder="e.g., fever, cough, headache"
                      onChange={handleChange}
                      aria-required="true"
                    ></textarea>
                    {errors.symptoms && <span className="error">{errors.symptoms}</span>}
                  </div>
                  <button type="submit" className="submit-button" aria-label="Check symptoms">Check Symptoms</button>
                </form>
              )}
            </div>
          </div>
          {result && (
            <div className="result-card" role="alert">
              <p>{result}</p>
              <button onClick={() => setResult(null)} className="close-button" aria-label="Close result">×</button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="HealthMate Logo" />
            </div>
            <div className="footer-links">
              <a href="#" aria-label="Privacy Policy">Privacy Policy</a>
              <a href="#" aria-label="Terms of Service">Terms of Service</a>
              <a href="#" aria-label="Contact Us">Contact Us</a>
            </div>
            <div className="footer-contact">
              <p>Email: <a href="mailto:support@healthmate.com">support@healthmate.com</a></p>
              <p>Phone: +1-800-555-1234</p>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><span className="icon twitter"></span></a>
              <a href="#" aria-label="LinkedIn"><span className="icon linkedin"></span></a>
              <a href="#" aria-label="Facebook"><span className="icon facebook"></span></a>
            </div>
          </div>
          <p className="footer-copyright">© 2025 HealthMate. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Homepage;