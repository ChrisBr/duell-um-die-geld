
import React, { Component } from 'react';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello, { this.props.name } </h1>
      </div>
    );
  }
}

export default Greeting;
