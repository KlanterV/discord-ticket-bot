const Discord = require('discord.js'); 
const ayarlar = require('../config/config.json');

exports.run = async(client, message, args) => {
 
    const ticketsebebi = args.join(" ").slice(0);
    const sorunlukisi = message.author
    const ticketekle = ayarlar.ticketeklekanal
    const logkanali = ayarlar.ticketlog
    const yetkilirol1 = ayarlar.yetkili1
    const yetkilirol2 = ayarlar.yetkili2
    const botunrolu = ayarlar.botrol
    const kategori = ayarlar.kategori
    const adminn = ayarlar.adminID
    let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`)
    var embed1 = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Sorununu girmeyi unuttun Lütfen sorununu yaz.")

    if (message.channel.id !== ticketekle)
    return message.channel
      .send(`Bu komutu sadece <#${ticketekle}> kanalında kullanabilirsin.`)
      .then(msg => msg.delete({timeout: 2000})); 
  if(!ticketsebebi) return message.channel.send(embed1).then(msg => msg.delete({timeout: 2000}));
  

var embed2 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("Ticketin başarıyla açıldı Ticketde saygılı olmayı unutma **lütfen**.")


var embed3 = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField('Yeni ticket açıldı',`
__Durum__: **Aktif**
__Açan kişi__:**${sorunlukisi}**
__Neden__:**${ticketsebebi}**`)

if(ticketsebebi)  message.channel.send(embed2).then(message.react("✅")).then(a => a.delete({timeout: 5000}))
 
  if(ticketsebebi)  message.guild.channels.create(`${ticketsebebi}`,{type : "text"}).then(channel =>
     {
      const category = message.guild.channels.cache.get(kategori) 
      channel.setParent(category.id) 
      
      channel.createOverwrite(sorunlukisi, {
  'SEND_MESSAGES': true,
  'READ_MESSAGE_HISTORY': true,
  'VIEW_CHANNEL': true,
  'ATTACH_FILES': true  })

  channel.createOverwrite(everyone, {
  'VIEW_CHANNEL': false})
 
  channel.createOverwrite(yetkilirol1, {
  'SEND_MESSAGES': true,
  'READ_MESSAGE_HISTORY': true,  
  'VIEW_CHANNEL': true,
  'ATTACH_FILES': true })

  channel.createOverwrite(yetkilirol2, {
  'SEND_MESSAGES': true,
  'READ_MESSAGE_HISTORY': true,  
  'VIEW_CHANNEL': true,
  'ATTACH_FILES': true })
   
   channel.createOverwrite(adminn, {
  'SEND_MESSAGES': true,
  'READ_MESSAGE_HISTORY': true,  
  'VIEW_CHANNEL': true,
  'ATTACH_FILES': true })

})
client.channels.cache.get(logkanali).send(`<@&${yetkilirol1}>,<@&${yetkilirol2}>`);
client.channels.cache.get(logkanali).send(embed3);

};//a
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['ticketopen','ticketaç','talepaç','talepac'], 
  permLevel: 0 
};

exports.help = {
  name: 'ticketopen', 
  description: 'ticket açmana yarar', 
  usage: 'a!ticketopen bıktım abi' 
};
