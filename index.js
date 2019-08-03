require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');
const Enmap = require("enmap");

const discordClient = new Discord.Client();

discordClient.config = config;

// link all the events
// explanation for how this works can be found here:
// https://anidiots.guide/first-bot/a-basic-command-handler
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        discordClient.on(eventName, event.bind(null, discordClient));
    });
});

discordClient.commands = new Enmap();

// read in all the custom commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        discordClient.commands.set(commandName, props);
    });
});

discordClient.login(config.discordApiToken);