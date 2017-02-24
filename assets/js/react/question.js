import React, { Component } from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row" id="questionFormRow">
        <div className="col-md-4 col-md-offset-4" id="questionFormColumn">
          <h1>
            {this.props.question}
          </h1>
        </div>
      </div>
    );
  }
}

export default Question;
