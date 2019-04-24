// Load up the discord.js library
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require('./config.json');
// config.token contains the bot's token
// config.prefix contains the default prefix.
// config.clientID contains the bot config ID (change between testing and live)


// Message Handler
const aiHandler = require('./src/ai');

client.on('ready', () => {
  (async () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

// Example of changing the bot's playing game to something useful. `client.user` is what the
// docs refer to as the "ClientUser".
    client.user.setActivity(`${config.prefix}help for help. Bot serving ${client.users.size} users, in ${client.channels.size} channels`);
  })()
      .catch(console.log);
});

// Guild and Server are synonymous
client.on('guildCreate', guild => {
  // This event triggers when the bot joins a server.

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});


client.on('guildDelete', guild => {
  // this event triggers when the bot is removed from a guild.

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on('message', (message) => {
  ( async () => {
    let prefix, prefixes;

    if (config) {
      prefix = config.prefix;
    }
    // This event will run on every single message received, from any channel or DM.
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    prefixes = JSON.parse(fs.readFileSync(__dirname + "/data/prefixes.json", "utf8"));

    if (message && message.guild && prefixes[message.guild.id]) {
      prefix = prefixes[message.guild.id].prefix
    }

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "!say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'ping': {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send('Ping?');
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        break;
      }

      case 'help':
      case 'h': {
        const helpEmbed = new Discord.RichEmbed()
            .setColor("#FF9900")
            .setTitle("HSTR BOT")
            .setAuthor("Maintained by Tipster22#1021")
            .setDescription(`Welcome! This bot provides content from the HSTR Project. Below are commands to retrieve information. To read the guide and get advice from the community, join here: https://discord.gg/yPchf8r.`)
            .addField(`Command`, `This server is currently using ${prefix} use this to evoke all of the following commands.`)
            .setColor(0xff0000)
            .addField(`Utilities`, `
              **invite**: Invite the bot to your Discord server!
              **prefix [new prefix]**: Set the channel's prefix for the bot to a different key. (Requires: Manage Channels)
              **readiness**: Breaks down how ready your guild is for each HSTR phase,
               and analyzes which guild members need to strengthen which squads for phases that you are not ready for. 
            `)
            .addField(`Teams`, `
              **teamlist**: Display the full teams list
              **nightsisters**: Display the nightsister team that can be used in P2, 3, and 4
            `)
            .addField(`Phase 1`, `
              **p1 [number | percentage]**: Convert damage score to percent or vice versa of Nihilus
              **nihilusmatrix**: display matrix to understand Nihilus attack patterns
              **jtr**: display the P1 JTR battlecard
              **p1jedi**: display the P1 Jedi battlecard
            `)
            .addField(`Phase 2`, `
              **p2 [number | percentage]**: Convert damage score to percent or vice versa of Sion
              **p2jedi**: display the P2 Jedi battlecard
              **p2fo**: display the P2 First Order battlecard
              **phoenix**: display the P2 Phoenix battlecard
              **ewoks**: display the P2 Ewoks battlecard
              **leia**: display the P2 Machine Gun Leia battlecard
              **churchofnute**: display the P2 Church of Nute battlecard
            `)
            .addField(`Phase 3`, `
              **p3 [number | percentage]**: Convert damage score to percent or vice versa of Traya
              **chexmix**: display the P3 Chex Mix battlecard
              **yolorolo**: display the P3 Yolo Rolo battlecard
              **p3nightsisters**: Display the 9% Nightsister P3 Strategy 

            `)
            .addField(`Phase 4`, `
              **p4 [number | percentage]**: Convert damage score to percent or vice versa of the trio
              **p4nightsisters**: display the P4 Nightsisters battlecard
            `)
            .addField(`Events`, `
              **event-c3po**: Display the C3PO event battlecard
              **event-darthomir**: Display the Darthomir Bonus tier battlecard
              **tb-rogue1**: Display the Rogue One P6 territory battle battlecard.`);
        message.channel.send(helpEmbed);
        break;
      }

      case 'event-c3po': {
        message.channel.send('https://drive.google.com/file/d/1ciHrJdP6HsrKN-kubizdgG9U6esBI1yJ/view');
        break;
      }

      case 'event-darthomir': {
        message.channel.send('https://drive.google.com/file/d/1D-BgB-yEbicBGuvpAnaFkpWWfAmFqhug/view');
        break;
      }

      case 'tb-rogue1': {
        message.channel.send('https://drive.google.com/file/d/12s9PWj-JhnNgAtUloNwv3Z6SgCqpH3vW/view');
        break;
      }

      case 'airplane-mode': {
        message.channel.send('https://drive.google.com/file/d/1ujfsTNzbPlEANakReljkmo6h0-fxwndu/view');
        break;
      }

      case 'teamlist':
      case 'teamslist': {
        message.channel
            .send('https://cdn.discordapp.com/attachments/477060596832010242/477497563650457605/Screen_Shot_2018-08-10_at_11.24.25_PM.png');
        break;
      }

      case 'jtr': {
        message.channel.send('https://drive.google.com/file/d/1_JBnmHFMHqzLWdx1i7NLc0lHQop267d1/view');
        break;
      }

      case 'p1jedi':
      case 'yoda':
      case 'gmyoda': {
        message.channel.send('https://drive.google.com/file/d/1l9_kGeyo8XzdEhzwyeoiHmK27TZ7z__-/view?usp=drivesdk');
        break;
      }

      case 'p2jedi':
      case 'bastilla': {
        message.channel.send('https://drive.google.com/open?id=1Z06JomJBransHh8MDl7ikQKsn_J383st');
        break;
      }

      case 'p2fo':
      case 'firstorder': {
        message.channel.send('https://drive.google.com/file/d/1mUxZ1Lu8aMvqpCddnOxttDfNahoX2OGV/view');
        break;
      }

      case 'leia':
      case 'machinegunleia': {
        message.channel.send('https://drive.google.com/open?id=1zRxBz7r5qOS-G9WCsz3PHHSz6VRNmLzt');
        break;
      }

      case 'nute':
      case 'churchofnute': {
        message.channel.send('https://drive.google.com/open?id=1p3w7EFQHNllxcvGP5uE37xaKgJLe-V02');
        break;
      }

      case 'phoenix': {
        message.channel.send('https://drive.google.com/open?id=1FhGBkqX4LOueRMKxVs5dIXvLAEL7PhB9');
        break;
      }

      case 'p2ewoks':
      case 'ewoks': {
        message.channel.send('https://drive.google.com/open?id=1rvla8G2S_UgcIeXKS6ravpOVVGzM8fHO');
        break;
      }

      case 'chexmix': {
        message.channel.send('https://drive.google.com/open?id=1Pg1goUW-bRebWd8nzJ9es8nF0Nk4S9KC');
        break;
      }

      case 'yolorolo': {
        message.channel.send('https://drive.google.com/open?id=1fWZPMJZ1YDDgbyauIC4ByocEaTZ8ng9V');
        break;
      }

      case 'p3nightsisters': {
        message.channel.send('https://docs.google.com/document/d/1uLDHEihCR71w1N7TByMxlh-WbQi8UArjQZRJJ9Qxpuc/edit');
        break;
      }

      case 'p4nightsisters': {
        message.channel.send('https://drive.google.com/open?id=1p5LlfkMVn8G-c8I6NusdWoMKGNozTXyl');
        break;
      }

      case 'nightsisters':
      case 'nightsister': {
        message.channel.send('https://docs.google.com/document/d/1uLDHEihCR71w1N7TByMxlh-WbQi8UArjQZRJJ9Qxpuc/edit');
        message.channel.send('https://drive.google.com/open?id=1p5LlfkMVn8G-c8I6NusdWoMKGNozTXyl');
        break;
      }

      case 'nihilusmatrix': {
        message.channel.send('https://drive.google.com/open?id=1k9pxWm2MwwuiJhxCDRdK-TGMyMg92mgd');
        break;
      }

      case 'p1': {
        // Check if this is a percentage or a raw number
        if (args.length && args[0].charAt(args[0].length - 1) === '%') {
          // convert to a decimal with 4 decimal places
          const percent = (parseFloat(args[0]) / 100).toFixed(4);
          message.channel.send(`${args[0]} is ${(46888776 * percent).toFixed(0)}`);
        } else if (typeof Number(args[0]) === 'number' && args[0] > 0) {
          let num = Number(args[0].replace(/\,/g, '')) / 46888776 * 100;
          message.channel.send(`${args[0]} is ${Math.round(num * 10) / 10}%`);
        } else if (args && args.length) {
          // If the user didn't send a percentage or number, need to catch the mistake.
          message.channel.send(`${args[0]} can't be converted.`);
        } else {
          message.channel.send('You forgot to enter a value!');
        }
        break;
      }

      case 'p2': {
        if (args.length && args[0].charAt(args[0].length - 1) === '%') {
          const percent = (parseFloat(args[0]) / 100).toFixed(4);
          message.channel.send(`${args[0]} is ${(52105585 * percent).toFixed(0)}`);
        } else if (typeof Number(args[0]) === 'number' && args[0] > 0) {
          let num = Number(args[0].replace(/\,/g, '')) / 52105585 * 100;
          message.channel.send(`${args[0]} is ${Math.round(num * 10) / 10}%`);
        } else if (args && args.length) {
          // If the user didn't send a percentage or number, need to catch the mistake.
          message.channel.send(`${args[0]} can't be converted.`);
        } else {
          message.channel.send('You forgot to enter a value!');
        }

        break;
      }

      case 'p3': {
        if (args.length && args[0].charAt(args[0].length - 1) === '%') {
          const percent = (parseFloat(args[0]) / 100).toFixed(4);
          message.channel.send(`${args[0]} is ${(38371455 * percent).toFixed(0)}`);
        } else if (typeof Number(args[0]) === 'number' && args[0] > 0) {
          let num = Number(args[0].replace(/\,/g, '')) / 38371455 * 100;
          message.channel.send(`${args[0]} is ${Math.round(num * 10) / 10}%`);
        } else if (args && args.length) {
          // If the user didn't send a percentage or number, need to catch the mistake.
          message.channel.send(`${args[0]} can't be converted.`);
        } else {
          message.channel.send('You forgot to enter a value!');
        }

        break;
      }

      case 'p4': {
        if (args.length && args[0].charAt(args[0].length - 1) === '%') {
          const percent = (parseFloat(args[0]) / 100).toFixed(4);
          message.channel.send(`${args[0]} is ${(33499537 * percent).toFixed(0)}`);
        } else if (typeof Number(args[0]) === 'number' && args[0] > 0) {
          let num = Number(args[0].replace(/\,/g, '')) / 33499537 * 100;
          message.channel.send(`${args[0]} is ${Math.round(num * 10) / 10}%`);
        } else if (args && args.length) {
          // If the user didn't send a percentage or number, need to catch the mistake.
          message.channel.send(`${args[0]} can't be converted.`);
        } else {
          message.channel.send('You forgot to enter a value!');
        }

        break;
      }

      case 'invite': {
        message.channel
            .send(`Use the following link (need server admin permissions):
https://discordapp.com/oauth2/authorize?client_id=${config.clientID}&scope=bot . For support, contact Tipster22#1021 on Discord`);
        break;
      }

      case 'readiness': {
        message.channel.send('https://sites.google.com/view/hsth-grg/home');
        break;
      }

      case 'prefix': {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) message.channel.send("This is not the command you are looking for, young padawan");

        if (!args[0]) message.reply(`Usage: ${prefix}prefix <desired prefix here>`);

        let prefixes = JSON.parse(fs.readFileSync(__dirname + "/data/prefixes.json", "utf8"));

        prefixes[message.guild.id] = {
          prefix: args[0]
        };

        fs.writeFile(__dirname + "/data/prefixes.json", JSON.stringify(prefixes), (err) => {
          if (err) console.log(err);
        });

        let sEmbed = new Discord.RichEmbed()
            .setColor("#FF9900")
            .setTitle("Prefex Set!")
            .setDescription(`Set to ${args[0]}`);

        message.channel.send(sEmbed);
        break;
      }

      default: {
        aiHandler.analyzeText(message, prefix);
        break;
      }
    }
  })().catch(console.log);

});

client.login(config.token);
