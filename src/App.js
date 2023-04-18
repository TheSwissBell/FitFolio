import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import Traininglist from './components/TrainingList';

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
      <CustomerList></CustomerList>
      <Traininglist></Traininglist>
    </div>
  );
}

export default App;
