const { InteractionType } = require("discord.js");


module.exports = async (bot, interaction) => {
    if(interaction.type === InteractionType.ApplicationCommand) {

        const command = bot.commands.get(interaction.commandName);
        command.run(interaction);
    }
}