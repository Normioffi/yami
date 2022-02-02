const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Obtient mon lien d'invitation"),
  async execute(interaction) {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Lien')
					.setStyle('LINK')
          .setURL("<Lien-d'invitation>"),
			);
    await interaction.reply({ content: `Ajoute moi ici:`, components: [row] });
  },
};
