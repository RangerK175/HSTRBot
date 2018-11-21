const abbrs = require('../../data/abbr.json');

exports.getCharacterByAbbr = function (req, res) {
    const abbr = req.body.conversation.memory.abbr;
    const actualName = this.findAbbr(abbr.value);

    if (!actualName) {
        res.json({
            replies: [
                { type: 'text', content: `I don't know what that is either.` },
            ],
        });
    } else {
        res.json({
            replies: [
                { type: 'text', content: `${abbr.value.toUpperCase()} is the abbreviation for ${actualName}`},
            ],
        });
    }
};

exports.findAbbr = function (abbr) {
    for (const key of Object.keys(abbrs)) {
        if (key.toLowerCase() === abbr.toLowerCase()) {
            return abbrs[key];
        }
    }
};
