const Discord = require('discord.js');
const channelUtil = require('../utilities/channel');

// triggered when a new user, bot or not, is added to the guild
module.exports = async (client, member) => {

    while(!member.guild.available) {}

    const welcomeChannel = await channelUtil.getWelcome(client, member.guild);

    if (welcomeChannel) {

        // inside a command, event listener, etc.
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor('#11ff0a')
            .setTitle(`Hi ${member.user.username}, welcome to the server!`)
            .setAuthor('Rin', 'https://images6.alphacoders.com/755/755797.png', 'https://github.com/bryngo/rin')
            .setTimestamp();

        welcomeChannel.send(welcomeEmbed);
    }
};