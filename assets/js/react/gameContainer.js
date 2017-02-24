
import React, { Component } from 'react';
import UserContainer from './userContainer'
import Question from './question'
import LoginContainer from './loginContainer';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userName: "",
      userId: "",
      questionId: -1,
      betRound: -1,
      questions: [
        {
          question: "Wieviele Mentos sind in einer Packung?",
          hints: [
            "Damit bleibt Kevin Großkreuz eine ganze Halbzeit mit cool!",
            "Second Hint!",
            "Third Hint!",
            "Fourth Hint!",
            "Fifth Hint!",
            ],
            answer: "15"
        }
      ],
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(message){
    this.setState({loggedIn: true, userName: message.name, userId: message.id});
  }

  componentWillMount() {
    var that = this;
    io.socket.get('/game', function (message) {
      // there is only one game generated when starting the application
      var game = message[0];
      that.setState({ betRound: game.betRound, questionId: game.questionId });
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
          <UserContainer loggedIn={this.state.loggedIn} userName={this.state.userName} />
          <Question question={this.state.questions[0].question} />
        </div>
        )
    }
  }
}

export default GameContainer;
