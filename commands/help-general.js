const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Comenzile legate de divertisment: ")
    .setDescription("")
    .addField("r!info", "Pentru a vedea informatii despre bot.") 
    .addField("r!level", "Pentru a vedea level-ul tau.") 
    .addField("r!serverinfo", "Pentru a vedea informatile serverului.")  
    .addField("r!mcping", "Pentru a vedea cati jucatori sunt pe un server de minecraft.")
    .addField("r!userinfo", "Pentru a vedea informatii despre un utilizator.")      
    .setColor(0x0000b2)   
    .setFooter("Beta 2.0.2")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help.general"
}