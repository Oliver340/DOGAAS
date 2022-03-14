'use strict';


/**
 * Server heartbeat operation
 * This operation shows how to override the global security defined above, as we want to open it up for all users.
 *
 * no response value expected for this operation
 **/
exports.pingGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

