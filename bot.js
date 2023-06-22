require('dotenv').config();
const token = process.env.DISCORD_TOKEN; //Token that you saved in step 5 of this tutorial
const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");
const { ask } = require("./ai.js"); //import the "ask" function from the "ai.js" file

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  

client.on("ready", () =>{
    console.log("The AI bot is online"); //message when bot is online
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) {
        return;
      }
      
    if (message.content.substring(0, 1) === "!") {
        const prompt = message.content.substring(1); 
        console.log(prompt);

        const answer = await ask(prompt);
        console.log(answer);
        
        message.channel.send('log ');  //reply if message has "!" as first character
    }
  
});

client.login(token);