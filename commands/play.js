const ytdl = require('ytdl-core');
const commandUtil = require('../utilities/commandStatus');

exports.run = async (client, message, args) => {

    message.channel.send(`▶ ${args[0]}`);

    client.dispatcher = client.voiceConnection.play(ytdl(`${args[0]}`, { quality: 'highestaudio' }));
    commandUtil.commandSuccess(message);

};