'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userPOST = function userPOST (req, res, next, body) {
  User.userPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUsernameDELETE = function userUsernameDELETE (req, res, next, username) {
  User.userUsernameDELETE(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUsernamePUT = function userUsernamePUT (req, res, next, body, username) {
  User.userUsernamePUT(body, username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
