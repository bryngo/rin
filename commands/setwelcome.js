const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const newWelcomeChannel = args[0];
    const clientKey = message.guild.id.toString() + "_" + client.user.id.toString();

    const welcomeChannel = await message.guild.channels.find(ch => {
        return ch.name === newWelcomeChannel && ch.type === 'text' && ch.permissionsFor(client.user).has('SEND_MESSAGES');
    });

    // if welcome channel was not found, or no messaging permissions
    if(!welcomeChannel) {
        message.channel.send(`Uh oh, I can't find that text channel, or I don't have the \`SEND_MESSAGES\` permission for it.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    client.defaultWelcomeChannels.set(clientKey, newWelcomeChannel);
    message.channel.send(`Set welcome channel to ${newWelcomeChannel}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};