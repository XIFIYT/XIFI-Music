const { EmbedBuilder } = require("discord.js");
 
module.exports = {
 
    name: "pause",
    description: "Mettre en pause l'écoute d'une musique.",
    permission: "Aucune",
    dm: false,
    category: "🎵・Musique",
 
    async run(interaction) {
      try {
 
      if(!interaction.member.voice.channel) return interaction.reply({ ephemeral: true, content: "Pour utiliser cette commande tu dois rejoindre un salon vocal." })
 
      if((await interaction.guild.members.fetchMe()).voice?.channel?.id !== interaction.member.voice?.channel?.id) return interaction.reply({ephemeral: true, content: "Pour utiliser cette commande, le interaction.client et toi devez être dans le même salon vocal." });
 
      const queue = interaction.client.player.nodes.get(interaction.guild, {metadata: {message: interaction}})
 
      
 
      await queue.node.pause();
 
      const QueueEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }), url: 'https://discord.gg/LeLienDeTonServeurDISCORD' })
      .setColor("#ffffff")
      .setDescription("⏯️ **PAUSE** • La musique actuelle est mise en pause.");
 
      await interaction.reply({embeds: [QueueEmbed]});
 
    }  catch (err) {
      await interaction.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };