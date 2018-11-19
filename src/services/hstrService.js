const db = require('../../data/hstr.json');

exports.getHstrTeam = function(req, res) {
    const team = req.body.conversation.memory.team;
    const teamInfos = findTeamInfos(team.value);

    if (!teamInfos) {
        res.json({
            replies: [
                { type: 'text', content: `I don't know a team called ${team.value} :(` },
            ],
        });
    } else {
        res.json({
            replies: [
                { type: 'text', content: `${team.value} is primarily used in phase ${teamInfos.primaryPhase}`},
                { type: 'text', content: `${team.value} typically consists of ${teamInfos.members}` },
            ],
        });
    }
};

exports.findTeamInfos = function(name) {
    const data = db.filter((team) => {
        return team.names.find(n => n.toLowerCase() === name.toLowerCase());
    });

    if (!data) {
        return null;
    }
    return data[0];
};