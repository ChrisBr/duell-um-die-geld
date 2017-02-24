import React, { Component } from 'react';

class BetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.check = this.check.bind(this);
    this.getBet = this.getBet.bind(this);
    this.allAnswered = this.allAnswered.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value });
  }

  handleSubmit(event) {
    this.props.updateBet(this.state.value);
    event.preventDefault();
  }

  check(event){
    this.props.updateBet(0);
  }

  getBet(){
    // First round, no bets yet
    // TODO: doesnt work!
    if(this.props.game.betRound === 0){
      return "";
    }
    var bet = "Check";
    if(this.props.user.bet !== 0){
      bet = this.props.bet
    }
    return(
      <p className="lead">
      Your Bet: { bet }
      </p>
    )
  }

  allAnswered(){
    if(this.props.users != null){
      var result = true;
      this.props.users.forEach(function(user){
        if(user.answer === ""){
          result = false;
          return false;
        }
      });
      return result;
    }
    return false;
  }

  render() {
    if(this.props.user.answer === ""){
      return(null);
    } else if(!this.allAnswered()){
      return(<p>Waiting for other player to submit their answer ...</p>);
    } else {
      return (
        <div className="row" id="betFormRow">
          <div className="col-md-4 col-md-offset-4" id="betFormColumn">
            { this.getBet() }
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="bet">Set your bet:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" id="bet" placeholder="Set your bet ..." />
                <button type="submit" className="btn btn-success">Bet now!</button>
                <button type="button" className="btn btn-success"onClick={this.check}>Check!</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default BetForm;
