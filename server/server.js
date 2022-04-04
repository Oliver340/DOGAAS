const url = require("url");
const express = require("express");
const bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");
const port = 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://dogaas.nitropan.software");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const routes = require('./api/routes')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});