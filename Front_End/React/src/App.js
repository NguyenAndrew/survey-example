import React, { Component } from 'react';
import * as Survey from 'survey-react';
import json from './survey.json';
import 'survey-react/survey.css';
import Axios from 'axios';

class App extends Component {
  render() {
    const model = new Survey.Model(json);

    model
      .onComplete
      .add(function (result) {
        Axios.post('/survey', result.data);
      });

    return (
      <Survey.Survey model={model} />
    );
  }
}

export default App;