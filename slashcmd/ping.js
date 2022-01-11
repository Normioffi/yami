const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Obtient mon ping, et je te le renvoie en pong!"),
  async execute(interaction) {

    await interaction.reply({ content: `Ping pong: ${interaction.client.ws.ping}ms` });

  },
};
