
import React, { Component } from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserNames = this.renderUserNames.bind(this);
    this.renderAccountBalance = this.renderAccountBalance.bind(this);
    this.renderIndex = this.renderIndex.bind(this);
  }

  renderUserNames(userName){
    return <td>{ userName }</td>
  }

  renderAccountBalance(accountBalance){
    return <td>{ accountBalance }</td>
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
                  <td>Waiting for answer</td>
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
