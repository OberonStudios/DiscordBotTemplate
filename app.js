const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const HttpUtil = require('./http-util');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const args = message.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const httpUtil = new HttpUtil();

  if(command === "whois") {
    if (args.join(" ") < 1){
      message.channel.send('Enter a name to classify!');
    } else {
      httpUtil.httpsGetText('api.genderize.io', `?name=${args[0]}`)
        .then((text) => {
          let json = JSON.parse(text);
          if(json.gender === undefined) {
            message.channel.send(json.gender); 
          } else {
            message.channel.send(`The probability of ${args.join(" ")} been ${json.gender} ${json.probability}`);
          }
        })
        .catch(e => console.log(e));  
    }   
  }
});

client.login(config.token);