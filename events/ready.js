  const chalk = require('chalk')
const moment = require('moment')
const log = message => {
  
    console.log(`${chalk.magenta(moment().format('YYYY-MM h:mm:ss'))} ${message}`)
}

module.exports = async client => {
  let tarih = moment().format('l');
  

client.user.setActivity(`Klanter ❤️`, {
type: "STREAMING",
url: "https://www.twitch.tv/klanter"})
    log(chalk.green(`[BOT] Aktif, Komutlar Yüklendi ${tarih}`))
  }
