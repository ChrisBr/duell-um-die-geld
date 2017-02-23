
import React, { Component } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.loginUser = this.loginUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loginUser(event){
    this.props.handleLogin(this.state.value);
    event.preventDefault();
  }

  handleChange(event){
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.loginUser}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" onChange={this.handleChange} className="form-control" id="name" placeholder="Your Username"></input>
        </div>
        <button type="submit" className="btn btn-success">Enter!</button>
      </form>
    );
  }
}

export default Login;
