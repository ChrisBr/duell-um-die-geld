
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
      users: [],
      loggedIn: false,
    }
    this.createUser = this.createUser.bind(this);
    this.getUserNames = this.getUserNames.bind(this);
  }

  createUser(username){
    var that = this;
    io.socket.post('/user/addUser/', { name: username }, function(message) {
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
      message.map(function(obj){
        console.log("map: " + obj.name)
        userNames.push(obj.name);
        return;
      });
      that.setState({ users: userNames });
    });
  }

  componentWillMount() {
    this.getUserNames();
    var that = this;
    io.socket.on('user', function whenMessageRecevied(message) {
      console.log("User subscription: " + message);
      if(message.verb === "created"){
        var users = that.state.users;
        users.push(message.data.name);
        that.setState({ users: users });
      } else if(message.verb === "destroyed"){
        // for now we fetch all users again if somebody unsubscribes ...
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
            <UserList users={this.state.users} />
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
