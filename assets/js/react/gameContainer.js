
import React, { Component } from 'react';
import UserContainer from './userContainer'
import Question from './question'
import LoginContainer from './loginContainer';
import Answer from './answer';
import Hint from './hint';
import BetForm from './betForm';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userName: "",
      userId: "",
      questionId: -1,
      betRound: -1,
      question: "",
      answer: "",
      userAnswer: "",
      userNames: [],
      hints: [
          "First Hint!",
          "Second Hint!",
          "Third Hint!",
          "Fourth Hint!",
          "Fifth Hint!",
      ],
      bet: 0,
      foo: [],
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.handleBetUpdate = this.handleBetUpdate.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  setUsers(users){
    this.setState({ users: users });
  }

  handleLogin(message){
    this.setState({ loggedIn: true, user: message });
  }

  handleSubmitAnswer(answer){
    var that = this;
    io.socket.put('/user/' +  this.state.user.id, { answer: answer }, function (message) {
      that.setState({ user: message }, function(){
        that.updateUser();
      });
    });
  }

  fetchQuestions(){
    var that = this;
    io.socket.get("/question/" + this.state.game.questionId, function (message) {
      that.setState({ question: message });
    });
  }

  componentWillMount() {
    var that = this;
    io.socket.get('/game', function (message) {
      // there is only one game generated when starting the application
      that.setState({ game: message[0] }, that.fetchQuestions);
    });

    io.socket.on('game', function whenMessageRecevied(message) {
      console.log("Game subscription: " + message.verb);
      if(message.verb === "updated"){
        that.setState({ game: message.data });
      }
    });
  }

  handleBetUpdate(bet){
    var that = this;
    io.socket.put('/user/' +  this.state.user.id, { betRound: this.state.game.betRound, bet: bet }, function (message) {
      that.setState({ user: message }, function(){
        that.updateUser();
      });
    });
  }

  updateUser(){
    // TODO: this is ugly and buggy, maybe just fetch all users again.
    var theIndex = null;
    var that = this;
    this.state.users.map(function(user, index){
      if(user.id === that.state.user.id){
        theIndex = index
      }
    });
    // TODO: check for immutabilty ...
    this.state.users[theIndex] = this.state.user;
  }

  render() {
    if(this.state.loggedIn === false){
      return(
        <LoginContainer loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
      )
    }else{
      return(
        <div>
          <UserContainer setUsers={this.setUsers} loggedIn={this.state.loggedIn} user={this.state.user} game={this.state.game} />
          <Question question={this.state.question}/>
          <Answer updateAnswer={this.handleSubmitAnswer} user={this.state.user} users={this.state.users}/>
          <BetForm updateBet={this.handleBetUpdate} game={this.state.game} user={this.state.user} users={this.state.users} />
        </div>
        )
    }
  }
}

export default GameContainer;

// <Hint hints={this.state.hints} betRound={this.state.betRound} />
