const fs = require('fs'); // Le pack pour naviguer dans les fichiers
const { SlashCommandBuilder } = require('@discordjs/builders'); // Le pack pour créé et enregistré les commandes Slash
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json'); // Récupérer l'identifiant du bot et celui du serveur de développement

const commands = [];

const commandSlFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js')); // Filtrage des commandes en .js(javascript)

for (const file of commandSlFiles) {
	const command = require(`./slashcmd/${file}`); // Récupération des fichiers
	commands.push(command.data.toJSON()); // Lancement des commandes
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }) // enregistrements des commandes
	.then(() => console.log('Commande Slash enregistrée avec succès!'))
	.catch(console.error);
