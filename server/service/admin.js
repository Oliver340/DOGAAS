const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

const tokenKey = "iR%^anOi2br67"; // should be in .env but w/e

module.exports = {
    postAdmin: function (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        // login admin
        // Input validation
        connection.query(`SELECT password FROM Admins 
                          WHERE adminName = '${username}'`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(JSON.stringify({ message: "Database error!" }));
            }
            
            if (Object.keys(sqlRes).length === 0) {
                res.status(401).send(JSON.stringify({ message: "Invalid username or password" }));
            } else {
                bcrypt.compare(password, sqlRes[0]["password"], function(err, result) {
                    if (result == true) {
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
                                res.status(500).send(JSON.stringify({ message: "Database error!" }));
                            }
                            
                             // Increment end point usage counter
                             dbUtil.incrementEndPoint('/API/v1/adminPost');
        
                             res.status(200).send(JSON.stringify({ token: token, endpoints: sqlRes2 }));
                        });
                    } else {
                        dbUtil.incrementEndPoint('/API/v1/adminPost');

                        res.status(401).send(JSON.stringify({ message: "Invalid username or password!" }));
                    }
                });
            }
        });
    },
}