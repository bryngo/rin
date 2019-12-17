const commandUtil = require("../utilities/commandStatus");

/**
 * @param client
 * @param message
 * @param args[0] --> new prefix
 * @returns {Promise<void>}
 */
exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const newPrefix = args[0];
    const clientKey = message.guild.id.toString() + "_" + client.user.id.toString();

    // argument checking
    if (!newPrefix || newPrefix.length !== 1) {
        message.channel.send(`Sorry, I only accept prefixes of a single character. Such as !, @, #, $, etc.`);
        await commandUtil.commandFail(message);
        return;
    }

    // set the new prefix
    if (!(await client.prefixes.set(clientKey, newPrefix))) {
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        return;
    }

    message.channel.send(`Set prefix to \`${newPrefix}\``);

    await commandUtil.statusClear(message);
    await commandUtil.commandSuccess(message);
};