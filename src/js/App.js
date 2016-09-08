import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import xhr from 'xhr';
require ('../style/file.scss');

import Wrap from './Wrap';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      data: {}
    };
  }

  fetchData(evt) {
    evt.preventDefault();

    let location = encodeURIComponent(this.state.location);

    let urlPre= 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuf = '&APPID=8874d2569fa46c5396328bb0ea0a2241&units=metric';
    let url = urlPre + location + urlSuf;

    let self = this;


    xhr({
      url: url
    }, function (err, data) {
      self.setState({
        data: JSON.parse(data.body)
      });
    });
}

  changeLocation(evt) {
    this.setState({
      location: evt.target.value
    });
  }

  render() {
    let currentTemp = '';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData.bind(this)}>
	  <label>Show me the temperature for
            <input
              placeholder={"City"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation.bind(this)}
            />
          </label>
        </form>
        { (this.state.data.list) ? <Wrap currentTemp={currentTemp} />  : null }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
