module.exports = async (client) => {

    // ---- Configure the text and voice channels ----
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

    console.log(`Logged in as ${client.user.tag}!`);

    const guild = client.guilds.get(client.config.guildId);
    if (!guild) {
        throw new Error('Cannot find guild.')
    }
    const voiceChannel = guild.channels.find(ch => {
        return ch.name === client.config.voiceChannelName && ch.type === 'voice'
    });
    if (!voiceChannel) {
        throw new Error('Cannot find voice channel.')
    }
    console.log(`Voice channel: ${voiceChannel.id} ${voiceChannel.name}`);

    const textChannel = guild.channels.find(ch => {
        return ch.name === client.config.textChannelName && ch.type === 'text'
    });
    if (!textChannel) {
        throw new Error('Cannot find text channel.')
    }
    console.log(`Text channel: ${textChannel.id} ${textChannel.name}`);

    client.textChannel = textChannel;
    client.voiceConnection = await voiceChannel.join();
};
