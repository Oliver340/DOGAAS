const dbUtil = require('../utils/databaseUtil');

module.exports = {
    ping: function (req, res) {
        // Increment end point usage counter
        dbUtil.incrementEndPoint('pingGet');

        res.status(200).send(JSON.stringify({ message: "alive, probably" }));
    },
}