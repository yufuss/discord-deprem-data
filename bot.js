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
  if(!message.content.startsWith("d-bildir ")) return;
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