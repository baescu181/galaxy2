const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Comenzile legate de nsfw: ")
    .setDescription("")
    .addField("r!pussy ", 'Pentru a vedea pussy.')  
    .setColor(0x0000b2)   
    .setFooter("Beta 2.0.2")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help.nsfw"
}