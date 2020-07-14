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
    }

    voiceDispatcher.resume();
    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};

exports.help = {
    name: "resume",
    description: "Resumes the audio stream that was playing.",
    usage: "resume"
}