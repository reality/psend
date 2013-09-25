var irc = require('irc'); // change to jsbot if you really want
var should = require('should');
var psend = require('../psend');

describe('IRC', function(){
    before(function(done){
        // create an IRC client to test
        this.timeout(0);
        this.client = new irc.Client('irc.freenode.net', 'psendtester', {
            realName: 'psend testing suite',
            userName: 'mocha'
        });
        this.client.addListener('registered', function(message){
            done();
        });
    });
    it('should connect and send a message successfully', function(done){
        this.timeout(0); // probably should remove/change this
        this.client.addListener('pm', function(from, message){
            if(from !== 'psend-test'){
                return;
            } else if (message.command == 'testing testing'){
                done();
            }
        });

        var ps = psend({
            'irc': 'psendtest',
            'persistent': 'true'
        });

        ps.send('irc://psendtester@irc.freenode.net', 'testing testing');
    });
});

