var psend = require('./psend');

var ps = psend({
    'irc': {
        'nick': 'idk',
        'persistent': true
    }
});

ps.send('irc://reality@irc.aberwiki.org', 'testing testing');
