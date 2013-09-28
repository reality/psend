var jsbot = require('jsbot'),
    should = require('should'),
    psend = require('../psend');

describe('IRC', function(){
    before(function(done){
        // create an IRC client to test
        this.client = jsbot.createJSBot('psendtester');
        this.client.addConnection('freenode', 'irc.freenode.org', 6667, null, function(event) {
            done(); 
        }.bind(this));
        this.client.connect('freenode');
    });
    it('should connect and send a message successfully', function(done){
        this.timeout(10000); // probably should remove/change this

        this.client.addListener('PRIVMSG', 'psendtester', function(event) {
            if(event.user == 'psendtest' && event.message == 'testing testing') {
                done();
            } else {
                return;
            }
        });

        var ps = psend({
            'irc': {
                'nick': 'psendtest',
                'persistent': 'true'
            }
        });

        ps.send('irc://psendtester@irc.freenode.org', 'testing testing');
    });
});
