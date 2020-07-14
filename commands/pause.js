/*
-- USAGE --

?pause

-- EFFECT --


 */

var commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const voiceConnection = await message.member.voice.channel.join();
    const voiceDispatcher = await voiceConnection.dispatcher;


    // error checking
    if(!voiceDispatcher) {

        message.channel.send(`Doesn't look like anything is playing.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    voiceDispatcher.pause();

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};

exports.help = {
    name: "pause",
    description: "Puases the audio stream that was playing.",
    usage: "pause"
}