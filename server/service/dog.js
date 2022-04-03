const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

module.exports = {
    getRandomDog: function (req, res) {
        // Gets random imageurl from dogs table
        connection.query(`SELECT imageURL, dogId FROM Dogs
                          ORDER BY RAND()
                          LIMIT 1`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('/API/v1/dogGet');

                res.send(JSON.stringify(sqlRes));
            }
        });
    },

    postDog: function (req, res) {
        let dogURL = req.query.dogURL;

        // Insert dog into DB
        connection.query(
            `INSERT INTO Dogs (dogID, imageURL) VALUES (0, '${dogURL}')`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(500).send(JSON.stringify({ message: `Error storing ${dogURL} in the DB!` }));
                } else {
                    connection.query(`SELECT MAX(dogID) FROM Dogs`, 
                    (sqlErr, sqlRes) => {
                        if (sqlErr) {
                            res.status(500).send(JSON.stringify({ message: `Error storing ${dogURL} in the DB!` }));
                            return;
                        }
                        // Increment end point usage counter
                        dbUtil.incrementEndPoint('/API/v1/dogPost');

                        res.status(200).send(JSON.stringify({ message: `${dogURL} was stored in the DB`, dogID: sqlRes.dogID }));
                    });
                }
            }
        );
    },

    deleteDog: function (req, res) {
        // delete that dog by tag
        let tag = req.params.tagID;

        // username for user purposes
        //let user = req.user.username;

        // Delete dog with matching tag from DB
        connection.query(
            `DELETE FROM Dogs WHERE dogID = ${tag}`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(500).send(JSON.stringify({ message: `Database error! Could not delete ${tag}` }));
                } else {
                    // Increment end point usage counter
                    dbUtil.incrementEndPoint('/API/v1/dogTagIdDelete');

                    res.status(200).send(JSON.stringify({ message: `${tag} deleted successfully!` }));
                }
            }
        );
    },

    getDogTagId: function (req, res) {
        // get that dog by tag
        let tag = req.params.tagID;

        // Gets dog URL by ID
        connection.query(`SELECT imageURL, dogId FROM Dogs
                          WHERE dogID = ${tag}`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(JSON.stringify({ message: `Database error!` }));
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('/API/v1/dogTagIdGet');

                res.status(200).send(JSON.stringify(sqlRes));
            }
        });
    },

    putDogTagId: function (req, res) {
        // update that dog by tag
        let tag = req.params.tagID;
        let dogURL = req.query.imageURL;
        let user = req.user.username;

        // Update dog in DB
        connection.query(`UPDATE Dogs
                          SET imageURL = '${dogURL}'
                          WHERE dogId = ${tag}`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(JSON.stringify({ message: `Database error!` }));
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('/API/v1/dogTagIdPut');

                res.status(200).send(JSON.stringify({ message: `${tag} updated successfully!` }));
            }
        });
    },
}