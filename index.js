const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyDUmo-BtB5oQr5Y3RSgYYBMj9rFKMr-W2s";
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const db = require('quick.db');
let xp = require("./xp.json");
let coins = require("./coins.json");


const prefix = botconfig.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Nu sunt comenzi de incarcat!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} incarcat!`);
        bot.commands.set(props.help.name, props);
    });
    function play(connection, message) {
        var server = servers[message.guild.id];
    
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    
        server.queue.shift();
    
        server.dispatcher.on("end", function() {
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
        });
};

bot.on("ready",async () => {
    console.log(`${bot.user.username} este online pe ${bot.guilds.size} servere!`);
    console.log(bot.commands);
    bot.user.setStatus("dnd");
    bot.user.setGame("Galaxy 2.0.2 | r!help");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
var args3 = message.content.substring(prefix.length).split(" ");

if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coin adaugat!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  bot.on("guildMemberAdd", async member => {

    // let config = JSON.parse(fs.readFileSync("./sconfig.json", "utf8"));
    // if(!config[member.guild.id]){
    //   config[member.guild.id] = {
    //     welcomemessage: "%member% joined the snow party!",
    //     leavemessage: "%member% left the snow party!",
    //     wlchannel: "",
    //     wlenable: "false"
    //   };
    //   fs.writeFile("./sconfig.json", JSON.stringify(config), (err) => {
    //     if (err) console.log(err)
    //   });
    // }
  
    con.query(`SELECT * FROM config WHERE id = '${member.guild.id}'`, (err, rows) => {
      if(err) throw err;
  
      let sql;
  
      if(rows == "") {
        sql = `INSERT INTO config (id, wm, lm, wl, wle, logs, logse) VALUES ('${member.guild.id}', '%member% joined the snow party!', '%member% left the snow party!', 'in-out', 'false', 'logs', 'false')`
              con.query(sql);
      } else {
        let wm = rows[0].wm;
        let lm = rows[0].lm;
        let wl = rows[0].wl;
        let wle = rows[0].wle;
        let logs = rows[0].logs;
        let logse = rows[0].logse;
        if(wle == "false") return;
        let wlc = member.guild.channels.find(`name`, wl);
        wlm = wm.replace("%member%", `${member}`);
        wlc.send(wlm);
      }
    });
  
    if(member.guild.id == "452200441321750529"){
      let gRole = member.guild.roles.find(`name`, "Guest");
      member.addRole(gRole.id);
    }
  });

    let xpAdd = Math.floor(Math.random() *7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 1000;
    xp[message.author.id].xp = curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle("Ai trecut la nivelul urmator !")
        .setColor("0x0000b2")
        .addField("Level nou", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(10000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });

    bot.on("guildMemberAdd", member => {
        let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
        if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
            autorole[member.guild.id] = {
                autorole: botconfig.autorole
            };
        }
        var role = autorole[member.guild.id].role;
        if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
        member.addRole(role);
    });
    
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args2 = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);


    switch (args3[0].toLowerCase()) {
        case "8ball":
        if (args[1]) message.channel.sendMessage(fortune[Math.floor(Math.random() * fortune.length)]);
        else message.channel.sendMessage("Ai uitat sa pui si o intrebare.");
        break;
        case "say":
        let text = args.slice(1).join(" ");
        message.delete();
        message.channel.send(text);
        break;
        case "sanse":
        let obiect1 = args[1];
        if(!obiect1) {
            var E14 = new Discord.RichEmbed()
            .setColor("#0xff0000")
            .addField("Model", "r!sanse <Obiect1> + <Obiect2>")
            .setTimestamp();
            return message.channel.sendMessage(E14); 
        };
        let obiect2 = args[2];
        if(!obiect2) {
        var E15 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Model", "r!sanse <Obiect1> + <Obiect2>")
            .setTimestamp();
            return message.channel.sendMessage(E15); 
        };

        var E16 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Sanse", `${obiect1}` + " + " + `${obiect2}` + " se potrivesc in poportie de " + r1[Math.floor(Math.random() * r1.length)])
            .setTimestamp();
            message.channel.sendMessage(E16); 
        break;
        case "meme":
            return message.channel.send( r3[Math.floor(Math.random() * r3.length)] );
        break;
        case "gay":  
        var E1 = new Discord.RichEmbed()
        .setColor("0xff0000")
        .addField("Informatii: ", message.author.username + " este gay in proportie de " + r1[Math.floor(Math.random() * r1.length)])
        .setTimestamp();
        message.channel.sendMessage(E1); 
        break; 
        case "play":
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            var E31 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E31);
        };;
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);  
                await handleVideo(video2, message, voiceChannel, true); 
            }
                var E31 = new Discord.RichEmbed()
                .setColor("0xff0000")
                .addField("✅ Playlist:", `**${playlist.title}** a fost adaugata in playlist`)
                .setTimestamp();
            return message.channel.send(E31);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 3);
                    let index = 0;
                    var E32 = new Discord.RichEmbed()
                .setColor("0xff0000")
                .addField("Top 3 videoclipuri gasite:", `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Scire pe chat numarul corespunzator videoclipului pe care vrei sa il asculti `)
                .setTimestamp();
                    message.channel.send(E32);
                    try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 30000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        var E33 = new Discord.RichEmbed()
                        .setColor("0xff0000")
                        .addField("Eroare", "Timpul a expiart sau nu ai pus un numar")
                        .setTimestamp();
                         return message.channel.send(E33);
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    var E34 = new Discord.RichEmbed()
                    .setColor("0xff0000")
                    .addField("Eroare", "Mention owener")
                    .setTimestamp();
                return message.channel.send(E34);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
            break;
        case "skip" :
        const voiceChannel2 = message.member.voiceChannel;
    if (!voiceChannel2) {
        var E31 = new Discord.RichEmbed()
        .setColor("0xff0000")
        .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
        .setTimestamp();
    return message.channel.send(E31);
    };
    if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.')
		serverQueue.connection.dispatcher.end('Skip command has been used!')
        return undefined;
            break;
        case "stop" :
        if (!message.member.voiceChannel) {
            var E38 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E38);
        }
        if (!serverQueue) {
            var E40 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Galaxy nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E40);
        }
            serverQueue.songs = [];
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                var E39 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Galaxy s-a deconectat",":x:")
            .setTimestamp();
            message.channel.sendMessage(E39);       
            break;
        case "volume" :
        if (!message.member.voiceChannel) {
            var E41 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E41);
        }
		if (!serverQueue) {
            var E42 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Galaxy nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E42);
        }
        if (!args[1]) {
            var E40 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Volum:", `Volumul actiual este **${serverQueue.volume}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        {
            var E40 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Volum:", `Volumul a fost setat la **${args[1]}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
            break;
        case "now-playing" :
        if (!serverQueue) {
            var E44 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E44);
        }
            var E45 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Now playing:", `**${serverQueue.songs[0].title}**`);
            return message.channel.send(E45);
            break;
        case "playlist" :
        if (!serverQueue) {
            var E43 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E43);
        }
        var E45 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("**Playlist:**", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
            
**Now playing:** ${serverQueue.songs[0].title}
                    `);
            return message.channel.send(E45);
            break;
        case "pause" :
        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
                var E47 = new Discord.RichEmbed()
                .setColor("0xff0000")
                .addField("Pause", ` ${serverQueue.songs[0].title} a fost pus pe pauza`)
                .setTimestamp();
                return message.channel.send(E47);
		}
            var E46 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Galaxy nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E46);
            break;
        case "resume" :
        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            var E48 = new Discord.RichEmbed()
                .setColor("0xff0000")
                .addField("Resume", `Se continua videoclipul ${serverQueue.songs[0].title}`)
                .setTimestamp();
                return message.channel.send(E48);
		}
        var E51 = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Eroare", "Galaxy nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E51);
            break;
    }
});
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Discord.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
        else  {
        var E35 = new Discord.RichEmbed()
        .setColor("0xff0000")
        .addField(":white_check_mark: Playlist:", `**${song.title}** a fost adougata in playlist`)
        .setTimestamp();
         return msg.channel.send(E35)
        }
	}
	return undefined;
}

function play(guild, song , message , channel) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
        var E50 = new Discord.RichEmbed()
        .setColor("0xff0000")
        .addField("Now Playing", `**${song.title}** `)
        .setTimestamp();
        serverQueue.textChannel.send(E50)
}
var  r1 = [
    "0%",
    "1%",
    "2%",
    "3%",
    "4%",
    "5%",
    "6%",
    "7%",
    "8%",
    "9%",
    "10%",
    "11%",
    "12%",
    "13%",
    "14%",
    "15%",
    "16%",
    "17%",
    "18%",
    "19%",
    "20%",
    "21%",
    "22%",
    "23%",
    "24%",
    "25%",
    "26%",
    "27%",
    "28%",
    "29%",
    "30%",
    "31%",
    "32%",
    "33%",
    "34%",
    "35%",
    "36%",
    "37%",
    "38%",
    "39%",
    "40%",
    "41%",
    "42%",
    "43%",
    "44%",
    "45%",
    "46%",
    "47%",
    "48%",
    "49%",
    "50%",
    "51%",
    "52%",
    "53%",
    "54%",
    "55%",
    "56%",
    "57%",
    "58%",
    "59%",
    "60%",
    "61%",
    "62%",
    "63%",
    "64%",
    "65%",
    "66%",
    "67%",
    "68%",
    "69%",
    "70%",
    "71%",
    "72%",
    "73%",
    "74%",
    "75%",
    "76%",
    "77%",
    "78%",
    "79%",
    "80%",
    "81%",
    "82%",
    "83%",
    "84%",
    "85%",
    "86%",
    "87%",
    "88%",
    "89%",
    "90%",
    "91%",
    "92%",
    "93%",
    "94%",
    "95%",
    "96%",
    "97%",
    "98%",
    "99%",
    "100%"
  ]
var  r2 = [
  "https://imgur.com/a/3xIG8",
  "https://imgur.com/a/pjZro",
  "https://imgur.com/a/sY3aE",
  "https://imgur.com/a/QRjLf"
]
var r3 = [
   "https://imgur.com/vmpzDtf",
   "https://imgur.com/7tC1MM6",
   "https://imgur.com/XiWmj56",
   "https://imgur.com/pCxvnl8",
   "https://imgur.com/FYno1Lp",
   "https://imgur.com/CWeeruD",
   "https://imgur.com/dMO3Kdw",
   "https://imgur.com/LaQ9waz",
   "https://imgur.com/q2jrVlA",
   "https://imgur.com/kxqyOOS",
   "https://imgur.com/KKGF50i",
   "https://imgur.com/K2nBM1h",
   "https://imgur.com/TRAN6hf",
   "https://imgur.com/h8Ek4TR",
   "https://imgur.com/hWRsL29",
   "https://imgur.com/20js0PC",
   "https://imgur.com/7F7cfgP",
   "https://imgur.com/452j4UZ"
]

var fortune = [
    "Da",
    "Nu",
    "Poate",
    "Poftim ?",
    "Idk",
    "Scutestema",
    "Wtf",
    "...",
    "Why ?"
]
});


bot.login(botconfig.token);