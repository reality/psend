var jsbot = require('jsbot');

var irc = function(config) {
    var instance = jsbot.createJSBot(config.nick);

    return {
        'send': function(contact, message) {
            var user = contact[2];
                server = contact[3];

            // TODO: Make removeconnection in jsbot and such so can create
            //   persistent connections to make this more efficient
            instance.addConnection(server, server, 6667, null, function(event) {
                instance.say(server, user, message);
                instance.disconnect(server);
            });
            instance.connect(server);
        }
    }
};

exports.create = function(config) {
    return irc(config);
};
