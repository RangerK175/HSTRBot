const config = require('../config.json');

// This is the ai.
// recastai is required to make request to analyzer to analyze the intent of messages sent that aren't commands.
const recastai = require('recastai').default;

const ai = new recastai(config.aiToken, 'en');
const request = ai.request;

// Character Service
const charService = require('./services/characterService');

// HSTR Service
const hstrService = require('./services/hstrService');

// Intents
const greetings = require('../intents/greetings');
const thanks = require('../intents/thanks');


exports.analyzeText = function (message, prefix) {
    request.analyseText(message.content)
        .then((res) => {
            console.log(`Intent: ${res.intent().slug}`);

            const intent = res.intent();

            switch (intent.slug) {
            case 'greetings' : {
                const greeting = greetings();
                message.channel.send(`${greeting}, ${message.author.username}`);
                break;
            }
            case 'hstr-informations' : {
                const team = res.entities.team[0].value;
                const teamInfo = hstrService.findTeamInfos(team);

                message.channel.send(`${team} is primarily used in phase ${teamInfo.primaryPhase}`);
                message.channel.send(`${team} typically consists of ${teamInfo.members}`);
                break;
            }
            case 'get-help' : {
                const entity = res.entities.characterabr || res.entities.team;

                if (entity) {
                    const abbr = entity[0].raw;

                    const actualName = charService.findAbbr(abbr);
                    message.channel.send(`${abbr} is the abbreviation for ${actualName}`);
                } else {
                    message.channel.send(`Looking for help, ${message.author.username}?`);
                    message.channel.send(`Feel free to send ${prefix}help for quick commands.`);
                }

                break;
            }
            case 'say-thanks': {
                const thank = thanks();
                message.channel.send(thank);
                break;
            }

            default: {
                message.channel
                    .send(`I'm not sure I understand. Try a different phrase or refer ask me for help with ${prefix}help.`);
            }
            }
        })
        .catch((err) => {
            console.log(err);
            message.channel
                .send(`You caught me off-guard. I don't understand that at all.`);
        });
};
