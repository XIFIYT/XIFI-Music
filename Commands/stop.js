const Discord = require("discord.js")

module.exports = {

    name : "stop",
    description : "Stop de la musique !",
    permission : "Aucune", 
    utilisation: "/stop",
    dm  : false,
    category : "🎵・Musique",
    options: [],

    async run(interaction) {

        const queue = await interaction.client.player.nodes.create(interaction.guild, {metadata: {message: interaction}})
        if(!queue.connection || !queue.node.isPlaying()) return interaction.reply("Le bot ne joue pas de musique !")

        queue.delete()
        await interaction.reply("J'arrête le son!")
    }
}