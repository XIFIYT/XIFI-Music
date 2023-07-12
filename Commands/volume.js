const {  EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "volume",
    description: "Permet de jouer de la musique dans votre salon vocal",
    permission: "Aucune",
    utilisation: "/play [musique]",
    dm: false,
    category: "🎵・Musique",
    options: [
        {
            type: "integer",
            name: "volume",
            description: "Nom/URL de la musique",
            required: true,
            autocomplete: false
        }
    ],
   
    async run(interaction) {
        
        try {
            let volume  = interaction.options.getInteger(`volume`);
            if(volume > 250){ await interaction.channel.send(`Attention, un volume trop élevé peut abimer votre audition et le son peut saturer.`)}
     
          if(!interaction.member.voice.channel) return interaction.reply({ ephemeral: true, content: "Vous n'êtes pas dans  un salon vocal!" })
     
          if((await interaction.guild.members.fetchMe()).voice?.channel?.id !== interaction.member.voice?.channel?.id) return interaction.reply({ephemeral: true, content: "Vous n'êtes pas dans le même salon vocal que le bot!" });
     
          
          const queue = interaction.client.player.nodes.get(interaction.guild, {metadata: {interaction: interaction}})

          if(!queue || !queue.node.isPlaying()) return interaction.reply("Le bot ne joue pas de musique !");

          await queue.node.setVolume(volume)
     
          const QueueEmbed = new EmbedBuilder()
          .setTitle("Volume +-")
          .setColor("#ffffff")
          .setDescription(`🔊 - Le  volume est à présent à ${volume}%`);
    
          let but = new Discord.ActionRowBuilder().setComponents(
            new Discord.ButtonBuilder()
            .setCustomId(`Volume+`)
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel(`+`)
            .setDisabled(volume > 300 ? true : false),
            new Discord.ButtonBuilder()
            .setCustomId(`Volume-`)
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel(`-`)
            .setDisabled(volume < 25 ? true : false)
          )
     
          let msg = await interaction.reply({embeds: [QueueEmbed], components: [but]});
    
          const collector = msg.createMessageComponentCollector();
    
          collector.on(`collect`, async i =>{
    
    
            if(i.customId === `Volume+`) {
              volume += 5
              queue.node.setVolume(volume)
              const NewEmbed = new Discord.EmbedBuilder()
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }), url: 'https://discord.gg/njPT9Fysux' })
              .setColor("#ffffff")
              .setDescription(`🔊 - Le  volume est à présent à ${volume}%`);
              //i.reply({content: `Le volume est à présent à ${volume}%`, ephemeral: true})
              i.deferUpdate();
              await interaction.editReply({embeds: [NewEmbed], components: [but]})
    
            }
            if(i.customId === `Volume-`) {
              volume -= 5
              queue.node.setVolume(volume)
              const NewEmbed = new Discord.EmbedBuilder()
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }), url: 'https://discord.gg/njPT9Fysux' })
              .setColor("#fffffF")
              .setDescription(`🔊 - Le  volume est à présent à ${volume}%`);
              i.deferUpdate();
              interaction.editReply({embeds: [NewEmbed], components: [but]})
            }
    
          
          })
     
        }  catch (err) {
            if(!interaction.replied) {
          await interaction.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
            }
            else {
                await interaction.followUp({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
            }
        }
        }

    }
