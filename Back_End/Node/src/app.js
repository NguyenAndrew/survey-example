const express = require('express');
const helmet = require('helmet');
var bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/survey', (req, res) => {
    const json = req.body

    // Error Checking
    if (Object.keys(json).length === 0) {
        res.status(400).send("User Error: No input. Empty request body.");
        return;
    }
    if (Object.keys(json).length > 6) {
        res.status(400).send("User Error: Too many params. Empty request body.");
        return;
    }

    // Check questions 1-5 are strings
    for (let i = 1; i <= 5; i++) {
        let question = "question" + i;
        if (!(question in json)) {
            res.status(400).send("User Error: " + question + " not in the request body");
            return;
        }
        if (!(typeof json[question] === 'string' || json[question] instanceof String)) {
            res.status(400).send("User Error: " + question + " not in correct format. Must be a string");
            return;
        }
    }
    // Check questions 1-2 are '1-4'
    for (let i = 1; i <= 2; i++) {
        let question = "question" + i;
        if (json[question] !== '1'
            && json[question] !== '2'
            && json[question] !== '3'
            && json[question] !== '4') {
            res.status(400).send("User Error: " + question + " not in correct format. Must be 1-4");
            return;
        }
    }
    // Check questions 3-4 are '1-4'
    for (let i = 3; i <= 4; i++) {
        let question = "question" + i;
        if (json[question] !== '0'
            && json[question] !== '1') {
            res.status(400).send("User Error: " + question + " not in correct format. Must be 0 or 1");
            return;
        }
    }
    // Check question 5 is '1-10'
    if (json.question5 !== '1'
        && json.question5 !== '2'
        && json.question5 !== '3'
        && json.question5 !== '4'
        && json.question5 !== '5'
        && json.question5 !== '6'
        && json.question5 !== '7'
        && json.question5 !== '8'
        && json.question5 !== '9'
        && json.question5 !== '10') {
        res.status(400).send("User Error: question5 not in correct format. Must be 1-10");
        return;
    }
    // Check question6 is in correct format, if it exists, else set default to 'No Comment'.
    if (Object.keys(json).length === 6) {
        if (!('question6' in json)) {
            res.status(400).send("User Error: question6 not in the request body, even though there are 6 parameters");
            return;
        }
        if (!(typeof json.question6 === 'string' || json.question6 instanceof String)) {
            res.status(400).send("User Error: question6 not in correct format. Must be a string");
            return;
        }         
    } else {
        json.question6 = 'No Comment';
    }

    res.status(200).send("Survey Posted!");
})

app.get('/health', (req, res) => {
    res.status(200).send("Hello World!");
});

module.exports = app;