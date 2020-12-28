const Discord = require('discord.js'); 
const ayarlar = require('../config/config.json');

exports.run = async(client, message, args) => {

  const sorunlukisi = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
  const ticketsebebi = args.join(" ").slice(0);
  const logkanali = ayarlar.ticketlog
  const kapatankisi = message.author
  const adminn = ayarlar.adminID

  if(!message.member.roles.cache.has(adminn)) return message.reply("Ticketi yalnızca adminler kapatabilir")

  var embed1 = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription("Lütfen Ticketini kapatmak istediğin kişiyi etiketle ve kapatma nedenini yaz.")
  if(!ticketsebebi) return message.channel.send(embed1)

  var embed3 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Ticket kapandı',`
  __Durum__: **Kapalı**
  __Açan kişi__:**${sorunlukisi}**
  __Kapatan yetkili__:**${kapatankisi}**
  __Kapanma Nedeni__:**${ticketsebebi}**`)

  message.channel.delete()
  client.channels.cache.get(logkanali).send(embed3);

};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['ticketclose', 'ticketkapat'], 
  permLevel: 0 
};

exports.help = {
  name: 'komutadı', 
  description: 'ticketi kapatmaya yarar', 
  usage: 'a!ticketclose @user' 
};
 