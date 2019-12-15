const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    message.channel.send(`We depend on you! ${args}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);

};