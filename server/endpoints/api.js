const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require('../modules/verifyToken');
const dbUtil = require('../modules/databaseUtil');

const saltRounds = 10;
const tokenKey = "iR%^anOi2br67"; // should be in .env but w/e

const connection  = mysql.createPool({
    connectionLimit: 100,
    host: "137.184.10.207",
    user: "DOGAAS",
    password: "acrBLSRtaypDkLsk",
    database: "dogaas"
});

module.exports = (router) => {
    // === Dog routing === //

    // get a random dog picture
    router.get('/dog', verify, (req, res) => {
        // Gets random imageurl from dogs table
        connection.query(`SELECT imageURL FROM Dogs
                          ORDER BY RAND()
                          LIMIT 1`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('dogGet');

                res.send(JSON.stringify(sqlRes));
            }
        });
    });

    // post a dog picture
    router.post('/dog', verify, (req, res) => {
        let dogURL = req.query.dogURL;

        connection.query(
            `INSERT INTO Dogs (dogID, imageURL) VALUES (0, '${dogURL}')`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(500).send(`Error storing ${dogURL} in the DB!`);
                } else {
                    // Increment end point usage counter
                    dbUtil.incrementEndPoint('dogPost');

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

        // Increment end point usage counter
        dbUtil.incrementEndPoint('dogTagIdDelete');
    });

    // get a specific dog picture
    router.get('/dog/:tagId', verify, (req, res) => {
        // get that dog by tag
        let tag = req.params.tagId;

        // Gets dog URL by ID
        connection.query(`SELECT imageURL FROM Dogs
                          WHERE tag = ${tag}`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('dogTagIdGet');

                res.send(JSON.stringify(sqlRes));
            }
        });
    });

    // update a specific dog picture
    router.put('/dog/:tagId', verify, (req, res) => {
        // update that dog by tag
        let tag = req.params.tagId;
        let dogURL = req.body.imageURL;
        let user = req.user.username;

        // Increment end point usage counter
        dbUtil.incrementEndPoint('dogTagIdPut');
    });


    // === User routing === //

    // login user
    router.post('/user', (req, res) => {
        const password = req.body.password;
        const username = req.body.username;

        // user login query
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // salted and hashed password so we can find it in the database
        connection.query(`SELECT 1 FROM Users 
                          WHERE userName = '${username}' AND password = '${hash}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send("Database error!");
            }
            
            if (sqlRes > 0) {
                res.status(401).send("Invalid username or password");
            } else {
                const token = jwt.sign(
                    {
                        username: username
                    },
                    tokenKey,
                    {
                        expiresIn: "12h"
                    }
                );
                // Increment end point usage counter
                dbUtil.incrementEndPoint('userPost');

                res.status(200).send(JSON.stringify({ token: token }));
            }
        });
    });

    // create user
    router.post('/userCreate', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.status(400).send(JSON.stringify({ message: "Username or password cannot be empty" }));
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // store hash in database
        connection.query(`INSERT INTO Users (userName, password)
                          VALUES ('${username}', '${hash}')`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // create a token that contains the database PK
                const token = jwt.sign(
                    { 
                        username: username,
                    },
                    tokenKey,
                    {
                        expiresIn: "12h"
                    }
                );
                // Increment end point usage counter
                dbUtil.incrementEndPoint('userCreate');

                res.status(200).send(JSON.stringify({ token: token }));
            }
        });
    });

    // suicide
    router.delete('/user/:username', verify, (req, res) => {
        const username = req.params.username;
        
        // honestly not needed. if the user token exist it already contains the username and we should just use that
        if (username != req.user.username) {
            res.status(401).send(JSON.stringify({ message: "can't delete a user that you aren't" }));
        }

        // remove user from database
        connection.query(`DELETE FROM Users
                          WHERE userName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('userUsernameDelete');
            }
        });
    });

    // update a user
    router.put('/user/:username', verify, (req, res) => {
        const username = req.params.username;
        const password = req.body.password;

        // honestly not needed. if the user token exist it already contains the username and we should just use that
        if (username != req.user.username) {
            res.status(401).send(JSON.stringify({ message: "You may only update yourself!" }));
        }

        // update password
        connection.query(`UPDATE Users
                          SET password = '${password}'
                          WHERE userName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('userUsernamePut');
            }
        });
    });


    // admin routing

    router.post('/admin', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        // login admin
        // Input validation
        connection.query(`SELECT 1 FROM Admins 
                          WHERE password = '${password}' AND adminName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send("Database error!");
            }
            
            if (sqlRes > 0) {
                res.status(401).send("Invalid username or password");
            } else {
                const token = jwt.sign(
                    { 
                        username: username,
                    },
                    tokenKey,
                    {
                        expiresIn: "12h"
                    }
                );
                
                // Provide endpoint data
                connection.query(`SELECT * FROM EndPoints`, (sqlErr2, sqlRes2) => {
                    if (sqlErr2) {
                        res.status(500).send("Database error!");
                    }
                    
                    if (sqlRes2 > 0) {
                        res.status(401).send("Invalid username or password");
                    }  else {
                        // Increment end point usage counter
                        dbUtil.incrementEndPoint('adminPost');

                        res.status(200).send(JSON.stringify({ token: token, endpoints: sqlRes2 }));
                    }
                });
            }
        });
    });


    // heartbeat
    router.get('/ping', (req, res) => {
        // Increment end point usage counter
        dbUtil.incrementEndPoint('pingGet');

        res.status(200).send(JSON.stringify({ message: "alive, probably" }));
    });
};