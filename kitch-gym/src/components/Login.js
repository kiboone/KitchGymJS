import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '@material-ui/core';
import './Login.css';
import { 
  TextField,
  Select,
  Button,
  MenuItem,
  ButtonGroup,
  ArrowDropDownIcon,
  withStyles
} from '@material-ui/core';

const styles = {
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    width: 200,
  },
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      users: [],
      signIn: true,
      validLogin: false,
      errors: [false, false, false, false, false, 
        false, false, false, false, false, false, false], 
    };
    this.validateUserForm = this.validateUserForm.bind(this);

  }

  handleClick = () => {
    const { signIn } = this.state;
    if (signIn) {
      this.setState({ signIn: false });
    } else {
      this.setState({ signIn: true });
    }
  } 
  

  validateUserForm = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    const name = event.target.name.value;
    const weightCurr = event.target.weightCurr.value;
    const weightGoal = event.target.weightGoal.value;

    var err = [false, false, false, false, false, 
      false, false, false, false, false, false, false];

    var valid = true;
    //check passwords
    if(password1 !== password2){
      console.log("Err: passwords do not match");
      err[1] = true;
      err[2] = true;
      valid = false;
    }

    //check weights
    if (weightCurr < 0){
      err[5] = true;
      valid = false;
    }
    if (weightGoal < 0){
      err[7] = true;
      valid = false;
    }

    if(valid){
      console.log("adding user")
      this.addUser(name, username, password1, weightCurr, weightGoal);
      window.location.reload(true); 
    }
    
    this.setState ({ errors: err });
  }

  validateLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const{ users } = this.state;
    console.log(users)
    for (var i = 0; i < users.length;i++){
      if (username === users[i].username){
        if(password === users[i].password){
            // this.props.history.push('/client', {id: users[i].id});
            console.log(users[i].user_id);
            this.setState({validLogin: true, id: users[i].user_id});
        }
      }
    }
  }
  
  addUser = (name, username, password, weightCurr, weightGoal) => {
    fetch(`http://localhost:4000/add/user?name=${name}&username=${username}&password=${password}&weightCurr=${weightCurr}&weightGoal=${weightGoal}`)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  getUsers = () => {
    fetch('http://localhost:4000/get/users' )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ users: data })
      } )
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const {
      signIn,
      validLogin,
      errors,
      id
    } = this.state;
    const { classes } = this.props;

    if (validLogin){
      return <Redirect to={{
          pathname: `/user`,
          state: {id: id}
        }}/>
    }
    
    return (
      <div className="App">
        <div id="title">
          <header className="App-header">
          <h1>
            KitchGym
          </h1>
          </header>
          <p className="App-header2">
            Food. Fitness. Simplified.
          </p>
        </div>

        {signIn &&
          <div>
            <form 
              id="signIn" 
              className="container" 
              autoComplete="off"
              onSubmit={this.validateLogin}
            >
              <div>
                <TextField
                  required
                  margin="normal" 
                  id="username"
                  label="Username"
                />
              </div>
              <div>
                <TextField
                  required
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                />
              </div> 
              <div className="button">
                  <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"
                  >
                    Log In
                  </Button>
              </div>
            </form>
            <div className="button">
                <Button 
                  variant="contained"
                  onClick = {this.handleClick}
                >
                  Sign Up
                </Button>
            </div>
          </div>
        }

        
        {!signIn &&
          <div>
            <form 
              id="createUser"
              className="container"
              autoComplete="off"
              onSubmit={this.validateUserForm}
            >
              <div>
                <TextField 
                  required
                  id="username"
                  label="Username"
                  margin="normal"
                  error={errors[0]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password1"
                  label="Password"
                  type="password"
                  margin="normal"
                  error={errors[1]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password2"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  error={errors[2]}
                />
              </div>
              <div>
                <span>
                  <TextField
                    required 
                    id="name"
                    label="Name"
                    margin="normal"
                    error={errors[3]}
                    className={classes.textField}
                  />
                </span>
              </div>
              <div>
                <span>
                    <TextField
                      required 
                      id="weightCurr"
                      label="Current Weight"
                      type="number"
                      margin="normal"
                      error={errors[5]}
                      className={classes.textField}
                    />

              <TextField
                    required 
                    id="weightGoal"
                    label="Goal Weight"
                    type="number"
                    margin="normal"
                    error={errors[7]}
                    className={classes.textField}
                  /> 
              </span>
              </div>

              <div className="button">
                <Button 
                  variant="contained" 
                  color="primary"
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
            </form>
            <div>
              <Button
                  variant="contained"
                  onClick = {this.handleClick}
                >
                  Sign In
              </Button> 
            </div>
          </div>
        }

      </div>
    );
  }
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}


export default withStyles(styles)(Login);
