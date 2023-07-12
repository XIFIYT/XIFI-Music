const { ActivityType } = require("discord.js");
const loadSlashCommands = require("../Loaders/loadSlashCommands");


module.exports = async bot =>{

    await loadSlashCommands(bot);
    console.log(`${bot.user.tag} est connecté!`);
    bot.user.setActivity({name: bot.user.username,  type: ActivityType.Streaming, url: "https://twitch.tv/xf_engine"});
}