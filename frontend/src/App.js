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


// import Nav from './components/AutoAssist/Nav.js';
// import Footer from './components/AutoAssist/Footer';
import Home from './components/AutoAssist/AAhome';
import VehiclePage from './components/pages/VehiclePage';
import ReminderPage from './components/pages/ReminderPage';
import ServiceStationPage from './components/pages/ServiceStationPage';
import useAppData from './components/hooks/useAppData.js';
import './App.css';
import './components/AutoAssist/App.css'



//event planner
import EHome from './components/eventPlanner/EventPlannerHome/EventPlannerHome';
import EventsHome from './components/eventPlanner/Event/EventHome';
import AddEvent from './components/eventPlanner/Event/AddEvent';
import ShowDeleteEvent from './components/eventPlanner/Event/ShowDeleteEvent';
import EditEvent from './components/eventPlanner/Event/EditEvent';
import CreateItinerary from './components/eventPlanner/Itinerary/CreateItinerary';
import CreatedItineraryMange from './components/eventPlanner/Itinerary/CreatedItineraryMange';
import Activity from './components/eventPlanner/Itinerary/Activity';
import Expenses from './components/eventPlanner/TrackExpenses/Expenses';
import ManageExpenses from './components/eventPlanner/TrackExpenses/ManageExpenses';
import ViewExpenses from './components/eventPlanner/TrackExpenses/ViewExpenses';
import AddGuest from './components/eventPlanner/GuestList/AddGuest';
import GuestList from './components/eventPlanner/GuestList/GuestList';
import UpdateGuest from './components/eventPlanner/GuestList/UpdateGuest';
import Invitation from './components/eventPlanner/GuestList/Invitation';


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
          
          




           

        


          {/*Financeguard routes*/}
          <Route path="/incomemainconteiner" element={<Incomemainconteiner />} />
          <Route path="/allincome" element={<Allcard />} />
        <Route path="/stat" element={<Stat />} />
        <Route path="/gp" element={<GP />} /> 
        <Route path="/incomecalendar" element={<IncomeCalendar />} /> 
        <Route path="/netincome" element={<Netincome />} /> 



       
      
 

        {/* event planner*/}
        <Route path="/mainhome" element={<EHome />} />
        <Route path="/eventhome" element={<EventsHome />} /> 
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events/:id" element={<ShowDeleteEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
        <Route path="/createitinerary" element={<CreateItinerary />} />
        <Route path="/CreatedItineraryMange" element={<CreatedItineraryMange />} />
        <Route path="/planmore" element={<Activity />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/gotrackexpense" element={<ManageExpenses />} />
        <Route path="/viewexpenses" element={<ViewExpenses />} />
        <Route path="/addguest" element={<AddGuest />} />
        <Route path="/viewguest" element={<GuestList />} />
        <Route path="/editguest/:id" element={<UpdateGuest />} />
        <Route path="/sendinvitation/:id" element={<Invitation />} />

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