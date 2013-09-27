var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    process = require('process');

var psend = function(pConfig) {
    var pPath = './prots/',
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
              console.log('I AM UPSET');
              console.log(err);
              process.exit(1);
          }

          prots[pName] = pModule;
      })
      .value();

    return {
        'send': function(uri, message) {
            var contact = uri.match(/([a-zA-Z]+):\/\/([\d\w[\]{}^|\\`_-]+?)@([a-zA-Z0-9\.]+)/);
            if(contact && _.has(prots, contact[1])) {
                prots[contact[1]].send(contact, message); 
            } else {
                console.log('I AM UPSET AT UNSUPPORTED CONTACT URI >:(');
            }
        }
    };
};

module.exports = psend;
