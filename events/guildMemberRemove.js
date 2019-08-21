const Discord = require('discord.js');
const channelUtil = require('../utilities/channel');

// triggered when a new user, bot or not, is added to the guild
module.exports = async (client, member) => {

    while(!member.guild.available) {}

    const welcomeChannel = await channelUtil.getWelcome(client, member.guild);

    if (welcomeChannel) {

        // inside a command, event listener, etc.
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor('#ff000d')
            .setTitle(`${member.user.username}, has left the server.`)
            .setAuthor('Rin', 'https://wallpapercave.com/wp/wp2306849.jpg', 'https://github.com/bryngo/rin')
            .setTimestamp();

        welcomeChannel.send(welcomeEmbed);
    }
};