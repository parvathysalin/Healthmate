const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/prediction');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://parvathyysalin:itsme@cluster0.hmdcext.mongodb.net/Healthmate?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));


app.use('/api/predictions', predictionRoutes);


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
