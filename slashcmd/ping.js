const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Renvoie Pong!'),
	async execute(interaction) {

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Pong!')
			.setDescription('Tu veux faire une partie :eyes:?');
    
	},
};
