const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 1000;
    let difference = nxtLvlXp - curxp;

    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(0x0000b2)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} XP pana la nivelul urmator.`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
    
}

module.exports.help = {
    name: "level"
}