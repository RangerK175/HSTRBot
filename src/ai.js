const config = require('../config.json');

// This is the ai.
// recastai is required to make request to analyzer to analyze the intent of messages sent that aren't commands.
const recastai = require('recastai').default;
const ai = new recastai(config.aiToken, 'en');
const request = ai.request;

// SWGOH data api
const swgohApi = require('api-swgoh-help');
const swapi = new swgohApi({
  username: 'Tipster22',
  password: 'hstrbot123',
});

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
      if (!res.intent()) {
        message.channel
          .send(`I'm not sure I understand. Try a different phrase or ask me for help with ${prefix}help.`);
      } else {
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
        case 'event-information': {
          const event = res.entities.event[0].value.toLowerCase();

          swapi.fetchEvents().then((result, error, warning) => {
            if (error) {
              console.log(error);
            }

            if (result) {
              const eventList = result.result.events;

              switch (event) {
                case 'jkr':
                case 'jkr event': {
                  const revanEvent = eventList.find((event) => {
                    return event.id === 'EVENT_HERO_JEDIKNIGHTREVAN';
                  });

                  let eventDate = new Date(revanEvent.instanceList[0].startTime).toDateString();
                  let endDate = new Date(revanEvent.instanceList[0].endTime).toDateString();

                  message.channel.send(`The next Revan date will run from ${eventDate} to ${endDate}`);

                  break;
                }
                case 'credit heist' : {

                  const creditHeist = eventList.find((event) => {
                    return event.id === 'challenge_CREDIT';
                  });

                  let pastDate = new Date(creditHeist.instanceList[creditHeist.instanceList.length - 2].startTime).toDateString();
                  let futureDate = new Date(creditHeist.instanceList[creditHeist.instanceList.length - 1].startTime).toDateString();
                  message.channel.send(`The last credit heist was on ${pastDate}`);
                  message.channel.send(`The next credit heist is on ${futureDate}`);
                  break;
                }
              }
            }
          });

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
            .send(`I'm not sure I understand. Try a different phrase or ask me for help with ${prefix}help.`);
        }
        }
      }
    })
    .catch((err) => {
      console.log(err);
      message.channel
        .send(`You caught me off-guard. I don't understand that at all.`);
    });
};
