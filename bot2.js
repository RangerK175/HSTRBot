// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`!help for help. Bot serving ${client.users.size} users, in ${client.channels.size} channels`);

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  // client.user.setActivity(`Serving ${client.guilds.size} servers`);
  // message.channel.send(' \n \
  //     Welcome, this bot provides content from the HSTR Project. Below are commands to retrieve information. To read the guide and get advice from the community, join here: https://discord.gg/yPchf8r \n \
  //     Bot is maintained by TheNo0b#9329, directly contact or tag in the Discord server for bugs/suggestions \
  //     **!teamslist**: Display the full reccomended HSTR teams list \n \
  //     **!jtr**: display the P1 JTR battlecard.\n \
  //     **!p1jedi**: display the P1 Jedi battlecard \n \
  //     **!p2jedi**: display the P2 Jedi battlecard \n \
  //     **!phoenix**: display the P2 Phoenix battlecard \n \
  //     **!leia**: display the P2 Machine Gun Leia battlecard \n \
  //     **!churchofnute**: display the P2 Church of Nute battlecard \n \
  //     **!chexmix**: display the P3 Chex Mix battlecard \n \
  //     **!yolorolo**: display the P3 YOLO ROLO battlecard \n \
  //     **!nihilusmatrix**: display matrix to understand how Nihilus attacks \n \
  //     **!nightsisters**: display the P4 Nightsisters battlecard (strategy applicable to P2 and P3 too) \n \
  //     **!p1 [number]**: Convert damage score to percent of boss health in P1 \n \
  //     **!p2 [number]**: Convert damage score to percent of boss health in P2 \n \
  //     **!p3 [number]**: Convert damage score to percent of boss health in P3 \n \
  //     **!p4 [number]**: Convert damage score to percent of boss health in P4 \n \
  //     ');
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  // client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if (command === 'help' || command ==='h') {
    message.channel.send(' \n \
      Welcome, this bot provides content from the HSTR Project. Below are commands to retrieve information. To read the guide and get advice from the community, join here: https://discord.gg/yPchf8r \n \
      Bot is maintained by TheNo0b#9329, directly contact or tag in the Discord server for bugs/suggestions \n \
      **!teamslist**: Display the full reccomended HSTR teams list \n \
      **!jtr**: display the P1 JTR battlecard.\n \
      **!p1jedi**: display the P1 Jedi battlecard \n \
      **!p2jedi**: display the P2 Jedi battlecard \n \
      **!phoenix**: display the P2 Phoenix battlecard \n \
      **!leia**: display the P2 Machine Gun Leia battlecard \n \
      **!churchofnute**: display the P2 Church of Nute battlecard \n \
      **!chexmix**: display the P3 Chex Mix battlecard \n \
      **!yolorolo**: display the P3 YOLO ROLO battlecard \n \
      **!nihilusmatrix**: display matrix to understand how Nihilus attacks \n \
      **!nightsisters**: display the P4 Nightsisters battlecard (strategy applicable to P2 and P3 too) \n \
      **!p1 [number]**: Convert damage score to percent of boss health in P1 \n \
      **!p2 [number]**: Convert damage score to percent of boss health in P2 \n \
      **!p3 [number]**: Convert damage score to percent of boss health in P3 \n \
      **!p4 [number]**: Convert damage score to percent of boss health in P4 \n \
      **!invite**: Invite the bot to your Discord server \n \
      **!readiness** (coming soon!): Breaks down how ready your guild is for each HSTR phase, and analyzes which guild members need to strengthen which squads for phases that you are not ready for.  \n \
      ');
  }
  if(command=="teamslist") {
    message.channel.send('https://cdn.discordapp.com/attachments/477060596832010242/477497563650457605/Screen_Shot_2018-08-10_at_11.24.25_PM.png');
  }
  if(command=="jtr") {
    message.channel.send('https://drive.google.com/file/d/1_JBnmHFMHqzLWdx1i7NLc0lHQop267d1/view');
  }
  if(command=="p1jedi" || command=="yoda" || command=="gmyoda") {
    message.channel.send('https://drive.google.com/file/d/1l9_kGeyo8XzdEhzwyeoiHmK27TZ7z__-/view?usp=drivesdk');
  }
  if(command=="p2jedi" || command=="bastilla") {
    message.channel.send('https://drive.google.com/open?id=1Z06JomJBransHh8MDl7ikQKsn_J383st');
  }
  if(command=="leia" || command=="machinegunleia") {
    message.channel.send('https://drive.google.com/open?id=1zRxBz7r5qOS-G9WCsz3PHHSz6VRNmLzt');
  }
  if(command=="churchofnute" || command=="nute") {
    message.channel.send('https://drive.google.com/open?id=1p3w7EFQHNllxcvGP5uE37xaKgJLe-V02');
  }
  if(command=="phoenix") {
    message.channel.send('https://drive.google.com/open?id=1FhGBkqX4LOueRMKxVs5dIXvLAEL7PhB9');
  }
  if(command=="chexmix") {
    message.channel.send('https://drive.google.com/open?id=1Pg1goUW-bRebWd8nzJ9es8nF0Nk4S9KC');
  }
  if(command=="yolorolo") {
    message.channel.send('https://drive.google.com/open?id=1fWZPMJZ1YDDgbyauIC4ByocEaTZ8ng9V');
  }
  if(command=="nightsisters" || command=="nightsister") {
    message.channel.send('https://drive.google.com/open?id=1p5LlfkMVn8G-c8I6NusdWoMKGNozTXyl');
  }
  if(command=="nihilusmatrix") {
    message.channel.send('https://drive.google.com/open?id=1k9pxWm2MwwuiJhxCDRdK-TGMyMg92mgd');
  }
  if(command=="p1") {
    var num = Number(args[0].replace(/\,/g,'')) / 46888776 * 100;
    var scorepercent = Math.round( num * 10) / 10  + "%";
    message.channel.send(scorepercent);
  }

  if(command=="p2") {
    var num = Number(args[0].replace(/\,/g,'')) / 52105585 * 100;
    var scorepercent = Math.round( num * 10) / 10 + "%";
    message.channel.send(scorepercent);
  }
  if(command=="p3") {
    var num = Number(args[0].replace(/\,/g,'')) / 38371455 * 100;
    var scorepercent = Math.round( num * 10) / 10 + "%";
    message.channel.send(scorepercent);
  }
  if(command=="p4") {
    var num = Number(args[0].replace(/\,/g,'')) / 33499537 * 100;
    var scorepercent = Math.round( num * 10) / 10 + "%";
    message.channel.send(scorepercent);
  }
  if(command=="invite") {
    message.channel.send("Use the following link (need server admin permissions): https://discordapp.com/oauth2/authorize?client_id=476374210122612747&scope=bot . For support, contact TheNo0b#9329 on Discord")
  }
  if(command=="readiness") {
    message.channel.send("coming soon, stay tuned!")
  }
  else {
    message.channel.send("invalid command");
  }
});

client.login(config.token);