const connection = require('../utils/databaseConnection');
const dbUtil = require('../utils/databaseUtil');

module.exports = {
    getRandomDog: function (req, res) {
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
    },

    postDog: function (req, res) {
        let dogURL = req.query.dogURL;

        // Insert dog into DB
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
    },

    deleteDog: function (req, res) {
        // delete that dog by tag
        let tag = req.query.tagId;

        // username for user purposes
        //let user = req.user.username;

        // Delete dog with matching tag from DB
        connection.query(
            `DELETE FROM Dogs WHERE dogID = ${tag}`,
            (sqlErr, sqlRes) => {
                if (sqlErr) {
                    res.status(500).send(`Database error! Could not delete ${tag}`);
                } else {
                    // Increment end point usage counter
                    dbUtil.incrementEndPoint('dogTagIdDelete');

                    res.status(200).send(`${tag} deleted successfully!`);
                }
            }
        );
    },

    getDogTagId: function (req, res) {
        // get that dog by tag
        let tag = req.query.tagId;

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
    },

    putDogTagId: function (req, res) {
        // update that dog by tag
        let tag = req.query.tagId;
        let dogURL = req.query.imageURL;
        let user = req.user.username;

        // Update dog in DB
        connection.query(`UPDATE Dogs
                          SET imageURL = '${dogURL}'
                          WHERE dogId = ${tag}`, 
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(500).send(`Database error!`);
            } else {
                // Increment end point usage counter
                dbUtil.incrementEndPoint('dogTagIdPut');

                res.status(200).send(`${tag} updated successfully!`);
            }
        });
    },
}