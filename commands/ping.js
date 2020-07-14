const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    message.channel.send(`pong ${args}`).catch(console.error);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};

exports.help = {
    name: "ping",
    description: "Returns a message to the same channel the user sent it in.",
    usage: "ping"
}