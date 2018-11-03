const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Link")
    .setDescription(`[Click aici pentru link](${'https://discordapp.com/oauth2/authorize?client_id=454019799513825321&scope=bot&permissions=2146827775'})`)
    .setColor("0x0000b2")

    message.channel.send({embed: embed})
}

module.exports.help = {
    name: "invite"
}