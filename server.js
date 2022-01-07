require('/app/deploy-commands.js');
const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandSlFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'));

for (const file of commandSlFiles) {
	const scommand = require(`./slashcmd/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(scommand.data.name, scommand);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
