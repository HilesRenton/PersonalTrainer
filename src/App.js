import React from 'react'
import './App.css';
import Customerlist from './components/Customerlist'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom' ;
import Traininglist from './components/Traininglist'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrainingCalendar from './components/TrainingCalendar';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>              
          <Typography variant="h3">
           Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
     
      <BrowserRouter>
      <div style ={{margin: 25}}>
      
        <Link to ="/" style= {{margin: 50, fontSize: 30}} >Trainings</Link>{' '}
        <Link to="/customers" style= {{margin: 50, fontSize: 30}}>Customers</Link>{' '}
        <Link to="/trainingcalendar" style= {{margin: 50, fontSize: 30}}>Calendar</Link>{' '}
        <Switch>
          

          <Route exact path = "/" component = {Traininglist}/>
          <Route path = "/customers" component = {Customerlist}/>
          <Route path = "/trainingcalendar" component = {TrainingCalendar}/>
          <Route render={() => <h1>Page not found</h1>}/>


        </Switch>
        </div>
      
      
      
      </BrowserRouter>

    </div>
  );
}

export default App;
