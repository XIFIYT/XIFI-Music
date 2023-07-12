const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
    name: "patchnote",
    description: "Voir la derniere mise a jour du bot",
    permission: "Aucune",
    dm: false,


    async run(interaction, message) {

        const embedhelp = new EmbedBuilder()
            .setTitle('New Version 0.1.4')
            .setDescription(`
            -> **PatchNote** 
            **New Commands ** :  volume pour choisir le volume de la musique
            **New logo **: ✅
            **New Couleur du bot**: ✅
            **New version discord-player**: ❌
            **Version du bot**: 0.1.4
            **New version ytdl-core**: ❌
            **New version discord.js**: ❌ 
            **New version node.js**: ✅
            **New image** : ✅ 
            **New patchnote**: \`\`\`yaml\nChangement de couleur du bot du logo et bug fixer au niveaux de play et nouvelle commande volume pour choisir le volume de la musique\`\`\`
            `)
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