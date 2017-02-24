
import React, { Component } from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserNames = this.renderUserNames.bind(this);
    this.renderAccountBalance = this.renderAccountBalance.bind(this);
    this.renderIndex = this.renderIndex.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
  }

  renderUserNames(userName){
    if(userName === this.props.userName){
      return <td>You</td>
    } else {
      return <td>{ userName }</td>
    }
  }

  renderAccountBalance(accountBalance){
    return <td>{ accountBalance }</td>
  }

  renderAnswer(userName, index){
    if(userName === this.props.userName && this.props.userAnswer !== ""){
      return <td>{ this.props.userAnswer }</td>
    } else if(this.props.answers[index] === true) {
      return <td>Submitted answer</td>
    } else  {
      return <td>Waiting for answer</td>
    }
  }

  renderIndex(index){
    return <td>{index + 1 }</td>
  }

  render() {
    var that = this;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Bet</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.userNames.map(function(userName, index){
              return(
                <tr key={index} >
                  {that.renderIndex(index)}
                  {that.renderUserNames(userName)}
                  {that.renderAccountBalance(that.props.accountBalances[index])}
                  <td>Waiting for bet</td>
                  {that.renderAnswer(userName, index)}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default UserList;
