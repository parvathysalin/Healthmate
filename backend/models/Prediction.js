const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  condition: { type: String, required: true },
  result: { type: String, required: true },
  accuracy: { type: String },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true  // ✅ Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Prediction', predictionSchema);
