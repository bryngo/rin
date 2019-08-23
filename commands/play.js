const ytdl = require('ytdl-core');
const commandUtil = require('../utilities/commandStatus');
const channelUtil = require('../utilities/channel');

exports.run = async (client, message, args) => {

    // TODO: Have better coverage for this command
    await commandUtil.commandRunning(message);

    // if the bot has permission to play music in the author's voice channel
    if(message.member.voice.channel && message.member.voice.channel.permissionsFor(client.user).has('SPEAK')) {
        const voiceConnection = await message.member.voice.channel.join();
        const voiceDispatcher = voiceConnection.play(ytdl(`${args[0]}`, { quality: 'highestaudio' }));

        // default to a volume of .5
        voiceDispatcher.setVolume(50 / 100);

        message.channel.send(`--- ▶ Playing ▶ --- \n ${args[0]}`);

    } else {
        message.channel.send(`You must be in a voice channel for me to play.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};