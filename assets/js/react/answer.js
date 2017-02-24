import React, { Component } from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value });
  }

  handleSubmit(event) {
    this.props.updateAnswer(this.state.value);
    event.preventDefault();
  }

  render() {
    var html = "";
    if(this.props.users && this.props.users.length <= 1 ){
      html = <p className="lead">Waiting for more players ...</p>
    } else if(this.props.user.answer === "") {
      html = <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="bet">What is your answer:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" id="bet" placeholder="Enter your answer ..." />
              </div>
              <button type="submit" className="btn btn-success">Set answer!</button>
            </form>
    } else {
      html = <p className="lead">Your answer is {this.props.user.answer}</p>
    }
    return(
      <div className="row" id="betFormRow">
        <div className="col-md-4 col-md-offset-4" id="betFormColumn">
          { html }
        </div>
      </div>
    );
  }
}

export default Answer;
