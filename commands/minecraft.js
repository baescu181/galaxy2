const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    var request = require("request");
    var mcIP = (args[1]);
    var mcPort = "25565";
    if(!args[1]){
        return message.channel.send("Specifica o adresa ip.");
    }

    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
            request(url, function(err, response, body) {
                if(err) {
                    console.log(err);
                    return message.reply('Din pacate nu am putut gasi serverul.');;
                }
                body = JSON.parse(body);
                var status = 'Serverul este offline!';
                if(body.online) {
                    status = 'Serverul este online - ';
                    if(body.players.now) {
                        status += '' + body.players.now + ' jucatori sunt pe server.';
                    } else {
                        status += 'Nimeni nu se joaca pe server.';
                    }
                }
                message.reply(status);
            });
}
module.exports.help = {
    name: "mcping"
}