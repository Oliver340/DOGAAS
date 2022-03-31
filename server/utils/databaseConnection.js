const mysql = require("mysql");

const pool = mysql.createPool({
    host: "137.184.10.207",
    user: "DOGAAS",
    password: "acrBLSRtaypDkLsk",
    database: "dogaas"
});

module.exports = pool;