const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const kitsu = require('node-kitsu');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("amg")
    .setDescription("Obtient des informations sur un animé ou un manga")
  .addStringOption(option =>
		option.setName('type')
			.setDescription('Le type (anime/manga)')
      .addChoice('Anime', 'type_anime')
      .addChoice('Manga', 'type_manga')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('nom')
			.setDescription('Le nom de l\'anime/manga')
			.setRequired(true)),
  async execute(interaction) {
    
    const amname = interaction.options.getString('nom');
    const typeam = interaction.options.getString('type');
    
    if (typeam === "type_anime") {
    kitsu.searchAnime(amname, 0).then((results) => {
        let searchResult = results[0];
        if(!searchResult){
          interaction.reply({ content: "Aucun résultat", ephemeral: true });
        }else{
          var animeID = searchResult.id;
          var titleEn = searchResult.attributes.titles.en;
          if(!titleEn){
              titleEn = "Aucun titre anglais trouvé."
          }
          var titleJP = searchResult.attributes.titles.en_jp;
          if(!titleJP){
              titleJP = "Aucun titre japonais trouvé."
          }
          var title = searchResult.attributes.canonicalTitle;
          if(!title){
            if(!titleEn){
                title = titleEn;
            }else if(!titleJP){
                title = titleJP;
            }else{
                title = "Aucun titre trouvé.";
            }
          }
          var synopsis = searchResult.attributes.synopsis;
          if(!synopsis){
              synopsis = "Aucun sypnosis trouvé.";
          }
          var episodeCount = searchResult.attributes.episodeCount;
          if(!episodeCount){
              episodeCount = "Inconnu";
          }
          var episodeLength = searchResult.attributes.episodeLength;
          if(!episodeLength){
          	  episodeLength = "Inconnu";
          }
          var status = searchResult.attributes.status;
          var startDate = searchResult.attributes.startDate;
          if(!startDate){
              startDate = "Inconnu";
          }
          var endDate = searchResult.attributes.endDate;
          if(!endDate){
              endDate = "Inconnu";
          }                    
          var smallPoster = searchResult.attributes.posterImage.small;

          //If the synopsis is longer then 700 characters cut it off and add "..."
          //So the post doesn't become to long.
          if(synopsis.length > 700){
              var synopsis = synopsis.substring(0, 700) + '...';
          }
          //The Status returns lowercase "finished", This transforms it into "Finished"
          var statusUpper = status.charAt(0).toUpperCase() + status.substr(1).toLowerCase();

          const resultEmbed = new MessageEmbed()
               .setTitle(title)
               .setColor('#fcfcc5')
               .setDescription("Status: "+statusUpper)
               .setImage(smallPoster)
               .setFooter("Source: Kitsu.io", "https://avatars.slack-edge.com/2017-07-16/213464927747_f1d4f9fb141ef6666442_512.png")
               .setURL("https://kitsu.io/anime/"+animeID)
               .addFields({name: "Synopsis:", value: `${synopsis}`},
                          {name: "Nombre d'épisode:", value: `${episodeCount}`, inline: true},
                          {name: "Temps des épisodes:", value: `${episodeLength} Minutes`, inline: true},
                          {name: "Anglais:", value: `${titleEn}`, inline: true},
                          {name: "Japonais", value: `${titleJP}`, inline: true},
                          {name: "Commencé le:", value: `${startDate}`, inline: true},
                          {name: "Fini le:", value: `${endDate}`, inline: true});
          interaction.reply({ embeds: [resultEmbed]});
        }//END if !searchresults
    });//END searchAnime
      
  }; // END if anime type
    
    if (typeam === "type_manga") {
        kitsu.searchManga(amname, 0).then(results => {
        let searchResult = results[0];
        if(!searchResult){
          interaction.reply({ content: "Aucun résultat."});
        }else{
          var mangaID = searchResult.id;
          var titleEn = searchResult.attributes.titles.en;
          if(!titleEn){
              titleEn = "Aucun titre anglais trouvé."
          }
          var titleJP = searchResult.attributes.titles.en_jp;
          if(!titleJP){
              titleJP = "Aucun titre Japonais trouvé"
          }
          var title = searchResult.attributes.canonicalTitle;
          if(!title){
            if(!titleEn){
                title = titleEn;
            }else if(!titleJP){
                title = titleJP;
            }else{
                title = "Aucun titre trouvé.";
            }
          }
          var synopsis = searchResult.attributes.synopsis;
          if(!synopsis){
              synopsis = "Aucun synopsis trouvé.";
          }
          var chapterCount = searchResult.attributes.chapterCount;
          if(!chapterCount){
              chapterCount = "Inconnu";
          }
          var volumeCount = searchResult.attributes.volumeCount;
          if(!volumeCount){
          	  volumeCount = "Inconnu";
          }
          var serialization = searchResult.attributes.serialization;
          if(!serialization){
          	  serialization = "Inconnu";
          }
          var status = searchResult.attributes.status;
          var startDate = searchResult.attributes.startDate;
          if(!startDate){
              startDate = "Inconnu";
          }
          var endDate = searchResult.attributes.endDate;
          if(!endDate){
              endDate = "Inconnu";
          }                    
          var smallPoster = searchResult.attributes.posterImage.small;

          //If the synopsis is longer then 700 characters cut it off and add "..."
          //So the post doesn't become to long.
          if(synopsis.length > 700){
              var synopsis = synopsis.substring(0, 700) + '...';
          }
          //The Status returns lowercase "finished", This transforms it into "Finished"
          var statusUpper = status.charAt(0).toUpperCase() + status.substr(1).toLowerCase();

          let resultEmbed = new MessageEmbed()
               .setTitle(title)
               .setColor('#fcfcc5')
               .setDescription("Status: "+statusUpper)
               .setFooter("Source: Kitsu.io", "https://avatars.slack-edge.com/2017-07-16/213464927747_f1d4f9fb141ef6666442_512.png")
               .setImage(smallPoster)
               .setURL("https://kitsu.io/anime/"+mangaID)
               .addFields({name: "Synopsis:", value: `${synopsis}`},
                          {name: "Magazine:", value: `${serialization}`},
                          {name: "Chapitre:", value: `${chapterCount}`, inline: true},
                          {name: "Volume:", value: `${volumeCount}`, inline: true},
                          {name: "Anglais:", value: `${titleEn}`, inline: true},
                          {name: "Japonais", value: `${titleJP}`, inline: true},
                          {name: "Commencé le:", value: `${startDate}`, inline: true},
                          {name: "Fini le:", value: `${endDate}`, inline: true});
          
               interaction.reply({ embeds: [resultEmbed]});
        }//END if !searchresults
    });//END searchManga
  }//END if manga type
    
  } // END Reply
}; // END Module
