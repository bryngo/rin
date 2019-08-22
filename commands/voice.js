const commandUtil = require("../utilities/commandStatus");
const channelUtil = require('../utilities/channel');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const voiceChannel = await channelUtil.getDefaultVoiceChannel(client, message.guild);

    // could not find a prefix for some reason
    if(!voiceChannel) {

        message.channel.send(`Could not find default voice channel. You can set it by typing \`?setvoice {voice channel name}\` `);

        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Your default voice channel is ${voiceChannel}`);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};