const Discord = require("discord.js");
const { DatabaseManager } = require("@aloshai/mongosha");

const config = require('./guildconf.json');
const botconf = require('./botconf.json');


const client = new Discord.Client().then(console.log("Başarıyla client oluşturuldu."))
DatabaseManager.connect(botconf.mongoconnecturl).then(console.log("Başarıyla Mongo Database'me bağlandım."))
const db = DatabaseManager.getDatabase("TICKETBOT")
client.login(botconf.token).then(console.log("Başarıyla Discord apisi'ne bağlandım."))
client.user.setActivity(botconf.customstatus, { type: "STREAMING",url: "https://www.twitch.tv/klanter"}).then(console.log("Custom Status ayarlandı."))


client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(botconf.prefix) !== 0) return;
let args = message.content.split(' ').slice(1);
let komut = message.content.split(' ')[0].slice(botconf.prefix.length);



if(komut === "ticketopen") {

const ticketsebebi = args.join(" ").slice(0);
const sorunlukisi = message.author
const ticketekle = config.ticketaçmakanalı
const logkanali = config.ticketlog
const yetkilirol1 = config.AdminRoleID
const yetkilirol2 = config.StaffRoleID
const kategori = config.ticketkategorisi
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

client.channels.cache.get(channel.id).send(`Ticketin başarıyla açıldı saygılı olmazsan sorunun çözülmeyeceğini unutma. <@${message.author.id}>`)
db.set(`ticketkanali.${channel.id}`,message.author.id)
})
client.channels.cache.get(logkanali).send(`<@${AdminRoleID}>,<@${StaffRoleID}`);
client.channels.cache.get(logkanali).send(embed3);

}


if(komut === "ticketclose") {

const sorunlukisi = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
  const ticketsebebi = args.join(" ").slice(0);
  const logkanali = config.ticketlog
  const kapatankisi = message.author


  if(!message.member.roles.cache.has(config.AdminRoleID)) return message.channel.send("Ticketi sadece adminler kapatabilir.")


  db.get(`ticketkanali.${message.channel.id}`,message.guild.member.id).then(ticketkanali => {
    if (!ticketkanali) { return message.channel.send("Burası bir ticket kanalı değil yalnızca ticket kanallarını kapatabilirsin.") }




  var embed1 = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription("Lütfen Ticketini kapatmak istediğin kişiyi etiketle.")
  if(!sorunlukisi) return message.channel.send(embed1)

  var embed11 = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription("Lütfen Ticketi kapatma nedenini yaz.")
  if(!ticketsebebi) return message.channel.send(embed11)

  var embed3 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Ticket kapandı',`
  __Durum__: **Kapalı**
  __Açan kişi__:**${sorunlukisi}**
  __Kapatan yetkili__:**${kapatankisi}**
  __Kapanma Nedeni__:**${ticketsebebi}**`)


    if(ticketkanali) {
    message.channel.delete()
  db.delete(`ticketkanali.${message.channel.id}`,message.guild.member.id) 
  return client.channels.cache.get(logkanali).send(embed3);

    }})}
})

client.on("message", (message, member) => {
  let ticketkanali = ayarlar.ticketaçmakanalı;
  if (message.channel.id == ticketkanali) {
    if (message.author.id == message.client.user.id) return;

    message.delete({timeout: 5000});

  }
});
