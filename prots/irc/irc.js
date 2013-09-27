var jsbot = require('jsbot');

var irc = function(config) {
    var instance = jsbot.createJSBot(config.nick);

    return {
        'send': function(contact, message) {
            var user = contact[2],
                server = contact[3];

            instance.addConnection(server, server, 6667, null, function(event) {
                instance.say(server, user, message);
                instance.connections[server].send('QUIT');
            });
            instance.connect(server);
        }
    }
};

exports.create = function(config) {
    return irc(config);
};
