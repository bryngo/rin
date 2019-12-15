
// gets the configured text channel for the server
const getDefaultTextChannel = async function (client, guild) {

    const textChannelName = await client.defaultTextChannels.get(guild.id);

    return await guild.channels.find(ch => {
        return ch.name === textChannelName && ch.type === 'text'
    });
};

// gets the configured voice channel for the server
const getDefaultVoiceChannel = async function (client, guild) {

    const voiceChannelName = await client.defaultVoiceChannels.get(guild.id);

    return guild.channels.find(ch => {
        return ch.name === voiceChannelName && ch.type === 'voice'
    });
};

// gets the configured text channel for the server
const getPrefix = async function (client, guild) {

    const prefix = await client.prefixes.get(guild.id);

    // default to '?'
    return (typeof prefix !== 'undefined') ? prefix : '?';
};


// gets the configured welcome channel for the server
const getWelcome = async function (client, guild) {

    const welcomeChannelName = await client.defaultWelcomeChannels.get(guild.id);

    return guild.channels.find(ch=> {
        return ch.name === welcomeChannelName && ch.type === 'text'
    });
};

exports.getDefaultTextChannel = getDefaultTextChannel;
exports.getDefaultVoiceChannel = getDefaultVoiceChannel;
exports.getPrefix = getPrefix;
exports.getWelcome = getWelcome;