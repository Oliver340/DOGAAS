verify = require('./verifyToken');

module.exports = (router) => {

    // dog routing

    // get a random dog picture
    router.get('/dog', (req, res) => {
        if (!verify(req.body.token)) {
            res.status(403).json({ message: "access forbidden, create a token" });
        }

        
    });

    // post a dog picture
    router.post('/dog', (req, res) => {

    });

    // delete a dog picture
    router.delete('/dog/:tagId', (req, res) => {

    });

    // get a specific dog picture
    router.get('/dog/:tagId', (req, res) => {

    });

    // update a specific dog picture
    router.put('/dog/:tagId', (req, res) => {

    });


    // user routing

    // login user
    router.post('/user', (req, res) => {

    });

    // suicide
    router.delete('/user/:username', (req, res) => {

    });

    // update a user
    router.put('/user/:username', (req, res) => {

    });


    // admin routing

    router.post('/admin', (req, res) => {

    });


    // heartbeat
    router.get('/ping', (req, res) => {

    });
};