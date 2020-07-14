const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const newVoiceChannel = args[0];
    const clientKey = message.guild.id.toString() + "_" + client.user.id.toString();

    const voiceChannel = await message.guild.channels.find(ch => {
        return ch.name === newVoiceChannel && ch.type === 'voice' && ch.permissionsFor(client.user).has('SPEAK');
    });

    // if voice channel was not found, or no speaking permissions
    if(!voiceChannel) {
        message.channel.send(`Uh oh, I can't find that voice channel, or I don't have the \`SPEAK\` permission for it.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    client.defaultVoiceChannels.set(clientKey, newVoiceChannel);
    message.channel.send(`Setting voice to ${newVoiceChannel}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};

exports.help = {
    name: "setvoice",
    description: "Sets default voice channel for a server.",
    usage: "setvoice general"
}