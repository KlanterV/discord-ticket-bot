const Discord = require('discord.js');

exports.run = function(client, message) {
  const adminn = ayarlar.adminID
if(message.author.id !== adminn) return message.reply(`bu komutu sadece Admin Kullanabilir!`);

 const help = new Discord.MessageEmbed()

  .setColor('RANDOM')
  .addField('Ticket Sistemi | Örnek kullanımı',`
  
  a!ticketopen <sorununuz>

Örnek;
a!ticketopen sohbete katılamıyorum

:reminder_ribbon: **Eğer Ticket kanalında saygılı olmazsanız sorununuz çözülmez** :reminder_ribbon:
       `)
   return message.channel.send(help).catch(console.error);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ticketbilgi'],
 permLevel: 0
};
 
exports.help = {
 name: 'ticketbilgi',
 description: 'botun gecikme süresini gösterir',
 usage: 'prefix+ping'
};
