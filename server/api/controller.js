const dog = require('../service/dog');
const user = require('../service/user');
const admin = require('../service/admin');
const serverUtil = require('../service/serverUtil.js');

let controllers = {
    dogGet: function(req, res) {
        dog.getRandomDog(req, res);
    },

    dogPost: function(req, res) {
        dog.postDog(req, res);
    },

    dogDelete: function(req, res) {
        dog.deleteDog(req, res);
    },

    dogTagIdGet: function(req, res) {
        dog.getDogTagId(req,res);
    },

    dogTagIdPut: function(req, res) {
        dog.putDogTagId(req,res);
    },

    userPost: function(req, res) {
        user.postUser(req,res);
    },

    userCreate: function(req, res) {
        user.createUser(req,res);
    },

    userUsernameDelete: function(req, res) {
        user.deleteUserUsername(req,res);
    },

    userUsernamePut: function(req, res) {
        user.putUserUsername(req,res);
    },

    adminPost: function(req, res) {
        admin.postAdmin(req,res);
    },

    pingGet: function(req, res) {
        serverUtil.ping(req,res);
    },
};

module.exports = controllers;