const Discord = require("discord.js");
const r = require("nraw");
const Reddit = new r("Snowbot");

module.exports.run = async (bot,message,args) => {
    if(!message.channel.nsfw){
    Reddit.subreddit("cat").random().exec(function(post){
      let nonsfw = new Discord.RichEmbed()
      .setColor("0x0000b2")
      .setTitle("No NSFW is allowed in this channel,")
      .setDescription("but enjoy this pussy :cat:")
      .setImage(post[0].data.children[0].data.url);

      return message.channel.send(nonsfw);
    })
  }else{
Reddit.subreddit("pussy").random().exec(function(post){
    let msg = new Discord.RichEmbed()
    .setTitle(":ok_hand: :sweat_drops:")
    .setImage(post[0].data.children[0].data.url)
    .setFooter(`Requested by ${message.member.user.tag} at ${message.createdAt.toDateString()}`);

    message.channel.send(msg);
  })
  }
}

module.exports.help = {
  name: "pussy"
}