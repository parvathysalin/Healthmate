import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv("/home/user/healthmate/backend/ml-models/heart.csv")

# Split features and target
X = df.drop("condition", axis=1)
y = df["condition"]

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

# Save model and accuracy together
model_data = {
    'model': model,
    'accuracy': accuracy
}

with open("/home/user/healthmate/backend/ml-models/heart_model.pkl", "wb") as f:
    pickle.dump(model_data, f)

print(f"✅ Heart disease model trained with accuracy: {accuracy:.2f}")
print("✅ Model and accuracy saved as heart_model.pkl")
