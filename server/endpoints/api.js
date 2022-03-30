const verify = require('./verifyToken');
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const tokenKey = "iR%^anOi2br67"; // should be in .env but w/e

const connection  = mysql.createPool({
    connectionLimit : 100,
    host: "137.184.10.207",
    user: "DOGAAS",
    password: "acrBLSRtaypDkLsk",
    database: "dogaas"
});

module.exports = (router) => {

    // dog routing

    // get a random dog picture
    router.get('/dog', verify, (req, res) => {
        // SQL has AUTO INCREMENT for the number of requests
        connection.query(`INSERT INTO EndPoints (endPoint, method) VALUES ("getDog", "GET")`, // PROBABLY CHANGE THESE VALUES
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(404).send("Error incrementing endpoints!");
            }
        });

        // Gets random imageurl from dogs table I think???
        connection.query(`SELECT imageURL FROM Dogs
        ORDER BY RAND()
        LIMIT 1`, (err, result) => {
            res.send(JSON.stringify(result));
        });
    });

    // post a dog picture
    router.post('/dog', verify, (req, res) => {
        let dogURL = req.query.dogURL;

        connection.query(
            `INSERT INTO Dogs (dogID, imageURL) VALUES (0, '${dogURL}')`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(404).send(sqlErr);
                    //res.status(404).send("Error posting data!");
                } else {
                    res.status(200).send(`${dogURL} was stored in the DB`);
                }
            }
        );
    });

    // delete a dog picture
    router.delete('/dog/:tagId', verify, (req, res) => {
        // delete that dog by tag
        let tag = req.params.tagId;

        // username for user purposes
        let user = req.user.username;
    });

    // get a specific dog picture
    router.get('/dog/:tagId', verify, (req, res) => {
        // get that dog by tag
        let tag = req.params.tagId;

        // Gets random imageurl from dogs table I think???
        connection.query(`SELECT imageURL FROM Dogs
        WHERE tag = ${tag}`, (err, result) => {
            res.send(JSON.stringify(result));
        });
    });

    // update a specific dog picture
    router.put('/dog/:tagId', verify, (req, res) => {
        // update that dog by tag
        let tag = req.params.tagId;
        let dogURL = req.body.imageURL;
        let user = req.user.username;
    });


    // user routing

    // login user
    router.post('/user', (req, res) => {
        const password = req.body.password;
        const username = req.body.username;

        // user login query
        const salt = await bcrypt.genSalt(saltRounds);

        const hash = await bcrypt.hash(password, salt);

        // salted and hashed password so we can find it in the database
        connection.query(`SELECT 1 FROM Users WHERE userName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes > 0) {
                res.status(404).send("Invalid Username");
                return;
            }
        });

        connection.query(`SELECT 1 FROM Users WHERE password = '${hash}' AND userName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes > 0) {
                res.status(404).send("Invalid Password");
                return;
            }

            { // database query goes here, this is the success block
                const token = jwt.sign(
                    {
                        username: username
                    },
                    tokenKey,
                    {
                        expiresIn: "12h"
                    }
                );
        
                res.status(200).send(JSON.stringify({ token: token }));
            }
        });
    });

    // create user
    router.post('/userCreate', (req, res) => {
        const password = req.body.password;
        const username = req.body.username;

        if (!password || !username) {
            res.status(400).send(JSON.stringify({ message: "need both username and password" }));
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // store hash in database

        // create a token that contains the database PK
        { // database query goes here, this is the success block
            const token = jwt.sign(
                { 
                    username: username,
                },
                tokenKey,
                {
                    expiresIn: "12h"
                }
            );
            res.status(200).send(JSON.stringify({ token: token }));
        }
    });

    // suicide
    router.delete('/user/:username', verify, (req, res) => {
        const username = req.params.username;
        
        // honestly not needed. if the user token exist it already contains the username and we should just use that
        if (username != req.user.username) {
            res.status(401).send(JSON.stringify({ message: "can't delete a user that you aren't" }));
        }

        // remove user from database
    });

    // update a user
    router.put('/user/:username', verify, (req, res) => {
        const username = req.params.username;
        const password = req.body.password;

        // honestly not needed. if the user token exist it already contains the username and we should just use that
        if (username != req.user.username) {
            res.status(401).send(JSON.stringify({ message: "can't update user that you aren't" }));
        }

        // update password
    });


    // admin routing

    router.post('/admin', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        // login admin
        // Input validation
        connection.query(`SELECT 1 FROM Admins WHERE adminName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes > 0) {
                res.status(404).send("Invalid Username");
            }
        });
        connection.query(`SELECT 1 FROM Admins WHERE password = '${password}' AND adminName = '${username}'`, (sqlErr, sqlRes) => {
            if (sqlRes > 0) {
                res.status(404).send("Invalid Password");
            }
        });

        { // database query goes here, this is the success block
            // admin probably doesn't need a token but it gets one anyways. User and Admin table should honestly be the same
            // thing but with an ADMIN bool flag. more ubiquitous usage and less code duplication. Maybe not though.
            const token = jwt.sign(
                { 
                    username: username,
                },
                tokenKey,
                {
                    expiresIn: "12h"
                }
            );

            connection.query(`SELECT * FROM EndPoints`, (err, result) => {
                res.status(200).send(JSON.stringify({ token: token, endpoints: result }));
            });
        }
    });


    // heartbeat

    router.get('/ping', (req, res) => {
        res.status(200).send(JSON.stringify({ message: "alive, probably" }));
    });
};