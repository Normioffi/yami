const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const commands = [];

const commandSlFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'));

for (const file of commandSlFiles) {
	const command = require(`./slashcmd/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Commande Slash enregistrée avec succès!'))
	.catch(console.error);
