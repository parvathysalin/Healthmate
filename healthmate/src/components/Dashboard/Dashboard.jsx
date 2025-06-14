import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import PreviousPredictions from './PreviousPredictions';
import TestReports from './TestReports';
import PredictionForm from './Predictionform';
import DoctorRecommendations from './DoctorRecommendations';
import DietPlans from './Dietplan';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('predictions');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'predictions':
        return <PreviousPredictions />;
      case 'reports':
        return <TestReports />;
      case 'predict':
        return <PredictionForm />;
      case 'recommendations':
        return <DoctorRecommendations />;
      case 'diet':
        return <DietPlans />;
      default:
        return <PreviousPredictions />;
    }
  };

  return (
    <div className="dashboard">
      <button
        className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-expanded={isSidebarOpen}
        aria-label="Toggle sidebar"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>HealthMate</h2>
        </div>
        <nav className="sidebar-nav" role="navigation" aria-label="Dashboard navigation">
          <ul>
            <li
              className={activeSection === 'predictions' ? 'active' : ''}
              onClick={() => {
                setActiveSection('predictions');
                setIsSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-current={activeSection === 'predictions' ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSection('predictions');
                  setIsSidebarOpen(false);
                }
              }}
              title="View your health records"
            >
              <span className="icon predictions"></span> Health Records
            </li>
            <li
              className={activeSection === 'reports' ? 'active' : ''}
              onClick={() => {
                setActiveSection('reports');
                setIsSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-current={activeSection === 'reports' ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSection('reports');
                  setIsSidebarOpen(false);
                }
              }}
              title="Access your test reports"
            >
              <span className="icon reports"></span> Test Reports
            </li>
            <li
              className={activeSection === 'predict' ? 'active' : ''}
              onClick={() => {
                setActiveSection('predict');
                setIsSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-current={activeSection === 'predict' ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSection('predict');
                  setIsSidebarOpen(false);
                }
              }}
              title="Make a new health prediction"
            >
              <span className="icon predict"></span> New Prediction
            </li>
            <li
              className={activeSection === 'recommendations' ? 'active' : ''}
              onClick={() => {
                setActiveSection('recommendations');
                setIsSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-current={activeSection === 'recommendations' ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSection('recommendations');
                  setIsSidebarOpen(false);
                }
              }}
              title="Find doctors and hospitals"
            >
              <span className="icon recommendations"></span> Doctor/Hospitals
            </li>
            <li
              className={activeSection === 'diet' ? 'active' : ''}
              onClick={() => {
                setActiveSection('diet');
                setIsSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-current={activeSection === 'diet' ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSection('diet');
                  setIsSidebarOpen(false);
                }
              }}
              title="View your diet plan"
            >
              <span className="icon diet"></span> Diet Plan
            </li>
          </ul>
        </nav>
        <button
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Log out of your account"
          title="Log out"
        >
          <span className="icon logout"></span> Log Out
        </button>
      </aside>
      <main className="dashboard-content">
        <header className="content-header">
          <h1>
            {activeSection === 'predictions' && 'Health Records'}
            {activeSection === 'reports' && 'Test Reports'}
            {activeSection === 'predict' && 'New Prediction'}
            {activeSection === 'recommendations' && 'Doctor/Hospitals'}
            {activeSection === 'diet' && 'Diet Plan'}
          </h1>
        </header>
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;