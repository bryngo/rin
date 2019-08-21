const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const voiceChannel = await message.guild.channels.find(ch => {
        return ch.name === args[0] && ch.type === 'voice' && ch.permissionsFor(client.user).has('SPEAK');
    });

    // if voice channel was not found, or no speaking permissions
    if(!voiceChannel) {
        message.channel.send(`Uh oh, I can't find that voice channel, or I don't have the \`SPEAK\` permission for it.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    client.defaultVoiceChannels.set(message.guild.id, args[0]);
    message.channel.send(`Setting voice to ${args[0]}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};