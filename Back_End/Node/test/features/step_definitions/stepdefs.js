const request = require('supertest');
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('an Express application called app', function () {
    this.app = require('../../../src/app');
});

When('I call the default route on app', function () {
    return request(this.app).get('/').then((response) => {
        this.result = response.text;
        this.status = response.status;
    });
});

Then('I should see Hello World!', function () {
    assert.equal(this.result, "Hello World!");
});

Then('I should see a 200 status', function () {
    assert.equal(this.status, 200);
});