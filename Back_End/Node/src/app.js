const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.get('/health', (req, res) => {
    res.status(200).send("Hello World!");
});

module.exports = app;