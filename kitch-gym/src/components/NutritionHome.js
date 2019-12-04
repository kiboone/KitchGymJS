import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import NutritionFacts from 'nutrition-facts'


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

class NutritionHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            back: false,
            user: [],
        }
        this.goBack = this.goBack.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    doSearch = (food) => {        
      const NF = new NutritionFacts('Eb2HcdD6nBcHXjVGcODLwGnpjBz6ufLkAzjwM7tp');
        NF.searchFoods({
            q: food,
            ds: 'Standard Reference'
        }).then(results => {
            // Returns search results
            let mySelectedItem = results.list.item[0]
            // Items are returned as a FoodItem instance
            // allowing you to call 'getNutrition' directly on the instance.
            mySelectedItem.getNutrition()
            .then(nutritionReport => {
                console.log(nutritionReport.nutrients[2].value)})
            .catch(err => {
                console.log(err)})
        }).catch(err => { console.log(err)})
    }

    handleSearch = (event) => {
        event.preventDefault()
        const search = event.target.search.value
        this.doSearch(search);
    }

    goBack = () => {
        this.setState({ back: true})
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
        back,
        user
    } = this.state;
    const {id} =this.props.location.state;

    var name, current_weight, goal_weight, message;
    if (user.length > 0) name = user[0].name;
    if(back){
        return <Redirect to={{
            pathname: '/user',
            state: {id: id}
        }}/>
    }
    if (user.length > 0) current_weight = user[0].curr_weight;
    if (user.length > 0) goal_weight = user[0].goal_weight;

    if (current_weight < goal_weight) message = "Bulking Season"
    else message = "Cutting Season"

    return (
        <div className="App">
            <h1 className="App-header">
                    Current Weight: {current_weight}                                    
            </h1>
            <h2 className="App-header">
                    Goal Weight: {goal_weight}                    
            </h2>
            <p>{message}</p>
            <form onSubmit = {this.handleSearch}>
                <span>
                <TextField
                    margin="normal"
                    id="search"
                    label="Enter Food">
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type='submit'
                >
                Search
            </Button>
            </span>
            </form>
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

export default withStyles(styles)(NutritionHome);