
import React, { Component } from 'react';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Let's go { this.props.name }! Please enter your answer and bet.</h1>
      </div>
    );
  }
}

export default Greeting;
