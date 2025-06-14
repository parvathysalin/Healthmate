from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models and accuracies from pickled dicts
def load_model(path):
    with open(path, 'rb') as f:
        data = pickle.load(f)
    return data['model'], round(data.get('accuracy', 0.0), 2)

# Load all models with accuracy
heart_model, heart_accuracy = load_model('heart_model.pkl')
diabetes_model, diabetes_accuracy = load_model('diabetes_model.pkl')
symptom_model, symptom_accuracy = load_model('symptom_model.pkl')

@app.route('/api/predict/heart', methods=['POST'])
def predict_heart():
    try:
        data = request.json
        print("Received (Heart):", data)

        sex = 1 if data['sex'].strip().upper() == 'M' else 0
        cp = int(data['cp'])
        trestbps = float(data['trestbps'])
        chol = float(data['chol'])
        fbs = 1 if data['fbs'].strip().upper() == 'Y' else 0
        restecg = int(data['restecg'])
        thalach = float(data['thalach'])
        exang = 1 if data['exang'].strip().upper() == 'Y' else 0
        oldpeak = float(data['oldpeak'])
        slope = int(data['slope'])
        ca = int(data['ca'])

        thal_map = {"normal": 1, "fixed defect": 2, "reversible defect": 3}
        thal = thal_map.get(data['thal'].strip().lower(), 1)

        features = [
            float(data['age']), sex, cp, trestbps, chol, fbs,
            restecg, thalach, exang, oldpeak, slope, ca, thal
        ]

        pred = heart_model.predict([features])[0]
        result = "High Risk" if pred == 1 else "Low Risk"
        return jsonify({'result': result, 'accuracy': heart_accuracy})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json
        print("Received (Diabetes):", data)

        features = [
            float(data['pregnancies']),
            float(data['glucose']),
            float(data['bloodPressure']),
            float(data['skinThickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['diabetesPedigreeFunction']),
            float(data['age'])
        ]

        prediction = diabetes_model.predict([features])[0]
        result = "High Risk" if prediction == 1 else "Low Risk"
        return jsonify({'result': result, 'accuracy': diabetes_accuracy})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/symptom', methods=['POST'])
def predict_symptom():
    try:
        data = request.json
        symptoms_text = data.get('symptoms', '').strip().lower()

        if not symptoms_text:
            return jsonify({'error': 'No symptoms provided'}), 400

        prediction = symptom_model.predict([symptoms_text])[0]
        return jsonify({'result': prediction, 'accuracy': symptom_accuracy})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
