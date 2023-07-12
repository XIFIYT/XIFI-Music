
const { DiscordPlayerQueryResultCache } = require("discord-player");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "play",
    description: "Permet de jouer de la musique dans votre salon vocal",
    permission: "Aucune",
    utilisation: "/play [musique]",
    dm: false,
    category: "🎵・Musique",
    options: [
        {
            type: "string",
            name: "musique",
            description: "Nom/URL de la musique",
            required: true,
            autocomplete: false
        }
    ],

    async run(interaction) {

        try {

            const musique = interaction.options.getString("musique");
            if (!interaction.member.voice.channel) return interaction.reply("Vous n'êtes pas dans un salon vocal.");

            await interaction.deferReply()

            const queue = interaction.client.player.nodes.create(interaction.guild, { metadata: { message: interaction } });

            const track = await interaction.client.player.search(musique, { requestedBy: interaction.user }).then(track => track.tracks[0]);
            if (!track) return interaction.followUp("Il n'y a pas de musique avec ce nom.");

            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            await queue.node.play(track);

            const button2 = new ButtonBuilder()
                .setLabel(`${track.title}`)
                .setURL(`${track.url}`)
                .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder()
                .addComponents(button2);

            const QueueEmbed = new EmbedBuilder()
                .setTitle(`${track.title}`)
                .setDescription(`La musique  est ajouter a la queue et va etre jouer d'ici peu`)
                .setColor("#ffffff")
                .setFooter({ text: "By XIFI" })
                .setURL(`${track.url}`)
               
            
                
                
            const Embedatt = new EmbedBuilder()
                .setDescription(`La musique \`${track.title}\` est en train de charges`)
                .setColor("#ffffff")
               

            
            await interaction.followUp({ embeds: [Embedatt] })
            await interaction.followUp({ embeds: [QueueEmbed], components: [row] });

        } catch (err) {
            await interaction.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
            console.error(err);
        }
    }
}