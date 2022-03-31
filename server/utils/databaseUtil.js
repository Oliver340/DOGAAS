const connection = require('./databaseConnection');

module.exports = {
    incrementEndPoint: function (endPoint) {
        connection.query(`UPDATE EndPoints 
                          SET requestCount = requestCount + 1
                          WHERE endPoint = '${endPoint}'`,
        (sqlErr, sqlRes) => {
            if (sqlErr) {
                res.status(404).send("Error incrementing endpoint!");
            }
        });
    },
}
