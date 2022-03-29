const url = require("url");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");
const port = 1337;
const app = express();

const connection = mysql.createConnection({
    host: "137.184.10.207",
    user: "DOGAAS",
    password: "acrBLSRtaypDkLsk",
    database: "DOGAAS",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // CHANGE
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const routes = require('./endpoints/api')(app);

// GET DOG IMAGE
app.get("/", (req, res) => {
    // SQL has AUTO INCREMENT for the number of requests
    connection.query(`INSERT INTO EndPoints (endPoint, method) VALUES ("getDog", "GET")`, // PROBABLY CHANGE THESE VALUES
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(404).send("Error incrementing endpoints!");
            }
        }
    );

    // Gets random imageurl from dogs table I think???
    connection.query(`SELECT imageURL FROM Dogs
    ORDER BY RAND()
    LIMIT 1`, (err, result) => {
        res.send(JSON.stringify(result));
    });
});

// POST DOG TO DB
app.post("/post-dog", (req, res) => {
    let input = "";
    req.on("data", (chunk) => {
        if (chunk != null) {
            input += chunk;
        }
    });
    req.on("end", () => {
        let query = url.parse(input, true).query;

        let dogURL = query["dogURL"];

        connection.query(
            `INSERT INTO Dogs (imageURL) VALUES ("${dogURL}")`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(404).send("Error posting data!");
                }

                res.status(200).send(`${dogURL} was stored in the DB`);
            }
        );
    });
});


// LOGIN FOR ADMIN
app.post("/admin", (req, res) => {
    let input = "";
    req.on("data", (chunk) => {
        if (chunk != null) {
            input += chunk;
        }
    });
    req.on("end", () => {
        let query = url.parse(input, true).query;

        let username = query["username"];
        let password = query["password"];

        // Input validation
        connection.query(`SELECT 1 FROM Admins WHERE adminName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes != '1') {
                res.status(404).send("Invalid Username");
            }
        });
        connection.query(`SELECT 1 FROM Admins WHERE password = '${password}' AND adminName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes != '1') {
                res.status(404).send("Invalid Password");
            }
        });

        connection.query(`SELECT * FROM EndPoints`, (err, result) => {
            res.send(JSON.stringify(result));
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

connection.connect((err) => {
    console.log(`Database connected!`);
});