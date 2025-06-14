import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv("Symptom2Disease.csv")  # Columns: symptoms, disease

# Clean text
df['symptoms'] = df['symptoms'].str.lower().str.replace(r'[^\w\s,]', '', regex=True)

X = df['symptoms']
y = df['disease']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression(max_iter=1000))
])

# Train model
model.fit(X_train, y_train)

# Accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

# Save model and accuracy
model_data = {
    'model': model,
    'accuracy': accuracy
}

with open('symptom_model.pkl', 'wb') as f:
    pickle.dump(model_data, f)

print(f"✅ Symptom checker model trained with accuracy: {accuracy:.2f}")
print("✅ Model and accuracy saved as symptom_model.pkl")
