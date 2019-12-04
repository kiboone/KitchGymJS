import React, {Component} from 'react';
import NutritionFacts from 'nutrition-facts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import WorkoutViewer from './components/WorkoutViewer';
import WorkoutCreator from './components/WorkoutCreator';
import NutritionHome from './components/NutritionHome';
import User from './components/User';
import Profile from './components/Profile';


import '@material-ui/core';
import './App.css';

class App extends Component {
  
    render(){
      return (
        <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/workoutviewer' component={WorkoutViewer} />
              <Route exact path='/workoutcreator' component={WorkoutCreator} />
              <Route exact path='/user' component={User} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/nutritionhome' component={NutritionHome} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
