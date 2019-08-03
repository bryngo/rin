exports.run = (client, message, args) => {
    message.channel.send(`pong! ${args}`).catch(console.error);
};