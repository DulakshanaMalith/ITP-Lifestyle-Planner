const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const router=require("./routes/1MeetAssistRoutes");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use("/meet",router);


mongoose.connect("mongodb+srv://chamilasewmini2:CScs2436@portfolio.kr18ftg.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
