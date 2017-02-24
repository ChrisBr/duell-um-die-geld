
import React, { Component } from 'react';
import LoginForm from './loginForm'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.createUser = this.createUser.bind(this);
  }

  createUser(username){
    var that = this;
    io.socket.post('/user/addUser/', { name: username }, function(message) {
      console.log(message);
      // update logged in on parent gameController
      that.props.handleLogin(message);
    });
  }

  render() {
    return (
      <LoginForm handleLogin={this.createUser}/>
    );
  }
}

export default LoginContainer;
