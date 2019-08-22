const commandUtil = require("../utilities/commandStatus");
const channelUtil = require('../utilities/channel');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const welcomeChannel = await channelUtil.getWelcome(client, message.guild);

    // could not find a prefix for some reason
    if(!welcomeChannel) {

        message.channel.send(`Could not find welcome channel. You can set it by typing \`?setwelcome {welcome channel name}\` `);

        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Your default voice channel is ${welcomeChannel}`);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};