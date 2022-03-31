const verify = require('../utils/verifyToken');
const controller = require("./controller");

module.exports = (router) => {
    // === Dog routing === //

    // get a random dog picture
    router.route('/dog').get(verify, controller.dogGet);

    // post a dog picture
    router.route('/dog').post(verify, controller.dogPost);

    // delete a dog picture
    router.route('/dog').delete(verify, controller.dogDelete);

    // get a specific dog picture
    router.route('/dog').get(verify, controller.dogTagIdGet);

    // update a specific dog picture
    router.route('/dog').put(verify, controller.dogTagIdPut);


    // === User routing === //

    // login user
    router.route('/user').post(controller.userPost);

    // create user
    router.route('/userCreate').post(controller.userCreate);

    // suicide
    router.route('/user/:username').delete(verify, controller.userUsernameDelete);

    // update a user
    router.route('/user/:username').put(verify, controller.userUsernamePut);


    // === admin routing === //

    // admin login
    router.route('/admin').post(controller.adminPost);

    // heartbeat
    router.route('/ping').get(controller.pingGet);
};