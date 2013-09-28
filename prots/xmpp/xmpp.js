var nxmpp = require('node-xmpp');

var xmpp = function(config) {
    var client = new nxmpp.Client({ 
        'jid': config.jid,
        'password': config.password
    });

    return {
        'register': function(contact, callback) {
            // TODO
        },

        'send': function(contact, message, callback) {
            var user = contact[1] + '@' + contact[2]; // lol

            client.send(new nxmpp.Element('message', { 
                'to': user,
                'type': 'chat'
            }).c('body').t(message));

            callback();
        }
    }
};

exports.create = function(config) {
    return xmpp(config);
};
