require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');
const Enmap = require("enmap");
const mongoose = require('mongoose');

const discordClient = new Discord.Client();

// read in all of our configurations
discordClient.config = config;
discordClient.speechEnabled = false;

// for hot swapping server specific settings
const Keyv = require('keyv');
const prefixes = new Keyv('mongodb://localhost/rin', {namespace: 'prefixes'});
const defaultTextChannels = new Keyv('mongodb://localhost/rin', {namespace: 'defaultTextChannels'});
const defaultVoiceChannels = new Keyv('mongodb://localhost/rin', {namespace: 'defaultVoiceChannels'});
const defaultWelcomeChannels = new Keyv('mongodb://localhost/rin', {namespace: 'defaultWelcomeChannels'});

discordClient.prefixes = prefixes;
discordClient.defaultTextChannels = defaultTextChannels;
discordClient.defaultVoiceChannels = defaultVoiceChannels;
discordClient.defaultWelcomeChannels = defaultWelcomeChannels;


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

// connect to a db called mongoose_basics
mongoose.connect('mongodb://localhost/rin', function (err) {

    if (err) throw err;

    console.log('Successfully connected');

});

discordClient.login(config.prod_discordApiToken);