/*
-- USAGE --
?volume [NUMBER]

-- EFFECT --
Changes the volume of the stream relative to the stream source. e.g. 100 = 100% of stream source, 200 doubles.

 */

const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    // error checking
    if(!client.dispatcher) {
        message.channel.send(`Doesn't look like anything is playing.`);
        commandUtil.commandFail(message);
        return;
    } else if(args[0] < 0 || args[0] > 100) {
        message.channel.send(`Valid volumes are 0 - 100, inclusive.`);
        commandUtil.commandFail(message);
        return;
    }


    client.dispatcher.setVolume(args[0] / 100);
};