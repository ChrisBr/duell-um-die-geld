
import React, { Component } from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{ this.props.id }: { this.props.name }</h1>
      </div>
    );
  }
}

export default User;
