import React, { Component } from "react";

export default class Wrap extends Component {
  render() {
  	return (
  		<div>
        <p className="temp-wrapper">
          <span className="temp"> { this.props.currentTemp } </span>
          <span className="temp-symbol"> °C </span>
        </p>
		</div>
    );
  }
}
