const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const textChannel = await message.guild.channels.find(ch => {
        return ch.name === args[0] && ch.type === 'text' && ch.permissionsFor(client.user).has('SEND_MESSAGES');
    });

    // if text channel was not found, or no messaging permissions
    if(!textChannel) {
        message.channel.send(`Uh oh, I can't find that text channel, or I don't have the SEND_MESSAGES permission for it.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    client.defaultTextChannels.set(message.guild.id, args[0]);
    message.channel.send(`Set default text channel to ${args[0]}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};