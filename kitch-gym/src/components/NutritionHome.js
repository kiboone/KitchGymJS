import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import NutritionFacts from 'nutrition-facts'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    button: {
        margin: '15px',
    },
    list: {
        textAlign: 'left',
    },
    searchButton: {
        position: 'relative',
        top: '25px',
        right: '-20px'
    },
    panel: {
        margin: 'auto',
        width: '50%',
    },
    searchNum: {
        position: 'relative',
        top: '32px',
        left: '40px'
      }

}

class NutritionHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            back: false,
            done: false,
            results: [],
            searchName: "",
            searchProtein: 0,
            searchCarbs: 0,
            searchFats: 0, 
            user: [],
            num: 10,
        }
        this.goBack = this.goBack.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.addMacros = this.addMacros.bind(this);
    }


    handleSearch = (event) => {
        event.preventDefault()
        const {num} = this.state;
        console.log(num);
        const search = event.target.search.value
        var div = document.getElementById("list")
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        if (search !== "") this.doSearch(search, num);
    }

    doSearch = (food, num) => {        
      const NF = new NutritionFacts('Eb2HcdD6nBcHXjVGcODLwGnpjBz6ufLkAzjwM7tp');
        NF.searchFoods({
            q: food,
            ds: 'Standard Reference',
            max: num
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
        var element = document.createElement('button');
        var br = document.createElement('br');
        element.onclick= this.handleButton
        element.id = nutritionReport.ndbno;
        element.innerHTML = name;
        div.appendChild(element);
        div.appendChild(br);

    }

    handleDropdown = (event) => {
        this.setState({num : event.target.value})
      };

    handleButton = (event) => {
        const foodID = event.target.id;
        const foodName = event.target.innerHTML;
        var div = document.getElementById("list")
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        const NF = new NutritionFacts('Eb2HcdD6nBcHXjVGcODLwGnpjBz6ufLkAzjwM7tp');
        // Nutrition Food search feature
        NF.searchFoods({
            q: foodName,
            ds: 'Standard Reference',
        }).then(results => {
            console.log(results.list.item)
            this.setState({results: results.list.item});
            // Returns search results
                let mySelectedItem = results.list.item[0];
                mySelectedItem.getNutrition()
                .then(nutritionReport => {
                    // console.log(nutritionReport)
                    this.setState({searchResult: nutritionReport, done: true})
                })    
                .catch(err => {
                    console.log(err)})
        }).catch(err => { console.log(err)})
    }

    

    addMacros = (searchResult) => {
        var proteins = parseFloat(searchResult.nutrients[2].value)
        var carbs = parseFloat(searchResult.nutrients[4].value)
        var fats = parseFloat(searchResult.nutrients[27].value) + parseFloat(searchResult.nutrients[28].value)
        
        // Calorie Calculation:
        //      1g protein = 4 cals
        //      1g carbs = 4 cals
        //      1g fats = 9 cals
        const {user} = this.state;
        var total_cals = user[0].daily_cals;
        total_cals += (proteins * 4) + (carbs * 4) + (fats * 9)

        this.updateCalories(total_cals);
        window.location.reload(true)
    }


    goBack = () => {
        this.setState({ back: true})
    }

    updateCalories = (calories) => {
        const {id} = this.props.location.state;
        fetch(`http://localhost:4000/update/calories?cals=${calories}&u_id=${id}`)
        .then(response => response.json())
        .catch(err => console.error(err));
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
        searchResult,
        done,
        num
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
                   Input Your Macros                 
                </h1>
            </header>
            <h2>
                Total Calories for Today: {daily_cals}
            </h2>
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
                        className={classes.searchButton}
                    >
                        Search
                    </Button>
                
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={num}
                            onChange={this.handleDropdown}
                            className={classes.searchNum}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                </form>
            </div>            

            <h2>
                Search Results:
            </h2>
            <List id="list"></List>
            <div className={classes.panel}>
                <Grid>
                    {done && (
                        <div >
                            <ExpansionPanel id="result">
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                            >
                                {searchResult.name}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography color="textSecondary" className={classes.list}>
                                    <ul>
                                        <li>Proteins: {searchResult.nutrients[2].value} grams</li>
                                        <li>Carbs: {searchResult.nutrients[4].value} grams</li>
                                        <li>Fats: {parseFloat(searchResult.nutrients[27].value) + parseFloat(searchResult.nutrients[28].value)} grams</li>
                                    </ul>
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <Button 
                                button 
                                id="delete"
                                color="secondary"
                                onClick={() => this.addMacros(searchResult)}
                            >
                                Add Macros
                            </Button>
                        </div>
                    )}
                </Grid>
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

export default withStyles(styles)(NutritionHome);