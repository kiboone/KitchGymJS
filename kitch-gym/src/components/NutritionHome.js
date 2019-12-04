import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { 
    Button, 
    TextField,
    List,
    ListItem,
    Divider
 } from '@material-ui/core';
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
            results: [],
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
            console.log(results.list.item)
            this.setState({results: results.list.item});
            // Returns search results
                for(var i = 0; i < results.list.item.length; i++){
                let mySelectedItem = results.list.item[i];
                // console.log("printing")
                // Items are returned as a FoodItem instance
                // allowing you to call 'getNutrition' directly on the instance.
                mySelectedItem.getNutrition()
                .then(nutritionReport => {
                    // console.log(nutritionReport)
                    this.showNutrition(nutritionReport)
                })    
                .catch(err => {
                    console.log(err)})
                }
        }).catch(err => { console.log(err)})
    }

    showNutrition = (nutritionReport) => {
        // console.log(nutritionReport);
        var name = nutritionReport.name;
        var div = document.getElementById("list")
        var element = document.createElement('ListItem');
        element.innerHTML = name;
        div.appendChild(element);
    }

    handleSearch = (event) => {
        event.preventDefault()
        const search = event.target.search.value
        this.doSearch(search);
    }

    goBack = () => {
        this.setState({ back: true})
    }

    getNutrition = (mySelectedItem) => {
        mySelectedItem.getNutrition()
        .then(nutritionReport => {
            return (<p>{nutritionReport.name}</p>)
        })
        .catch(err => {
            console.log(err)})
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
        user,
        results
    } = this.state;
    const {id} =this.props.location.state;

    var name, current_weight, goal_weight, message;
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
            <header className="App-header">
                <h1>
                   Nutrition Home                 
                </h1>
            </header>
            <div>
                <form onSubmit = {this.handleSearch}>
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
                </form>
            </div>
            <List id="list">

            </List>
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