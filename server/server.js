const url = require("url");
const express = require("express");
const mysql = require("mysql");
const port = 1337;
const app = express();

const connection = mysql.createConnection({
    host: "",
    port: "",
    user: "",
    password: "",
    database: "",
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // CHANGE
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


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
        connection.query(`SELECT adminName FROM Admins`, (sqlErr, sqlRes) => {
            if (username != sqlRes) {
                res.status(404).send("Invalid Username");
            }
        });
        connection.query(`SELECT password FROM Admins`, (sqlErr, sqlRes) => {
            if (password != sqlRes) {
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