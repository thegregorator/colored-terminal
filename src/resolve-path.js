var path = require('path');

// Snippet from yanickrochon: https://github.com/joyent/node/issues/2857#issuecomment-43699059
module.exports = function resolvePath(str) {
    if (str === '~' || str.substr(0, 2) === '~/') {
        str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
    }
    return path.resolve(str);
};
