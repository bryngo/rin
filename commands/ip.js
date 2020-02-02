const commandUtil = require("../utilities/commandStatus");
const publicIp = require('public-ip');

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    message.channel.send(`I'm running on ${await publicIp.v4()}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};