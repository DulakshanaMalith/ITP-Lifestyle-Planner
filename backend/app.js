const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./scheduler');
const { MONGO_URI } = require('./config');
const userRoutes = require('./routes/userRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/goals', goalRoutes); 

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
