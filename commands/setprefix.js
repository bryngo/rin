const commandUtil = require("../utilities/commandStatus");

exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    // argument checking
    if (!args[0] || args[0].length !== 1) {
        message.channel.send(`Sorry, I only accept prefixes of a single character. Such as !, @, #, $, etc.`);
        await commandUtil.commandFail(message);
        return;
    }

    // set the new prefix
    if (!(await client.prefixes.set(message.guild.id, args[0]))) {
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Set prefix to \`${args[0]}\``);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};