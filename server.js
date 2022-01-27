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

const { MessageEmbed } = require("discord.js");
client.on("guildCreate", guild => {
const created = moment(guild.createdAt).format('DD/MM/YY');
  let joinEmbed = new MessageEmbed()
  .setColor("#00C505")
  .setTitle(`J'ai été ajouté dans ${guild.name}`)
  .setThumbnail(guild.iconURL())
  .addFields({name: "Identifiant", value: `${guild.id}`},
             {name: "Nombre de membres", value: `${guild.memberCount}`},
             {name: "Description du serveur", value: `${guild.description || "Aucune description"}`},
             {name: "Date de création", value: `${created}`});
  
  
client.channels.cache.get('930361647040720937').send({ embeds: [joinEmbed]});
  console.log(`J'ai rejoint le serveur ${guild.name}, je suis maintenant dans ${client.guilds.cache.size} serveurs`);
  client.user.setActivity(`?help | ${client.guilds.cache.size} Serveurs`);
});

client.on("guildDelete", guild => {
  
const created = moment(guild.createdAt).format('DD/MM/YY');
  
  let leaveEmbed = new MessageEmbed()
  .setColor("#C50000")
  .setTitle(`J'ai été retirer de ${guild.name}`)
  .setThumbnail(guild.iconURL())
  .addFields({name: "Identifiant", value: `${guild.id}`},
             {name: "Nombre de membres", value: `${guild.memberCount}`},
             {name: "Description du serveur", value: `${guild.description || "Aucune description"}`},
             {name: "Date de création", value: `${created}`});

  
client.channels.cache.get('930361647040720937').send({ embeds: [leaveEmbed]});
  console.log(`J'ai quitté le serveur ${guild.name}, je suis maintenant dans ${client.guilds.cache.size} serveurs`);
});

client.login(process.env.DISCORD_TOKEN);
