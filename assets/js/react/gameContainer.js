
import React, { Component } from 'react';
import Login from './login'
import Question from './question'

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render() {
    return(
      <div>
        <Login />
        <Question question={this.state.questions[0].question} />  
      </div>
      )
  }
}

export default GameContainer;
