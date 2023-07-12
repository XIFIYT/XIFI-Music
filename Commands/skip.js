const { EmbedBuilder } = require("discord.js");
 
module.exports = {
 
    name: "skip",
    description: "Écouter la musique suivante.",
    permission: "Aucune",
    dm: false,
    category: "🎵・Musique",
 
    async run(interaction) {
      try {
 
      if(!interaction.member.voice.channel) return interaction.reply({ ephemeral: true, content: "Pour utiliser cette commande tu dois rejoindre un salon vocal." })
 
      if((await interaction.guild.members.fetchMe()).voice?.channel?.id !== interaction.member.voice?.channel?.id) return interaction.reply({ephemeral: true, content: "Pour utiliser cette commande, le bot et toi devez être dans le même salon vocal." });
 
      const queue = interaction.client.player.nodes.get(interaction.guild, {metadata: {message: interaction}})
 
      if (!queue || !queue.node.isPlaying())
      return interaction.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });
 
      await queue.node.skip();
 
      const QueueEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }), url: 'https://discord.gg/LeLienDeTonServeurDISCORD' })
      .setColor("#ffffff")
      .setDescription("⏩ **SKIP** • La musique actuelle a été passée.");
 
      await interaction.reply({embeds: [QueueEmbed]});
 
    }  catch (err) {
        console.error(err)
      await interaction.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };