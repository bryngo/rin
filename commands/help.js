const commandUtil = require('../utilities/commandStatus');
const fs = require('fs');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    fs.readdir("./commands/", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

        let nameList = [];
        let descriptionList = [];
        let usageList = [];

        jsfiles.forEach((f, i) => {
            let props = require(`./${f}`);

            // no help to display, grab the next
            if(!props.help) return;

            nameList.push(props.help.name);
            descriptionList.push(props.help.description);
            usageList.push(props.help.usage);
        });


        // go through each of the commands and format the help message
        let helpEmbed = new Discord.MessageEmbed()
            .setColor('#11ff0a')
            .setTitle(`Hey ${message.author.username}! Here's the help you requested.`)

        for(let i = 0; i < nameList.length; i++) {
            let commandName = nameList[i];
            let commandDescription = descriptionList[i];
            let commandUsage = usageList[i];
            helpEmbed.addField(commandName, `${commandDescription} \n Usage: \`${commandUsage}\``, false);
        }

        message.channel.send(helpEmbed);

    });

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};

exports.help = {
    name: "help",
    description: "Returns list of all available commands and usages",
    usage: "help"
}