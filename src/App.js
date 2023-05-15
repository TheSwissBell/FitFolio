import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CustomerList from './components/CustomerList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import Traininglist from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            FitFolio
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/CustomersList">Customers</Link>{' '}
        <Link to="/TrainingsList">Trainings</Link>{' '}
        <Link to="/Calendar">Calendar</Link>{' '}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/CustomersList" element={<CustomerList />} />
          <Route path="/TrainingsList" element={<Traininglist />} />
          <Route path="/Calendar" element={<TrainingCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
