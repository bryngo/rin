const commandUtil = require("../utilities/commandStatus");
const channelUtil = require('../utilities/channel');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const textChannel = await channelUtil.getDefaultTextChannel(client, message.guild);

    // could not find a prefix for some reason
    if(!textChannel) {

        message.channel.send(`Could not find default text channel. You can set it by typing \`?settext {text channel name}\` `);

        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Your default text channel is ${textChannel}`);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};