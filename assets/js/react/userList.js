
import React, { Component } from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
  }

  renderUser(name){
    return <p key={"user-" + name } > { name }</p>
  }

  render() {
    return (
      <div>
        <div>
          There are {this.props.users.length} user logged in.
        </div>
        <div>
          {this.props.users.map(this.renderUser)}
        </div>
      </div>
    );
  }
}

export default UserList;
