
import React, { Component } from 'react';
import LoginForm from './loginForm'
import Greeting from './greeting'
import UserList from './userList'

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNames: [],
      accountBalances: [],
      answers: [],
    }
    this.getUserNames = this.getUserNames.bind(this);
  }

  getUserNames(){
    var that = this;
    io.socket.get('/user', function (message) {
      var userNames = [];
      var accountBalances = [];
      var answers = [];
      message.map(function(obj){
        userNames.push(obj.name);
        accountBalances.push(obj.account);
        answers.push(obj.answer !== "");
        return;
      });
      that.setState({ userNames: userNames, accountBalances: accountBalances, answers: answers });
    });
  }

  componentWillMount() {
    this.getUserNames();
    var that = this;
    io.socket.on('user', function whenMessageRecevied(message) {
      console.log("User subscription: " + message.verb);
      // for now we refetch all user
      that.getUserNames();
    });
  }

  render() {
    return(
      <div>
        <div>
          <Greeting name={this.props.userName}/>
        </div>
        <div>
          <UserList answers={this.state.answers} userName={this.props.userName} userAnswer={this.props.userAnswer} userNames={this.state.userNames} accountBalances={this.state.accountBalances} />
        </div>
      </div>
    )
  }
}

export default UserContainer;
