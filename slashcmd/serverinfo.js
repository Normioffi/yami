const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Renvoie les informations du serveur"),
  async execute(interaction) {

const dateCreated = moment(interaction.guild.createdAt);
    let serverEmbed = new MessageEmbed()
    .setColor('#fcfcc5')
    .setThumbnail(`${interaction.guild.iconURL() || "https://cdn.glitch.global/6b088ee7-7faa-4199-9d3f-68a689f34c09/discord-crashing~2.jpg"}`)
    .setTitle(interaction.guild.name)
    .setDescription(`**Propriétaire**: <@${interaction.guild.ownerId}>
    
    **Identifiant**: ${interaction.guild.id}
    
    **Membre**: ${interaction.guild.memberCount}
    
    **Nombre de Salons**: ${interaction.guild.channels.cache.size}
    
    **Nombre de Rôles**: ${interaction.guild.roles.cache.size}
    
    **Nombre de Boost**: ${interaction.guild.premiumSubscriptionCount}
    
    **Niveau**: ${interaction.guild.premiumTier}
    
    **Description**: ${interaction.guild.description || "Aucune description"}
    
    **Crée le**: ${dateCreated.format("DD/MM/YYYY LTS")}`);
    
    await interaction.reply({ embeds: [serverEmbed] });
    
   /* if (interaction.member.permissions.has("ADMINISTRATOR")) {
    let ephemeralEmbed = new MessageEmbed()
    .setColor('#fcfcc5')
    .setTitle("Information supplémentaire")
    .setDescription(`**Nombre de personnes bannis**: ${interaction.guild.bans.cache.size}
    
    **Nombre d'invitation**: ${interaction.guild.invites.cache.size}`);
      
      await interaction.followUp({ embeds: [ephemeralEmbed], ephemeral: true})
  } */
  
  },
};
