var resolvePath = require('./src/resolve-path');
var color = require('onecolor');

// http://stackoverflow.com/a/4579228
var startsWith = function(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
};

var getColorsFromRules = function(rules, testPath) {
    var rawColors = {
        indices: {}
    };

    rules.forEach(function(rule, i) {
        var doesMatch = false;

        if (typeof rule.path === 'string') {
            var resolvedPath = resolvePath(rule.path);
            if (testPath === resolvedPath || startsWith(testPath, resolvedPath + '/')) {
                doesMatch = true;
            }
        } else if (typeof rule.singlePath === 'string') {
            if (testPath === resolvePath(rule.singlePath)) {
                doesMatch = true;
            }
        } else if (typeof rule.pathRegex === 'string') {
            var pattern;

            var regexMatches = rule.pathRegex.match(/^\/(.*)\/([gimuy]*)$/);
            if (regexMatches !== null) {
                var src = regexMatches[1];
                var flags = regexMatches[2];
                pattern = new RegExp(src, flags);
            } else {
                pattern = new RegExp(rule.pathRegex);
            }

            if (pattern.test(testPath)) {
                doesMatch = true;
            }
        }

        if (doesMatch) {
            if (rule.color) {
                if (typeof rule.color === 'object') {
                    if (rule.color.bg) {
                        rawColors.bg = rule.color.bg;
                        rawColors.indices.bg = i;
                    }
                    if (rule.color.fg) {
                        rawColors.fg = rule.color.fg;
                        rawColors.indices.fg = i;
                    }
                } else {
                    // Treat a non-object color as the background color.
                    rawColors.bg = rule.color;
                    rawColors.indices.bg = i;
                }
            }
        }
    });

    return {
        raw: rawColors,
        // parsing invalid colors returns false
        bg: color(rawColors.bg),
        fg: color(rawColors.fg)
    };
};

module.exports = {
    getColorsFromRules: getColorsFromRules
};
