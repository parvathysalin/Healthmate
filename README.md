# HealthMate

An AI-powered health web app to predict disease risks (heart disease, diabetes, symptom-based illnesses), track past predictions, and display data analysis. Built with React frontend, Node.js/Express + MongoDB backend, and Flask-based ML APIs.

## Features
- **Real-time AI Predictions**  
  - Heart Disease (Random Forest)  
  - Diabetes Risk (Random Forest)  
  - Symptom Checker (Logistic Regression + TF-IDF)  
- **User Authentication & History**  
  - Signup/Login (Node.js + MongoDB)  
  - Store and display previous predictions with date and accuracy  
- **Unified Prediction Form**  
  - Combined inputs for heart, diabetes, and symptoms on homepage  
- **Dashboard**  
  - View past predictions in a timeline/grid  
  - Optionally view recommended doctors (based on result)  
- **Data Analysis**  
  - Exploratory Data Analysis notebooks (Correlations, distributions, word clouds) for heart, diabetes, and symptom datasets  
- **Responsive, Creative UI**  
  - React components with a white & blue theme, animations, and clear layout

## Tech Stack
- **Frontend**: React.js, React Router, CSS  
- **Backend**:  
  - **Node.js / Express**: user auth, prediction history routes, MongoDB integration via Mongoose  
  - **Flask (Python)**: ML APIs serving trained models  
- **Database**: MongoDB (Atlas or local)  
- **ML & Data Analysis**: Python, Pandas, Scikit-learn, joblib/pickle, Matplotlib/Seaborn (notebooks)  
- **Deployment (future)**: Docker, cloud services (e.g., Vercel/Render/Railway)


