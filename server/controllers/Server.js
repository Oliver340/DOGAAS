'use strict';

var utils = require('../utils/writer.js');
var Server = require('../service/ServerService');

module.exports.pingGET = function pingGET (req, res, next) {
  Server.pingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
