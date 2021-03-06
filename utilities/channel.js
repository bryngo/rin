
// gets the configured text channel for the server
const getDefaultTextChannel = async function (client, guild) {

    const key = guild.id.toString() + "_" + client.user.id.toString();

    const textChannelName = await client.defaultTextChannels.get(key);

    return await guild.channels.find(ch => {
        return ch.name === textChannelName && ch.type === 'text'
    });
};

// gets the configured voice channel for the server
const getDefaultVoiceChannel = async function (client, guild) {

    const key = guild.id.toString() + "_" + client.user.id.toString();
    const voiceChannelName = await client.defaultVoiceChannels.get(key);

    return guild.channels.find(ch => {
        return ch.name === voiceChannelName && ch.type === 'voice'
    });
};

// gets the configured text channel for the server
const getPrefix = async function (client, guild) {

    const key = guild.id.toString() + "_" + client.user.id.toString();
    const prefix = await client.prefixes.get(key);

    return (typeof prefix !== 'undefined') ? prefix : client.config['DEFAULT_PREFIX'];
};


// gets the configured welcome channel for the server
const getWelcome = async function (client, guild) {

    const key = guild.id.toString() + "_" + client.user.id.toString();
    const welcomeChannelName = await client.defaultWelcomeChannels.get(key);

    return guild.channels.find(ch => {
        return ch.name === welcomeChannelName && ch.type === 'text'
    });
};

exports.getDefaultTextChannel = getDefaultTextChannel;
exports.getDefaultVoiceChannel = getDefaultVoiceChannel;
exports.getPrefix = getPrefix;
exports.getWelcome = getWelcome;