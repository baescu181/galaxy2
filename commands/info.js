const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Info : ")
    .setDescription("")  
    .addField("Cum am fost creat ?", "Eu am fost creat de _Body in VSC.")
    .addField("Data in care am fost creat ?", "Am fost creat pe 07/06/18.")
    .addField("Cand a fost ultimul update ?", "Ultimul update a fost pe 27/10/18.")
    .setColor(0x0000b2)   
    .setFooter("Beta 2.0.2")  
    .setThumbnail(message.author.avatarURL)                                          
        message.channel.sendEmbed(embed);

}

module.exports.help = {
    name: "info"
}