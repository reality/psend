var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    process = require('process');

var psend = function(pConfig) {
    var pPath = './prots/',
        uriRegex = /([a-zA-Z]+):\/\/([\d\w[\]{}^|\\`_-]+?)@([a-zA-Z0-9\.]+)/,
        pNames = _.keys(pConfig),
        dir = fs.readdirSync(pPath),
        prots = {};

    if(!_.isArray(dir)) {
        throw err;
    }

    pNames = _.chain(dir)
      .filter(function(file) {
          return _.include(pNames, file);
      })
      .map(function(file) {
          return path.join(pPath, file);
      })
      .filter(function(file) {
          return fs.statSync(file).isDirectory();
      })
      .each(function(pDir) {
          var pName = _.last(pDir.split(path.sep)); // ~_~
            
          try {
              pModule = require(path.resolve(path.join(pDir, pName))).create(pConfig[pName]);
          } catch(err) {
              console.log(err);
              process.exit(1);
          }

          prots[pName] = pModule;
      })
      .value();

    return {
        // Register a contact (e.g. add a Jabber contact to buddy list)
        'register': function(uri, callback) {
            var contact = uri.match(uriRegex);
            if(contact && _.has(prots, contact[1])) {
                var prot = prots[contact[1]];
                if(_.has(prot, 'register')) {
                    prot.register(contact, callback);
                } else {
                    callback(true, 'NoRegisterSupport');
                }
            } else {
                callback(true, 'BadUri');
            }
        },

        // Check if a contact is registered
        'isRegistered': function(uri, callback) {
            var contact = uri.match(uriRegex);
            if(contact && _.has(prots, contact[1])) {
                var prot = prots[contact[1]];
                if(_.has(prot, 'isRegistered')) {
                    prot.isRegistered(contact, callback);
                } else {
                    callback(true, 'NoRegisterSupport');
                }
            } else {
                callback(true, 'BadUri');
            }
        },

        // Send a message to the specified contact
        'send': function(uri, message, callback) {
            var contact = uri.match(uriRegex);
            if(contact && _.has(prots, contact[1])) {
                prots[contact[1]].send(contact, message, callback); 
            } else {
                callback(true, 'BadUri');
            }
        }
    };
};

module.exports = psend;
