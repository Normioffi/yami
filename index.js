require("dotenv").config();
require('/app/deploy-commands.js'); // Pour lancer le code qui "enregistre" les commandes Slash
const fs = require('fs'); // pack pour naviguer dans les fichiers
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js'); // Le pack de Discord.Js
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates], partials: [Partials.Channel] }); // Création du client et ses intents
["commands", "cooldowns", "slashCommands"].forEach(x => client[x] = new Collection())

const { Player } = require("discord-player");
const player = new Player(client);


 const commandSlFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Filtrage des commandes en .js(javascript) dans le dossier ./slashcmd

for (const file of commandSlFiles) {
	const scommand = require(`./commands/${file}`);
  
	client.commands.set(scommand.data.name, scommand); // Récupération des commandes
}

const loadEvents = (dir = "./events/") => {
   fs.readdirSync(dir).forEach(dirs => {
        let events = fs.readdirSync(`./${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (let event of events) {
            let evt = require(`./${dir}/${dirs}/${event}`);
            let evtName = event.split(".")[0]
            client.on(evtName, evt.bind(null, client));
          console.log(`Evenement chargé: ${evtName}`)
        };
    });
};

loadEvents();


// player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))


/* const commands = fs.readdirSync("./message").filter(file => file.endsWith(".js"));
  for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./message/${file}`);

  console.log(`Commande enregistrée: ${commandName}`);
  client.commands.set(commandName, command);
*/


/* client.on('interactionCreate', async interaction => { // Quand une interaction est créé, il exécute le code si-dessous
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try { // Tente d'exécuter la commande dès qu'un utilisateur en a utilisé une
		await command.execute(interaction); // Il exécute la commande
	} catch (error) { // Si la commande a une erreur dans la commande, le message d'erreur sera renvoyé et vous serrez d'où viens l'erreur dans la console
		await interaction.reply({ content: 'Une erreur est survenue lors de l\'utilisation de la commande!', ephemeral: true });
    console.error(error);
		
	}
});
*/
client.login(process.env.DISCORD_TOKEN); // Connexion du bot avec le token
