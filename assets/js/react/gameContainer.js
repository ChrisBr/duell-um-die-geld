
import React, { Component } from 'react';
import UserContainer from './userContainer'
import Question from './question'
import LoginContainer from './loginContainer';
import Answer from './answer';

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
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  }

  handleLogin(message){
    this.setState({loggedIn: true, userName: message.name, userId: message.id});
  }

  handleSubmitAnswer(answer){
    var that = this;
    io.socket.put('/user/' +  this.state.userId, { answer: answer }, function (message) {
      that.setState({ userAnswer: message.answer });
    });
  }

  fetchQuestions(){
    var that = this;
    io.socket.get("/question/" + this.state.questionId, function (message) {
      that.setState({ question: message.title, answer: message.answer });
    });
  }

  componentWillMount() {
    var that = this;
    io.socket.get('/game', function (message) {
      // there is only one game generated when starting the application
      var game = message[0];
      that.setState({ betRound: game.betRound, questionId: game.questionId }, that.fetchQuestions);
    });
  }

  render() {
    if(this.state.loggedIn === false){
      return(
        <LoginContainer loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
      )
    }else{
      return(
        <div>
          <UserContainer loggedIn={this.state.loggedIn} userName={this.state.userName} userAnswer={this.state.userAnswer} />
          <Question question={this.state.question}/>
          <Answer updateAnswer={this.handleSubmitAnswer} answer={this.state.userAnswer}/>
        </div>
        )
    }
  }
}

export default GameContainer;
