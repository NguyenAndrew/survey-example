import React, { Component } from 'react';
import axios from 'axios';

let canUseDOM = !!(
  (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);

let logo = '';

if (canUseDOM) {
  logo = require('./logo.svg');
  require('./App.css');
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      'health': ''
    };
  }

  componentDidMount() {
    axios.get('/health').then(res => {
      this.setState({ "health": res.data });
    }).catch((err) => {
      console.log('I am the one who knocks!');
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.health}
          </a>
        </header>
      </div>
    );
  }
}

export default App;