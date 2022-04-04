const bcrypt = require("bcrypt");
const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

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
                        // Provide endpoint data
                        connection.query(`SELECT * FROM EndPoints`, (sqlErr2, sqlRes2) => {
                            if (sqlErr2) {
                                res.status(500).send(JSON.stringify({ message: "Database error!" }));
                            }
                            
                             // Increment end point usage counter
                             dbUtil.incrementEndPoint('/API/v1/adminPost');
        
                             res.status(200).send(JSON.stringify(sqlRes2));
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