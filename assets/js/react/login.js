
import React, { Component } from 'react';
import LoginForm from './loginForm'
import Greeting from './greeting'
import UserList from './userList'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      userNames: [],
      accountBalances: [],
      loggedIn: false,
    }
    this.createUser = this.createUser.bind(this);
    this.getUserNames = this.getUserNames.bind(this);
  }

  createUser(username){
    var that = this;
    io.socket.post('/user/addUser/', { name: username }, function(message) {
      console.log(message);
      that.setState({ id: message.id, name: message.name, loggedIn: true });
    });

    // fetch('http://localhost:1337/user?name=' + username, {
    //   method: 'POST'
    // })
    // .then((response) => response.json())
    // .then((responseJson) => { this.setState({ id: responseJson.id, name: responseJson.name, loggedIn: true }) })
    // .catch((error) => { console.error(error); });
  }

  getUserNames(){
    var that = this;
    io.socket.get('/user', function (message) {
      var userNames = [];
      var accountBalances = [];
      message.map(function(obj){
        userNames.push(obj.name);
        accountBalances.push(obj.account);
        return;
      });
      that.setState({ userNames: userNames, accountBalances: accountBalances });
    });
  }

  componentWillMount() {
    this.getUserNames();
    var that = this;
    io.socket.on('user', function whenMessageRecevied(message) {
      console.log("User subscription: " + message);
      if(message.verb === "created" || message.verb === "destroyed"){
        // for now we refetch all user
        that.getUserNames();
      }
    });
  }

  render() {
    if(this.state.loggedIn === true){
      return(
        <div>
          <div>
            <Greeting name={this.state.name}/>
          </div>
          <div>
            <UserList userNames={this.state.userNames} accountBalances={this.state.accountBalances} />
          </div>
        </div>
        )
    } else {
      return(
        <LoginForm handleLogin={this.createUser}/>
      )
    }
  }
}

export default Login;
