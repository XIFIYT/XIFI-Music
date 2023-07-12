const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require("./config");
const Player = require('discord-player');

console.log(`

██╗  ██╗██╗███████╗██╗    ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗ ██╗   ██╗███████╗
╚██╗██╔╝██║██╔════╝██║    ████╗ ████║██║   ██║██╔════╝██║██╔═══██╗██║   ██║██╔════╝
 ╚███╔╝ ██║█████╗  ██║    ██╔████╔██║██║   ██║███████╗██║██║   ██║██║   ██║█████╗  
 ██╔██╗ ██║██╔══╝  ██║    ██║╚██╔╝██║██║   ██║╚════██║██║██║▄▄ ██║██║   ██║██╔══╝  
██╔╝ ██╗██║██║     ██║    ██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╔╝╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝╚═╝     ╚═╝    ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝                                                                                              `)

bot.commands = new Discord.Collection();

bot.login(config.token)


bot.player = new Player.Player(bot, {
  leaveOnEnd: true,
  leaveOnEmpty: true,
  initialVolume: 100,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  },
})



loadCommands(bot, process.cwd() + '/Commands');
loadEvents(bot);






process.on("unhandledRejection", (reason, p) => {
  console.log(" [AntiCrash] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [AntiCrash] :: Multiple Resolves");
  console.log(type, promise, reason);
}); 
