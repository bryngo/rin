/*
-- USAGE --

?pause

-- EFFECT --
Puases the audio stream that was playing

 */

var commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    // error checking
    if(!client.dispatcher) {

        message.channel.send(`Doesn't look like anything is playing.`);
        commandUtil.commandFail(message);
        return;
    }

    client.dispatcher.pause();

    commandUtil.commandSuccess(message);
};