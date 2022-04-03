const verify = require('../utils/verifyToken');
const controller = require("./controller");
const apiversion1 = "/API/v1";

module.exports = (router) => {
    // === Dog routing === //

    // get a random dog picture
    router.route(`${apiversion1}/dog`).get(verify, controller.dogGet);

    // post a dog picture
    router.route(`${apiversion1}/dog`).post(verify, controller.dogPost);

    // delete a dog picture
    router.route(`${apiversion1}/dog/:tagID`).delete(verify, controller.dogDelete);

    // get a specific dog picture
    router.route(`${apiversion1}/dog/:tagID`).get(verify, controller.dogTagIdGet);

    // update a specific dog picture
    router.route(`${apiversion1}/dog/:tagID`).put(verify, controller.dogTagIdPut);


    // === User routing === //

    // login user
    router.route(`${apiversion1}/user`).post(controller.userPost);

    // create user
    router.route(`${apiversion1}/userCreate`).post(controller.userCreate);

    // suicide
    router.route(`${apiversion1}/user/:username`).delete(verify, controller.userUsernameDelete);

    // update a user
    router.route(`${apiversion1}/user/:username`).put(verify, controller.userUsernamePut);


    // === admin routing === //

    // admin login
    router.route(`${apiversion1}/admin`).post(controller.adminPost);

    // heartbeat
    router.route(`${apiversion1}/ping`).get(controller.pingGet);
};