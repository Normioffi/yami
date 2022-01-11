const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Renvoie les informations du serveur"),
  async execute(interaction, client) {

const dateCreated = moment(interaction.guild.createdAt);
    let serverEmbed = new MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle(interaction.guild.name)
    .setDescription(`**Propriétaire**: <@${interaction.guild.ownerId}>
    
    **Identifiant**: ${interaction.guild.id}
    
    **Membre**: ${interaction.guild.memberCount}
    
    **Nombre de Salon**: ${interaction.guild.channels.cache.size}
    
    **Nombre de Rôles**: ${interaction.guild.roles.cache.size}
    
    **Crée le**: ${dateCreated.format("DD/MM/YYYY LTS")}`);
    
    await interaction.reply({ embeds: [serverEmbed] });

  },
};
