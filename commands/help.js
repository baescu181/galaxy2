const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Alege o sectiune : ")
    .setDescription("")  
    .addField("r!help.general", "Pentru a vedea comenzile generale.")
    .addField("r!help.fun", "Pentru a vedea comenzile legate de distractie.")
    .addField("r!help.music ", 'Pentru a vedea comenzile legate de muzica.')
    .addField("r!help.admin", "Pentru  a vedea comenzile legate de admin.")
    .addField("r!help.nsfw", "Pentru  a vedea comenzile legate de nsfw.")
    .addField("r!invite", "Pentru link-ul de invite.") 
    .setColor(0x0000b2)   
    .setFooter("Beta 2.0.2")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
}