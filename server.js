require('/app/deploy-commands.js');
const fs = require('fs');

const moment = require('moment');

const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandSlFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'));

for (const file of commandSlFiles) {
	const scommand = require(`./slashcmd/${file}`);
  
	client.commands.set(scommand.data.name, scommand);
}

client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity(`?help | ${client.guilds.cache.size} Serveurs`);
  
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.deferReply({ content: 'Une erreur est survenue lors de l\'utilisation de la commande!', ephemeral: true });
	}
});

client.login(process.env.DISCORD_TOKEN);
