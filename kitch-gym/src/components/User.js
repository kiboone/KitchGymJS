import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';


const styles = {
    header: {
    },
    backBut: {
        position: 'absolute',
        left: '5px',
        top: '5px',
    },
    button: {
        margin: '15px',
    }

}

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewWork: false,
            viewProfile: false,
            viewNutrition: false,
            createWork: false,
            user: [],
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack = () => {
        console.log(this.props.history);
        this.props.history.push('/');
    }

    goToViewWorkouts = () => {
        this.setState({ viewWork: true });
    }

    goToCreateWorkout = () => {
        this.setState({ createWork: true });
    }

    goToProfile = () => {
        this.setState({ viewProfile: true });
    }

    goToNutritionHome = () => {
        this.setState({ viewNutrition: true });
    }

    getUser = () =>{
        const {id } = this.props.location.state;
        fetch(`http://localhost:4000/get/user?u_id=${id}`)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({ user: data })
          } )
        .catch(err => console.error(err));
    }

    componentDidMount(){
        this.getUser();
    }

    render() {
    const { classes } = this.props;
    const {
        viewWork, 
        viewProfile,
        viewNutrition,
        createWork,
        user
    } = this.state;
    const {id} =this.props.location.state;

    var name;
    if (user.length > 0) name = user[0].name;

    if (viewWork){
        return <Redirect to={{
                            pathname: '/workoutviewer',
                            state: {id: id}
                }}/>
    }
    if (viewProfile){
        return <Redirect to={{
                            pathname: '/profile',
                            state: {id: id}
                }}/>
    }
    if (viewNutrition){
        return <Redirect to={{
                            pathname: '/nutritionhome',
                            state: {id: id}
                }}/>
    }
    if (createWork){
        return <Redirect to={{
                            pathname: '/workoutcreator',
                            state: {id: id}
        }}/>
        //this.props.history.push('/workoutcreator');
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Welcome {name}!                    
                </h1>
            </header>
            <Button className={classes.backBut}
                variant="contained"
                color="primary"
                size="small"
                onClick={this.goBack}
            >
                Back
            </Button>
            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToCreateWorkout}
                >
                    Create Workout
                </Button>
            </div>
            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToViewWorkouts}
                >
                    Saved Workouts
                </Button>
            </div>
            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToProfile}
                >
                    Fitness Profile
                </Button>
            </div>
            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToNutritionHome}
                >
                    Input Macros
                </Button>
            </div>
        </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(User);