import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { 
    Button,
    FormGroup,
    FormControl,
    FormControlLabel,
    Checkbox,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

const styles = {
    backBut: {
        position: 'absolute',
        left: '10px',
        top: '10px',
    },
    panel: {
        margin: 'auto',
        width: '65%',
        position: 'relative',
        top: '150px',
        
    },
    nameInput: {
        position: 'relative',
        top: '-30px',
    },
    nameHeader: {
        position: 'relative',
        top: '0px',
        fontSize: '18px',
        color: 'navy',
    },
    genButton: {
        position: 'relative',
        top: '50px',
    },
    list: {
        display: 'flex',
        alignItems: 'left',
    }
}

class WorkoutCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: null,
            targetMuscles: [false, false, false, false],
            isGenerated: false,
            difficulty: 'easy',
            exerType: 'free-weight',
            back: false,
            workout_id: [],
        };

        this.goBack = this.goBack.bind(this);
        this.handleGenerateWorkout = this.handleGenerateWorkout.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    goBack = () => {
        this.setState({back: true});
    }

    handleGenerateWorkout = (event) => {
        event.preventDefault();
        console.log("generating workout")
        const {targetMuscles} = this.state;
        const name = event.target.workoutName.value;
        event.preventDefault();

        var count = 0;
        for (var i = 0; i < targetMuscles.length;i++){
            if(targetMuscles[i] === true){
                count++;
            }
        }

        // calulate how many of each exercise to pull from database
        const numEach = 12/count;
        const{workout_id} = this.state;
        console.log(workout_id);
        const w_id = workout_id[0].last_id;
        console.log(w_id)
        this.createWorkout(name);
        console.log(targetMuscles)

        if(targetMuscles[0] === true){
            //arms
            this.fillWorkout(0, numEach, w_id);
        }
        if(targetMuscles[1] === true){
            //legs
            this.fillWorkout(1, numEach, w_id);
        }
        if(targetMuscles[2] === true){
            //abs
            this.fillWorkout(2, numEach, w_id);
        }
        if(targetMuscles[3] === true){
            //back
            this.fillWorkout(3, numEach, w_id);
        }

        window.location.reload(true); 
    }

    createWorkout = (name) =>{
        const {id} = this.props.location.state;
        fetch(`http://localhost:4000/add/workout?name=${name}&u_id=${id}` )
        .then(response => response.json())
        .catch(err => console.error(err));
    }

    getWorkoutID = () =>{
        fetch(`http://localhost:4000/get/workout`)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({ workout_id: data })
          } )
        .catch(err => console.error(err));
    }

    fillWorkout = (muscle, total, w_id) => {
        fetch(`http://localhost:4000/workouts/fill?muscle=${muscle}&total=${total}&w_id=${w_id}` )
        .then(response => response.json())
        .catch(err => console.error(err));
    }
    
    handleClose = () => {
        this.setState({isGenerated: false});
    }

    handleCheck = (event) => {
        const {targetMuscles} = this.state;
        var tM = targetMuscles;
        console.log("checked");
        if (event.target.value === "arms"){
            tM[0] = event.target.checked;
        } else if (event.target.value === "legs"){
            tM[1] = event.target.checked;
        } else if (event.target.value === "abs"){
            tM[2] = event.target.checked;
        } else if (event.target.value === "back"){
            tM[3] = event.target.checked;
        }
        this.setState({targetMuscles: tM});
    }
    

    componentDidMount = () => {
        this.getWorkoutID();      
      }

  render() {
    const { classes } = this.props;
    const { id } = this.props.location.state;
    const {
        isGenerated,
        back,
    } = this.state;

    if(back){
        return <Redirect to={{
          pathname: '/user',
          state: { id: id}
        }}/>
      }
    
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>
                    Create Workout                    
                    </h1>
                </div>
                
            </header>
           <form
                onSubmit={this.handleGenerateWorkout}
           >
            <FormControl>
                <div className={classes.nameHeader}>
                    <h2>
                        Name this Workout
                    </h2>
                </div>
                <TextField
                    className={classes.nameInput}
                    required
                    label="Workout Name"
                    id="workoutName"
                    margin="normal"
                />    
                <div className={classes.nameHeader}>
                    <h2>
                        Choose target muscle groups
                    </h2>
                </div>
                <FormGroup 
                    id="muscleGroups"
                    aria-label="position" 
                    column
                >
                    <div>
                        <FormControlLabel
                            value="arms"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Arms"
                            labelPlacement="end"
                           
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="legs"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Legs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="abs"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Abs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="back"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Back"
                            labelPlacement="end"
                        />
                    </div>
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.genButton}
                >
                    Generate Workout
                </Button>
            </FormControl>
            </form>

            <Dialog
                open={isGenerated}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Workout Generated
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can view your newly generated workout in the Workout Viewer.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>

            <Button className={classes.backBut}
                variant="contained"
                color="primary"
                size="small"
                onClick={this.goBack}
            >
                Back
            </Button>
        </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutCreator);