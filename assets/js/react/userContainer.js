
import React, { Component } from 'react';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] }
    this.getData = this.getData.bind(this);
    this.createUsers = this.createUsers.bind(this);
  }

  createUsers(users){
    var userList = users.map(function(user) {
      return <div key={"user-" + user.id }>{ user.name }</div>
    });
    this.setState({ userList: userList })
  }

  getData(){
  fetch('http://localhost:1337/user')
    .then((response) => response.json())
    .then((responseJson) => { this.createUsers(responseJson) })
    .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div>
        <h1>Hello, { this.props.name } </h1>
        <button type="button" className="btn btn-success"onClick={this.getData}>Check!</button>
        <div>{ this.state.userList }</div>
      </div>
    );
  }
}

export default UserContainer;
