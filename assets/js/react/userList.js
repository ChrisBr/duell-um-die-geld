
import React, { Component } from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserNames = this.renderUserNames.bind(this);
    this.renderAccountBalance = this.renderAccountBalance.bind(this);
    this.renderIndex = this.renderIndex.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderBet = this.renderBet.bind(this);
  }

  renderUserNames(user){
    if(user.id === this.props.user.id){
      return <td>You</td>
    } else {
      return <td>{ user.name }</td>
    }
  }

  renderAccountBalance(user){
    return <td>{ user.account }</td>
  }

  renderAnswer(user){
    if(user.id === this.props.user.id && this.props.user.answer !== ""){
      return <td>{ user.answer }</td>
    } else if(user.answer !== "") {
      return <td>Submitted answer</td>
    } else  {
      return <td>Waiting for answer</td>
    }
  }

  renderIndex(index){
    return <td>{index + 1 }</td>
  }

  renderBet(user){
    return <td>{user.bet}</td>
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
            this.props.users.map(function(user, index){
              return(
                <tr key={index} >
                  {that.renderIndex(index)}
                  {that.renderUserNames(user)}
                  {that.renderAccountBalance(user)}
                  {that.renderBet(user)}
                  {that.renderAnswer(user)}
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
