const commandUtil = require('../utilities/commandStatus');
const channelUtil = require('../utilities/channel');

module.exports = async (client, message) => {

    const prefix = await channelUtil.getPrefix(client, message.guild);

    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) {
        await commandUtil.commandFail(message);
        message.channel.send(`Sorry, ${command} is not a command`);
        return;
    }

    // Run the command
    cmd.run(client, message, args);
};