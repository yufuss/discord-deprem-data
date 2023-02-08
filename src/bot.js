const { Client, Intents } = require('discord.js');
const ayarlar = require("./config.js")
const fetch = require("node-fetch")
const chalk = require("chalk")
const db = require("croxydb")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); 

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

let eklen = 0

client.on("messageCreate", async(message) => {
  if(!message.channel.id == "1033007393765863436") return;
  const sehirler = ayarlar.sehirler
  const requiredWords = 2;
  let wordCount = 0;

  sehirler.forEach(word => {
    if (message.content.includes(word.toLocaleLowerCase())) {
      wordCount = wordCount + 1
    }
  });
  console.log(wordCount)
  if (wordCount >= requiredWords) {
    console.log(message.content)
    let adress = db.fetch("adresler")
    if(adress.includes(message.content)) return;
    db.push("adresler", message.content)
    eklen = eklen + 1
    const body = {"adres": message.content}

    /*  const response = await fetch('/post', {
method: 'post',
body: JSON.stringify(body),
headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

// console.log(data);*/

  }

})

client.login('MTA3Mjk3Mjc0MjI3OTgzOTc4NA.GOuA34.QpVdo9eej9tGCyfNeirUZOsnL9HuwbkrINrogc');

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds ;
}

// chalk

let log = console.log
let bol = 0
let ort = 0
let tot = 0
setInterval(function() {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  let an = Math.round(used * 100) / 100
  if(top < an) top = an
  const uptime = process.uptime();
  let a = msToTime(uptime * 1000)
  bol = bol + 1
  tot = tot + an
  ort = tot / bol
  console.clear();
  log(chalk.bgGreen(`Anlık Kullanım: ${an}MB
Ortalama Kullanım: ${ort}MB
Zirve Kullanım: ${top}MB`))
  log(chalk.bgBlue(`Uptime Süresi: ${a}
Eklenen Data: ${eklen}`))
}, 500);
