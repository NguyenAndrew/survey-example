import React, { Component } from 'react';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

import json from './survey.json';

class App extends Component {
  componentWillMount() {
    // Survey.Survey.cssType = "bootstrap";
  }

  render() {
    var model = new Survey.Model(json);

    model
      .onComplete
      .add(function (result) {
        console.log(JSON.stringify(result.data));
      });

    return (
      <Survey.Survey model={model} />
    );
  }
}

export default App;