const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

//require('./scheduler');
require('dotenv').config();



///reruire 8 funtions routes.....................

//login 
const userRoutes = require('./routes/userRoutes');

//meet-assist
const router=require("./routes/MeetAssistRoutes");
const meetSheduleRoutes = require('./routes/MeetSheduleRoute');

//auto-assist
const vehicleRoutes = require('./routes/vehicleRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const serviceStationRoutes = require('./routes/serviceStationRoutes');

//finance guard
const incomeRoutes = require('./routes/incomeRoutes');
const goalRoutes = require('./routes/goalRoutes');

//shop smart
const todoRoutes = require("./routes/TodoRoute");
const eventRoutes = require('./routes/EventRoute');
const MeetingRoute = require('./routes/MeetingRoute');
const vehicleRoute = require('./routes/VehicleRoute');
const occasionRoutes = require('./routes/OccasionRoute');
const hospitalTasksRouter = require('./routes/hospitalTasksRoute');

//eventPlanner
const eventsRoutes = require("./routes/eventRoutes");
const CreateItineraryRoute = require("./routes/CreateItineraryRoute");
const activityRoutes = require("./routes/activityRoutes");
const expensesRoutes = require("./routes/expensesRoutes");
const guestListRoutes = require('./routes/guestListRoutes');

//eventMinder
const eventMinderReminderRoutes = require("./routes/eventMinderReminderRoutes");

//Pay-Track
const paymentRoutes = require('./routes/paymentRoutes');


//health-mate
const healthroute = require('./routes/HealthMatereminderRoutes');
//........................................

const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


//routes.......................................
//login
app.use('/api/users', userRoutes);


//meet-assist
app.use("/meet",router);
app.use('/meetShedule', meetSheduleRoutes);


//auto-assist
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/service-stations', serviceStationRoutes);


//finance guard
app.use('/income', incomeRoutes);
app.use('/goals', goalRoutes); 

//eventPlanner
app.use('/api', eventsRoutes);
app.use('/api',CreateItineraryRoute);
app.use('/api', activityRoutes);
app.use('/api', expensesRoutes);
app.use('/api', guestListRoutes);

//shop smart
app.use("/todos", todoRoutes);
app.use("/events", eventRoutes); 
app.use('/meetings', MeetingRoute);
app.use("/vehicles", vehicleRoute);
app.use('/occasions', occasionRoutes);
app.use('/hospitals', hospitalTasksRouter);

//eventMinder
app.use("/eventMind", eventMinderReminderRoutes);

//Pay-Track
app.use('/api/payments', paymentRoutes);

//health-mate
app.use('/health', healthroute);
//.................................................

//finance-guard
/*app.get('/api/rates', async (req, res) => {
  try {
    
    const goldResponse = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: 'XAUUSD',  
        apikey: process.env.ALPHAVANTAGE_API_KEY,
      },
    });

   
    const silverResponse = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: 'XAGUSD',  
        apikey: process.env.ALPHAVANTAGE_API_KEY,
      },
    });

   
    const latestGoldDate = Object.keys(goldResponse.data['Time Series (Daily)'])[0];
    const latestGoldPrice = goldResponse.data['Time Series (Daily)'][latestGoldDate]['4. close'];
    const goldRatePerGram = parseFloat(latestGoldPrice) / 31.1035;

   
    const latestSilverDate = Object.keys(silverResponse.data['Time Series (Daily)'])[0];
    const latestSilverPrice = silverResponse.data['Time Series (Daily)'][latestSilverDate]['4. close'];
    const silverRatePerGram = parseFloat(latestSilverPrice) / 28.3495;

    
    res.json({
      goldRatePerGram: goldRatePerGram.toFixed(2),
      silverRatePerGram: silverRatePerGram.toFixed(2),
    });
  } catch (error) {
    console.error('Error fetching rates:', error);
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});


*/

//................................................


mongoose.connect("mongodb+srv://chamilasewmini2:CScs2436@portfolio.kr18ftg.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
