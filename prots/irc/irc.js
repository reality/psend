var irc = function(config) {
    return {
        'send': function() {
            console.log('Literally an IRC placeholder.');
        }
    }
};

exports.create = function(config) {
    return irc(config);
};
