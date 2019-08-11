const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {

    message.channel.send(`Attempting to play ${args[0]}`);
    // client.voiceConnection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));

};