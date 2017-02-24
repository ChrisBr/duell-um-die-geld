
import React, { Component } from 'react';
import LoginForm from './loginForm'
import Greeting from './greeting'
import UserList from './userList'

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(){
    var that = this;
    io.socket.get('/user', function (message) {
      that.setState({users: message});
      that.props.setUsers(message);
    });
  }

  componentWillMount() {
    this.getUsers();
    var that = this;
    io.socket.on('user', function whenMessageRecevied(message) {
      console.log("User subscription: " + message.verb);
      // for now we refetch all user
      that.getUsers();
    });
  }

  render() {
    return(
      <div>
        <div>
          <Greeting user={this.props.user}/>
        </div>
        <div>
          <UserList users={this.state.users} user={this.props.user} />
        </div>
      </div>
    )
  }
}

export default UserContainer;
