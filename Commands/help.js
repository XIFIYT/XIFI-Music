const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
    name: "help",
    description: "Liste des commandes",
    permission: "Aucune",
    dm: false,


    async run(interaction, message) {

        const embedhelp = new EmbedBuilder()
            .setTitle('Liste des commandes')
            .setDescription(`
            
            
            **</back:1125367347528617985>**,**</counters:1125382566904602725>**,**</patchnote:1125393447994535977>**,**</pause:1125367347528617986>**,**</play:1125373401981255743>**
            **</resume:1125373402472001566>**,**</shuffle:1125373402472001567>**,**</skip:1125373402472001568>**,**</stop:1125373402472001569>**,**</volume:1125393447994535978>**`)
            .setColor("#ffffff")
            .setImage("https://cdn.discordapp.com/attachments/958336983858544650/1125440272134832231/Capture_decran_2023-07-03_141833.png")
            .setFooter({ text: "By XIFI" })

            const button2 = new ButtonBuilder()
            .setLabel(`XIFI Music | Support`)
            .setURL(`https://discord.gg/GJFCX8Tdkk`)
            .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder()
            .addComponents(button2);


      

        await interaction.reply({ embeds: [embedhelp], components : [row]});

    }
}