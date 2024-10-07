import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
//import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard/Dashboard';
import MeetHome from './components/MeetAssist/MeetHome/MeetHome';
import AddNewMeeting from './components/MeetAssist/AddNewMeeting/AddNewMeeting';
import UpcomingMeet from './components/MeetAssist/UpcomingMeet/UpcomingMeet';
import ShowAMeet from './components/MeetAssist/ShowAMeet/ShowAMeet';
import ChangeMeet from './components/MeetAssist/ChangeMeet/ChangeMeet';
import MeetSchedule from './components/MeetAssist/MeetSchedule/MeetSchedule';
import HomePage from './components/HealthMate/HomePage';
import Services from './components/HealthMate/Services';
import EmergencyContacts from './components/HealthMate/EmergencyContacts';
import DoctorAppointments from './components/HealthMate/DoctorAppointments';
import OrderPrescription from './components/HealthMate/PrescriptionOrder';
import ReminderList from './components/HealthMate/ReminderList';
import AddReminder from './components/HealthMate/AddReminder';
import UpdateReminder from './components/HealthMate/UpdateReminder';
import HealthDataAdd from './components/HealthMate/HealthDataAdd';
import HealthDataView from './components/HealthMate/HealthDataView';
import UpdateHealthData from './components/HealthMate/UpdateHealthData';
import HealthDataDashboard from './components/HealthMate/HealthDataDashboard';

// import Nav from './components/AutoAssist/Nav.js';
// import Footer from './components/AutoAssist/Footer';
import Home from './components/AutoAssist/AAhome';
import VehiclePage from './components/pages/VehiclePage';
import ReminderPage from './components/pages/ReminderPage';
import ServiceStationPage from './components/pages/ServiceStationPage';
import useAppData from './components/hooks/useAppData.js';
import './App.css';
import './components/AutoAssist/App.css'
import ReminderForm from './components/AutoAssist/ReminderForm.js';

import Allcard from './financeGuard/layout/Content/Content';
import Stat from './financeGuard/components/StatisticsChart/StatisticsChart'
import GP from './financeGuard/components/GoalProgress/GoalProgress'
import IncomeCalendar from './financeGuard/components/IncomeCalendar/IncomeCalendar';
import Netincome from './financeGuard/components/netincome/netincome';
import Incomemainconteiner from './financeGuard/layout/incomemainconteiner/incomemainconteiner'

//import IncomeList from './pages/IncomeList'; 
//import EditIncome from './pages/EditIncome'; 
//import Home from './pages/Home'; 
//import GoalForm from './components/GoalForm';
//import GoalList from './components/GoalList';
//import IncomeSet from './components/Incomeset';

function App() {
  const appData = useAppData();

  return (

    <Router>
      {/* <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vehicle-form"
            element={<VehiclePage {...appData} />}
          />
          <Route
            path="/reminders"
            element={<ReminderPage {...appData} />}
          />
          <Route
            path="/service-stations"
            element={<ServiceStationPage {...appData} />}
          />
        </Routes>
        <Footer />
      </div> */}
      <div>
     
      
        <Routes>
          <Route path="/" element={< Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 

          <Route path="/autoAssist" element={<Home />} />
          <Route
            path="/vehicle-form"
            element={<VehiclePage {...appData} />}
          />
          <Route
            path="/reminders"
            element={<ReminderPage {...appData} />}
          />
          <Route
            path="/service-stations"
            element={<ServiceStationPage {...appData} />}
          />
          {/* <Route
            path="/reminder-form"
            element={<ReminderForm />} /> */}



          {/* Navigation to MeetAssist Page  */}
          <Route path="/meet-assist" element={<MeetHome />} />
          <Route path="/MH" element={<MeetHome />} />
          <Route path="/add-meeting" element={<AddNewMeeting/>}></Route>
          <Route path="/upcoming-meetings" element={<UpcomingMeet/>}></Route>
          <Route path="/meeting/:id" element={<ShowAMeet/>}></Route>
          <Route path="/edit-meeting/:id" element={<ChangeMeet/>}></Route>
          <Route path="/schedule" element={<MeetSchedule/>}></Route>
          
          
           {/* Navigation to HealthMate  Page  */}
           <Route path="/Health-home" element={<HomePage />} />
           <Route path="/services" element={<Services/>} />
          <Route path="/emergency-contacts" element={<EmergencyContacts/>} />
          <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
          <Route path="/prescription-order" element={<OrderPrescription/>} />
          <Route path="/remainderlist" element={<ReminderList/>} />
          <Route path="/add" element={<AddReminder/>} />
          <Route path="/update/:id" element={<UpdateReminder/>} />

          <Route path="/addhealthdata" element={<HealthDataAdd/>} />
          <Route path="/viewhealthdata" element={<HealthDataView/>} />
          <Route path="/updatehealthdata/:id" element={<UpdateHealthData/>} />
          <Route path="/dashboard" element={<HealthDataDashboard/>} />


           

        


          {/*Financeguard routes*/}
          <Route path="/incomemainconteiner" element={<Incomemainconteiner />} />
          <Route path="/allincome" element={<Allcard />} />
        <Route path="/stat" element={<Stat />} />
        <Route path="/gp" element={<GP />} /> 
        <Route path="/incomecalendar" element={<IncomeCalendar />} /> 
        <Route path="/netincome" element={<Netincome />} /> 



        </Routes>
      </div>
    </Router>



  );
}

export default App;

/*
<Header /> 
<Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/income-list" element={<IncomeList />} /> 
          <Route path="/edit-income/:id" element={<EditIncome />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/goals/new" element={<GoalForm />} />
          <Route path="/goals/edit/:id" element={<GoalForm />} />
          <Route path="/goals" element={<GoalList />} />
          <Route path="/incomeset" element={<IncomeSet />} />
          */