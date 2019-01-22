import React from 'react';
import App from '../../../src/App';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const assert = require('assert');
const nock = require('nock');
const { Given, When, Then } = require('cucumber');

// Configures Enzyme Adapter
configure({ adapter: new Adapter() });

// The DOM is needed when you mount components instead of shallow rendering
Given('the DOM', function () {
    const { JSDOM } = require('jsdom');
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;
    global.window = window;
    global.document = window.document;
});

Given('a nocked health call', function() {
    nock('http://localhost:80').get('/health').reply(200, "Hello World!");
})

When('I shallow render a React component called: App', async function () {
    this.wrapper = shallow(<App />);
    await flushPromises(); 
});

Then('my app should contain the words: Learn React', function () {
    assert(this.wrapper.contains('Hello World!'));
});

// Used to wait for the Axios calls to resolve, and setting state, on componentDidMount()
// https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
// https://github.com/kentcdodds/react-testing-library/issues/11
const flushPromises = () => new Promise(resolve => setImmediate(resolve));