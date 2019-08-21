// at the top of your file
const Discord = require('discord.js');
const channelUtil = require('../utilities/channel');


async function initDefaultTextChannel(client, guild) {

    // if we already set the default
    const defaultTextChannel = await channelUtil.getDefaultTextChannel(client, guild);
    if(defaultTextChannel) {
        return;
    }

    // if there exist no default text channel, but the system channel is configured, try to set the default
    if (!defaultTextChannel && guild.systemChannel) {
        await client.defaultTextChannels.set(guild.id, guild.systemChannel.name);

    // else, find the first available channel we can send messages in
    } else {

        const defaultTextChannel = guild.channels.find(ch => {
            return ch.type === 'text' && ch.permissionsFor(client.user).has('SEND_MESSAGES');
        });

        if(defaultTextChannel) {
            client.defaultTextChannels.set(guild.id, defaultTextChannel.name);
        }
    }
}

async function initDefaultPrefix(client, guild) {

    // if there exist no default prefix, set the default prefix to '?'
    if (!(await client.prefixes.get(guild.id))) {
        await client.prefixes.set(guild.id, '?');
    }
}

async function initDefaultWelcome(client, guild) {

    // if default welcome channel is not configured, try to set it to `welcome`
    if (!(await client.defaultWelcomeChannels.get(guild.id))) {

        const welcomeChannel = guild.channels.find(ch => {
            return ch.name === 'welcome' && ch.type === 'text' && ch.permissionsFor(client.user).has('SEND_MESSAGES');
        });

        if (welcomeChannel) {
            await client.defaultWelcomeChannels.set(guild.id, welcomeChannel.name);
        }
    }

}

// Triggered when a new user joins a guild
module.exports = async (client, guild) => {

    // initialize default values, if none exist
    await initDefaultTextChannel(client, guild);
    await initDefaultPrefix(client, guild);
    await initDefaultWelcome(client, guild);

    // inside a command, event listener, etc.
    const guildJoinEmbed = new Discord.MessageEmbed()
        .setColor('#34ff3e')
        .setTitle('Hello! This is my quick set-up guide.')
        .setAuthor('Rin', 'https://images5.alphacoders.com/750/750481.png', 'https://github.com/bryngo/rin')
        .setDescription('Thanks for inviting me to your server. There are some initial configurations that you must do for me to work in your server.')
        .setThumbnail('https://images3.alphacoders.com/753/753578.png')
        .addBlankField()
        .addField('Set prefix (defaulted to `?`).', '?setPrefix {your prefix}')
        .addBlankField()
        .addField('Set welcome channel (defaulted to \`welcome\`. Skip this if not wanted).', '?setWelcome {Text channel name}')
        .addBlankField()
        .addField('Set default text channel (defaulted to your server\'s `system messages channel` if it\'s set).', '?setText {Text channel name}')
        .addBlankField()
        .addField('Set default voice channel', '?setVoice {Voice channel name}')
        .addBlankField()
        .setImage('https://images6.alphacoders.com/755/755797.png')
        .setTimestamp()
        .setFooter('Note: Use your own prefix for the configuration commands if you decided to change it. Any configurations can be modified at any time.', 'https://images3.alphacoders.com/752/752351.png');

    const defaultTextChannel = await channelUtil.getDefaultTextChannel(client, guild);
    defaultTextChannel.send(guildJoinEmbed);

    console.log(`Joined server ${guild.name}`);

};
