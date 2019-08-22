const commandUtil = require('../utilities/commandStatus');
const channelUtil = require('../utilities/channel');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const prefix = await channelUtil.getPrefix(client, message.guild);

    // could not find a prefix for some reason
    if(!prefix) {

        message.channel.send(`Could not find prefix. You can set it by typing \`?setprefix {prefix}\` `);

        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Your prefix is ${prefix}`);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};