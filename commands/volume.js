/*
-- USAGE --
?volume [NUMBER]

-- EFFECT --
Changes the volume of the stream relative to the stream source. e.g. 100 = 100% of stream source, 200 doubles.

 */

const commandUtil = require("../utilities/commandStatus");

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
    } else if(args[0] < 0 || args[0] > 100) {

        message.channel.send(`Valid volumes are 0 - 100, inclusive.`);
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    voiceDispatcher.setVolume(args[0] / 100);
    message.channel.send(`Volume set to ${args[0]}`);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};