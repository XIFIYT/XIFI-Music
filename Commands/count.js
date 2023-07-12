
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "counters",
  description: "Voir le nombre de serveur,membre",
  permission: "Aucune",
  dm: false,
  category: "🎵・Musique",

  async run(interaction) {
   

      const QueueEmbed = new EmbedBuilder()
        .setTitle("Nombre de serveur,membre")
        .setColor("#ffffff")
        .setDescription(`
        >  Nombre de Serveur** : \`${interaction.client.guilds.cache.size}\`
        >  Nombre de Membre: ** \`${await interaction.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\``)
        .setFooter({ text: "By XIFI" });

      await interaction.reply({ embeds: [QueueEmbed] });

    
    
  }
  }