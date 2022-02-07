require('/app/deploy-commands.js'); // Pour lancer le code qui "enregistre" les commandes Slash
const fs = require('fs'); // pack pour naviguer dans les fichiers
const { Client, Collection, Intents } = require('discord.js'); // Le pack de Discord.Js

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); // Création du client et ses intents

client.commands = new Collection(); // Création de la collection

const commandSlFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js')); // Filtrage des commandes en .js(javascript) dans le dossier ./slashcmd

for (const file of commandSlFiles) {
	const scommand = require(`./slashcmd/${file}`);
  
	client.commands.set(scommand.data.name, scommand); // Récupération des commandes
}

client.once('ready', () => { // Quand le bot est prêt, il exécute le code si-dessous
	console.log('Bot prêt!');
  client.user.setActivity(`?help | ${client.guilds.cache.size} Serveurs`); // Ajout du status dès que le bot est prêt (Modifiable)
  
});

client.on('interactionCreate', async interaction => { // Quand une interaction est créé, il exécute le code si-dessous
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try { // Tente d'exécuter la commande dès qu'un utilisateur en a utilisé une
		await command.execute(interaction); // Il exécute la commande
	} catch (error) { // Si la commande a une erreur dans la commande, le message d'erreur sera renvoyé et vous serrez d'où viens l'erreur dans la console
		console.error(error);
		await interaction.deferReply({ content: 'Une erreur est survenue lors de l\'utilisation de la commande!', ephemeral: true });
	}
});

client.login(process.env.DISCORD_TOKEN); // Connexion du bot avec le token
