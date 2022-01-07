const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
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
    
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Choisi ici!')
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'Oui',
							description: 'Faire une partie de ping pong',
							value: 'yes_game',
						},
						{
							label: 'Non',
							description: 'Ne pas faire une partie',
							value: 'no_game',
						}
					]),
			);
		await interaction.reply({ embeds: [embed], components: [row] });
	
    if (interaction.customId === 'select') {
        let choice = interaction.values[0] 
     if(choice === 'yes_game'){
       await interaction.reply({ content: 'Ok, tu commence!', embeds: [] })
        }
    else if(choice === 'no_game'){
       
       await interaction.reply({ content: 'Bon bah la prochaine fois.', embeds: [] })
    }
	}
	},
};
