const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Informatii despre utilizator")
        .setColor("#0000b2")
        .addField("Nume Complet", message.author.tag)
        .addField("ID",  message.author.id)
        .addField("Creat pe", message.author.createdAt);

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "userinfo"
}