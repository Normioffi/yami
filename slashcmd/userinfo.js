const { EmbedBuilder,  SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Renvoie les informations d'un utilisateur")
    .addUserOption(option =>
     option.setName('cible')
    .setDescription('La cible pour obtenir ses informations')
    .setRequired(false)),
  async execute(interaction) {

    const user = interaction.options.getUser('cible') || interaction.user;
    
const dateCreated = moment(user.createdAt);
const dateJoined = moment(user.joinedAt);
    
    let userEmbed = new EmbedBuilder()
    .setColor("#ffffff")
    .setThumbnail(user.displayAvatarURL())
    .setTitle(user.tag)
    .setDescription(`**Identifiant**: ${user.id}
    
**Pseudo**: ${user.nickname || "Pas de pseudo"}
    
**Rejoint le**: ${dateJoined.format("DD/MM/YYYY LTS")}
    
**Crée le**: ${dateCreated.format("DD/MM/YYYY LTS")}`);
    
    await interaction.reply({ embeds: [userEmbed] });
    
   /* if (interaction.member.permissions.has("ADMINISTRATOR")) {
    let ephemeralEmbed = new EmbedBuilder()
    .setColor('#fcfcc5')
    .setTitle("Information supplémentaire")
    .setDescription(`**Nombre de personnes bannis**: ${interaction.guild.bans.cache.size}
    
    **Nombre d'invitation**: ${interaction.guild.invites.cache.size}`);
      
      await interaction.followUp({ embeds: [ephemeralEmbed], ephemeral: true})
  } */
  
  },
};
 
