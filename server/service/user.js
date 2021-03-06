const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

const saltRounds = 10;
const tokenKey = require('../utils/generateTokenKey');

module.exports = {
    postUser: function (req, res) {
        const password = req.body.password;
        const username = req.body.username;

        // user login query
        connection.query(`SELECT password FROM Users 
                          WHERE userName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(JSON.stringify({ message: "Database error!" }));
            }  

            if (Object.keys(sqlRes).length === 0) {
                res.status(401).send(JSON.stringify({ message: "Invalid username or password!" }));
            } else {
                bcrypt.compare(password, sqlRes[0]["password"], function(err, result) {
                    if (result == true) {
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
                        dbUtil.incrementEndPoint('/API/v1/userPost');

                        res.status(200).send(JSON.stringify({ token: token }));
                    } else {
                        dbUtil.incrementEndPoint('/API/v1/userPost');

                        res.status(401).send(JSON.stringify({ message: "Invalid username or password!" }));
                    }
                });
            }
        });
    },

    createUser: function (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.status(400).send(JSON.stringify({ message: "Username or password cannot be empty" }));
        }

        // Check if user already exists
        connection.query(`SELECT 1 FROM Users 
                          WHERE userName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(JSON.stringify({ message: "Database error!" }));
            }

            if (Object.keys(sqlRes).length === 0) {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        // store hash in database
                        connection.query(`INSERT INTO Users (userName, password)
                                          VALUES ('${username}', '${hash}')`, 
                        (sqlErr2, sqlRes2) => {
                            if (sqlErr2) {
                                res.status(500).send(JSON.stringify({ message: `Database error!` }));
                            } else {
                                // create a token that contains the database PK
                                const token = jwt.sign(
                                { 
                                    username: username,
                                },
                                tokenKey,
                                {
                                    expiresIn: "12h"
                                });
                                // Increment end point usage counter
                                dbUtil.incrementEndPoint('/API/v1/userCreate');
        
                                res.status(200).send(JSON.stringify({ token: token }));
                            }
                        });
                    });
                });
            } else {
                res.status(401).send(JSON.stringify({ message: "User already exists!" }));
            }
        });
    },

    deleteUserUsername: function (req, res) {
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
                res.status(500).send(JSON.stringify({ message: `Database error!` }));
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('/API/v1/userUsernameDelete');
            }
        });
    },

    putUserUsername: function (req, res) {
        const username = req.params.username;
        const newPassword = req.body.password;

        if (username != req.user.username) {
            res.status(401).send(JSON.stringify({ message: "You may only update yourself!" }));
        }
        
        // Hash and update password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                // update password
                connection.query(`UPDATE Users
                                  SET password = '${hash}'
                                  WHERE userName = '${username}'`, 
                (sqlErr, sqlRes) => {
                    if (sqlErr) {
                        res.status(500).send(JSON.stringify({ message: `Database error!` }));
                    } else {
                        // Increment end point usage counter
                        dbUtil.incrementEndPoint('/API/v1/userUsernamePut');
                        res.status(200).send(JSON.stringify({ message: `updated password successfully` }));
                    }
                });
            });
        });
    },
}