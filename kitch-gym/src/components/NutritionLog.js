import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { classes } from 'istanbul-lib-coverage';

import { 
    Button, 
    TextField,
    List,
    Grid,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    Select,
    MenuItem
 } from '@material-ui/core';



const styles = {
    header: {
    },
    backBut: {
        position: 'absolute',
        left: '10px',
        top: '10px',
    },
    panel: {
        margin: 'auto',
        width: '50%',
    },
}

class NutritionLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            back: false,
            done: false,
            user: [],
            calorielog: [],
            date: [],
            calories: [],
        }
        this.goBack = this.goBack.bind(this);
        this.getCalorieLog = this.getCalorieLog.bind(this);
    }


    goBack = () => {
        this.setState({ back: true})
    }


    renderCalories = (u_id) =>{
        const {calories} = this.state;
        var temp = [];
        for (var i = 0; i < calories.length;i++){
          if (calories[i].u_id === u_id){
            temp.push(calories[i].calories);
          }
        }
        return(
        <ul>
          {temp.map(dates => (
            <li className={classes.list}>{calories}</li>
          ))}
        </ul>)
      }

    getUser = () =>{
        const {id} = this.props.location.state;
        fetch(`http://localhost:4000/get/user?u_id=${id}`)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({ user: data })
          } )
        .catch(err => console.error(err));
    }

    getCalorieLog = () =>{
        const {id} = this.props.location.state;
        fetch(`http://localhost:4000/get/calorielog?u_id=${id}`)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({ calorielog: data })
          } )
        .catch(err => console.error(err));
    }

    componentDidMount(){
        this.getUser();
        this.getCalorieLog();
    }

    render() {
    const { classes } = this.props;
    const {
        back,
        done, 
        user,
        calorielog,
    } = this.state;
    const {id} =this.props.location.state;
    
    if(back){
        return <Redirect to={{
            pathname: '/user',
            state: {id: id}
        }}/>
    }
    
    var daily_cals;
    if (user.length > 0) {
        daily_cals = user[0].daily_cals;
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Daily Calorie Count               
                </h1>
            </header>
            <h2>
                Total Calories for Today: {daily_cals}
            </h2>



            <div className={classes.panel}>
                {calorielog.map(calslog => (
                <div >
                     <Grid>
                        <ExpansionPanel id="result">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            {calslog.date}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography color="textSecondary" className={classes.list}>
                            {calslog.user_calories + " Calories"}
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </div>
                ))}
            </div>
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

export default withStyles(styles)(NutritionLog);