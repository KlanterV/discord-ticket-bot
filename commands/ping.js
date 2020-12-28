const Discord = require("discord.js");
exports.run = (client, message,args) => {

    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("🏓Pong!")
        .setDescription(
          `Latency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
        )
        .setColor("RANDOM");
      msg.edit(_);
      msg.edit("\u200B");
    });
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ms','ping'],
   permLevel: 0
  };
   
  exports.help = {
   name: 'ping',
   description: 'botun gecikme süresini gösterir',
   usage: 'prefix+ping'
  };
