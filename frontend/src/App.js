import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import IncomeList from './pages/IncomeList'; 
import EditIncome from './pages/EditIncome'; 
import Home from './pages/Home'; 
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import IncomeSet from './components/Incomeset';

function App() {
  return (
    <Router>
      <div>
      <Header /> 
        <Routes>
          <Route path="/" element={< Register/>} />
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
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
