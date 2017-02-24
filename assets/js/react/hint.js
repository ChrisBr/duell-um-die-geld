import React, { Component } from 'react';

class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.hintsList = this.hintsList.bind(this);
  }

  hintsList() {
    if(this.props.betRound > 0){
      var hints = this.props.hints.slice(0, this.props.betRound - 1);
      return hints.map(function(hint, index){
        return <li key={index} className="list-group-item">{hint}</li>;
      });
    }
  }

  render() {
    var hintsList = this.hintsList();
    if(hintsList !== null){
      return (
        <div className="row" id="questionFormRow">
          <div className="col-md-4 col-md-offset-4" id="questionFormColumn">
            <ul className="list-group">{this.hintsList}</ul>
          </div>
        </div>
      );
    } else {
      return(null);
    }
  }
}

export default Hint;
