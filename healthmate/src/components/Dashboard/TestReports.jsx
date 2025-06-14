import React, { useState } from 'react';
import './TestReports.css';

const TestReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const newReport = {
          name: selectedFile.name,
          uploadedAt: new Date().toLocaleDateString(),
        };
        setReports([...reports, newReport]);
        setSelectedFile(null);
        setIsUploading(false);
      }, 800);
    }
  };

  return (
    <div className="testreports-container">
      <h2>Your Test Reports</h2>
      <div className="upload-section">
        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-input-label">
            {selectedFile ? selectedFile.name : 'Choose a file'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            aria-label="Upload test report file"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          aria-label="Upload selected report"
        >
          {isUploading ? 'Uploading...' : 'Upload Report'}
        </button>
      </div>
      <div className="reports-list" role="list" aria-label="Uploaded test reports">
        {isUploading && <p className="status-message">Uploading report...</p>}
        {!isUploading && reports.length === 0 ? (
          <p className="status-message">No reports uploaded yet. Upload a report to get started.</p>
        ) : (
          reports.map((report, index) => (
            <div
              key={index}
              className="report-card"
              role="listitem"
              aria-label={`Report: ${report.name}`}
            >
              <span className="report-icon"></span>
              <h4>{report.name}</h4>
              <p>
                <strong>Uploaded:</strong> {report.uploadedAt}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestReports;