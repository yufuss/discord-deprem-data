const env = require("dotenv/config")
const { Client, Intents } = require('discord.js');
const ayarlar = require("./keywords.js")
const fs = require("fs")

let msg_archive;


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });  //client intents setting

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`); //bot ready message
})


client.on("messageCreate", async(message) => {
  if(!message.channel.id == env.CHANNEL_ID) return; //If channel id is not selected channel
  const keywords = ayarlar.keywords; //getting keywords
  const msg_content = message.content.split(" "); //spliting message. because of that, we can get every word to match our keywords

  const result = msg_content.filter(word => keywords.includes(word)); //filtering message


  if (result.length >= 1 && msg_archive !== message.content) { // If message content words has one or more in our keywords and message is not same (doing this for spam)
    console.log(message.content)
    msg_archive = message.content
    
  }

  }

)

client.login(env.BOT_TOKEN);

/*
We can make this bot to do make multiable servers

TODO:
we're gonna write a data.json file
then we're gonna add something like that:
{
  guild_id1: id,
  channels_id = []
},
{
  guild_id2: id,
  channels_id: []
}
*/
