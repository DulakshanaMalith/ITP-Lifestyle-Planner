const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//login 
const userRoutes = require('./routes/userRoutes');

//meet-assist
const router=require("./routes/MeetAssistRoutes");

//auto-assist
const vehicleRoutes = require('./routes/vehicleRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const serviceStationRoutes = require('./routes/serviceStationRoutes');


const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


//login
app.use('/api/users', userRoutes);
//meet-assist
app.use("/meet",router);
//auto-assist
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/service-stations', serviceStationRoutes);


mongoose.connect("mongodb+srv://chamilasewmini2:CScs2436@portfolio.kr18ftg.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
