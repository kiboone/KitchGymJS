import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { 
    Button,
    Grid,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { classes } from 'istanbul-lib-coverage';
const styles = {
    backBut: {
        position: 'absolute',
        left: '10px',
        top: '10px',
    },
    panel: {
        margin: 'auto',
        width: '65%',
    },
    workName: {
      position: 'relative',
      right: '-525px',
    },
    list: {
      display: 'flex',
      textAlign: 'left'
    }
}
class WorkoutViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
          workouts: [],
          exercises: [],
          trainer: [],
          count: 0,
          back: false,
          na: false,
        }
        this.goBack = this.goBack.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
    }

    goBack = () => {
      this.setState({back: true});
    }

    getUserWorkouts = () =>{
      const { id } = this.props.location.state;
      fetch(`http://localhost:4000/workouts?u_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ workouts: data })
      } )
      .catch(err => console.error(err));
    }

    getUserWorkoutCount = () =>{
      const { id } = this.props.location.state;
      fetch(`http://localhost:4000/workouts/count?u_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ count: data[0].count })
      } )
      .catch(err => console.error(err));
    }


    getAllUserExercises = () =>{
      const { id } = this.props.location.state;
      fetch(`http://localhost:4000/workouts/get/allexercises?u_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({exercises: data});
      } )
      .catch(err => console.error(err));
    }

    renderExercises = (w_id) =>{
      const {exercises} = this.state;
      var temp = [];
      for (var i = 0; i < exercises.length;i++){
        if (exercises[i].workout_id === w_id){
          temp.push(exercises[i].name);
        }
      }
      return(
      <ul>
        {temp.map(exercise => (
          <li className={classes.list}>{exercise}</li>
        ))}
      </ul>)
    }
    
    deleteWorkout = (w_id) => {
      const {na} = this.state;
      fetch(`http://localhost:4000/workouts/delete?w_id=${w_id}` )
      .then(response => response.json())
      .catch(err => console.error(err));
      window.location.reload(true); 
    }

    componentDidMount = () => {
      this.getAllUserExercises();
      this.getUserWorkoutCount();
      this.getUserWorkouts();
    }


  render() {
    const { classes } = this.props;
    const { id } = this.props.location.state;
    const { 
      workouts, 
      exercises,
      back,
      count,
    } = this.state;

    if(back){
      return <Redirect to={{
        pathname: `/user`,
        state: {id: id}
      }}/>
    }

      return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Workout Viewer                 
                </h1>
                
            </header>
            <div>
                  <h2 className="App-header">
                    Total Workouts: {count}
                  </h2>
                </div>
            <Button className={classes.backBut}
                variant="contained"
                color="primary"
                size="small"
                onClick={this.goBack}
            >
                Back
            </Button>

            <div className={classes.panel}>
              {workouts.map(workout => (
                <div>
                <Grid>
                  <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    {workout.name}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography color="textSecondary" className={classes.list}>
                      {this.renderExercises(workout.workout_id)}
                    </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
            
                  <Button 
                    button 
                    id="delete"
                    color="secondary"
                    onClick={() => this.deleteWorkout(workout.workout_id)}
                  >Delete</Button>
                </Grid>
                
                </div>
              ))}
            </div>
        </div>

    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutViewer);