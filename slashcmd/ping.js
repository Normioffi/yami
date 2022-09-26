const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Obtient mon ping, et je te le renvoie en pong!"),
  async execute(interaction) {

    await interaction.reply({ content: `Pong🏓: ${interaction.client.ws.ping}ms` });

  },
};
