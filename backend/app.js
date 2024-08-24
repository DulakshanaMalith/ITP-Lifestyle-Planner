const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
//login 
const userRoutes = require('./routes/userRoutes');

//meet-assist
const router=require("./routes/MeetAssistRoutes");

//auto-assist
const vehicleRoutes = require('./routes/vehicleRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const serviceStationRoutes = require('./routes/serviceStationRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const goalRoutes = require('./routes/goalRoutes');




const app = express();
const bodyParser = require('body-parser');

//require('./scheduler');
require('dotenv').config();

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


//finance guard
app.use('/income', incomeRoutes);
app.use('/goals', goalRoutes); 
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

mongoose.connect("mongodb+srv://chamilasewmini2:CScs2436@portfolio.kr18ftg.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
