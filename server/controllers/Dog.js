'use strict';

var utils = require('../utils/writer.js');
var Dog = require('../service/DogService');

module.exports.dogGET = function dogGET (req, res, next) {
  console.log(`boggo`);
  Dog.dogGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dogPOST = function dogPOST (req, res, next, body) {
  Dog.dogPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dogTagIdDELETE = function dogTagIdDELETE (req, res, next, tagId) {
  Dog.dogTagIdDELETE(tagId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dogTagIdGET = function dogTagIdGET (req, res, next, tagId) {
  Dog.dogTagIdGET(tagId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dogTagIdPUT = function dogTagIdPUT (req, res, next, body, tagId) {
  Dog.dogTagIdPUT(body, tagId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
