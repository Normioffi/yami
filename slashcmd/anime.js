const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const kitsu = require('node-kitsu'); // Le pack de la source kitsu.io

// Débt du module.exports
module.exports = {
  data: new SlashCommandBuilder() // Création de la commande, le nom, la description de la commande et l'option de message de type STRING
    .setName("anime")
    .setDescription("Obtient des informations sur un animé")
    .addStringOption(option =>
		option.setName('nom')
			.setDescription('Le nom de l\'animé')
			.setRequired(true)),
  async execute(interaction) {
    
    const anname = interaction.options.getString('nom'); // Récupération du message venant de l'option 'nom" 
    
  // Début de la recherche de l'animé
    kitsu.searchAnime(anname, 0).then((results) => {
        let searchResult = results[0];
        if(!searchResult){
          interaction.reply({ content: "Aucun résultat", ephemeral: true }); // Si il y a aucun résultat.
        }else{
          var animeID = searchResult.id;
          var titleEn = searchResult.attributes.titles.en;
          if(!titleEn){ // Si il n'y a aucun titre anglais trouvé
              titleEn = "Aucun titre anglais trouvé.";
          }
          var titleJP = searchResult.attributes.titles.en_jp;
          if(!titleJP){ // Si il n'y a aucun titre en japonais trouvé
              titleJP = "Aucun titre japonais trouvé.";
          }
          var titleRoJP = searchResult.attributes.titles.ja_jp;
          if(!titleRoJP){ // Si il n'y a aucun titre en japonais (Rōmaji)
              titleRoJP = "Aucun titre japonais Rōmaji trouvé.";
          }
          var title = searchResult.attributes.canonicalTitle;
          if(!title){
            if(!titleEn){
                title = titleEn;
            }else if(!titleJP){
                title = titleJP;
            }else if (!titleRoJP){
                title = titleRoJP
            }else{ // Si il n'y a aucun titre de tout type
                title = "Aucun titre trouvé.";
            }
          }
          var synopsis = searchResult.attributes.synopsis;
          if(!synopsis){ // Si il n'y a aucun sypnosis
              synopsis = "Aucun sypnosis trouvé.";
          }
          var episodeCount = searchResult.attributes.episodeCount;
          if(!episodeCount){ // Si il n'y a aucun épisode
              episodeCount = "Inconnu";
          }
          var episodeLength = searchResult.attributes.episodeLength;
          if(!episodeLength){ // Si il n'y a aucun temps d'épisode
          	  episodeLength = "Inconnue";
          }
          var status = searchResult.attributes.status;
          var startDate = searchResult.attributes.startDate;
          if(!startDate){ // Si il n'y a aucune date de début
              startDate = "Date inconnue";
          }
          var endDate = searchResult.attributes.endDate;
          if(!endDate){ // Si il n'y a aucune date de fin
              endDate = "Date inconnue";
          }                    
          var smallPoster = searchResult.attributes.posterImage.small; // L'image de l'animé

		// Si le sypnosis fait plus que 700 caractère, il sera coupé et remplacer par "..."
          if(synopsis.length > 700){
              var synopsis = synopsis.substring(0, 700) + '...';
          }
		
          var statusUpper = status.charAt(0).toUpperCase() + status.substr(1).toLowerCase();

		// La création du résultat de la recherche et celui de l'intéraction
          let resultEmbed = new EmbedBuilder()
               .setTitle(title)
               .setColor('#fcfcc5')
               .setDescription("Status: "+statusUpper)
               .setImage(smallPoster)
               .setFooter({ text: "Source: Kitsu.io", iconURL: "https://avatars.slack-edge.com/2017-07-16/213464927747_f1d4f9fb141ef6666442_512.png"}) // Le footer est optionnel
               .setURL("https://kitsu.io/anime/"+animeID)
               .addFields({name: "Synopsis:", value: `${synopsis}`},
                          {name: "Nombre d'épisode:", value: `${episodeCount}`, inline: true},
                          {name: "Temps des épisodes:", value: `${episodeLength} Minutes`, inline: true},
                          {name: "Anglais:", value: `${titleEn}`, inline: true},
                          {name: "Japonais", value: `${titleJP}`, inline: true},
                          {name: "Japonais (Rōmaji)", value: `${titleRoJP}`, inline: true},
                          {name: "Commencé le:", value: `${startDate}`, inline: true},
                          {name: "Fini le:", value: `${endDate}`, inline: true});
          interaction.reply({ embeds: [resultEmbed]});
        } // Fin  du résultat
    });// Fin de la recherche de l'animé
    
  } // Fin de la réponse de l'intéraction
}; // Fin du module.exports
