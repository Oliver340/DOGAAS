const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

const saltRounds = 10;
const tokenKey = "iR%^anOi2br67"; // should be in .env but w/e

module.exports = {
    postUser: function (req, res) {
        const password = req.body.password;
        const username = req.body.username;

        // user login query
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                // salted and hashed password so we can find it in the database
                connection.query(`SELECT 1 FROM Users 
                                  WHERE userName = '${username}' AND password = '${hash}'`, 
                (sqlErr, sqlRes) => {
                    if (sqlErr) {
                        res.status(500).send(JSON.stringify({ message: "Database error!" }));
                    }

                    if (sqlRes > 0) {
                        res.status(401).send(JSON.stringify({ message: "Invalid username or password" }));
                    } else {
                        const token = jwt.sign(
                        {
                            username: username
                        },
                        tokenKey,
                        {
                            expiresIn: "12h"
                        });
                        // Increment end point usage counter
                        dbUtil.incrementEndPoint('/API/v1/userPost');

                        res.status(200).send(JSON.stringify({ token: token }));
                    }
                });
            });
        });
    },

    createUser: function (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.status(400).send(JSON.stringify({ message: "Username or password cannot be empty" }));
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                // store hash in database
                connection.query(`INSERT INTO Users (userName, password)
                                  VALUES ('${username}', '${hash}')`, 
                (sqlErr, sqlRes) => {
                    if (sqlErr) {
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
                res.status(500).send(JSON.stringify({ message: `Database error!` }));
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('/API/v1/userUsernamePut');
                res.status(200).send(JSON.stringify({ message: `updated password successfully` }));
            }
        });
    },
}