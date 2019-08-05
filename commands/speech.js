exports.run = (client, message, args) => {

    if(args[0] === "true") {
        client.speechEnabled = true;
        message.channel.send(`I'm now listening! 頑張ってください`).catch(console.error);
    } else if(args[0] === "false") {
        client.speechEnabled = false;
        message.channel.send(`I've stopped listening!`).catch(console.error);
    } else {
        message.channel.send(`ごめん, I couldn't recognize that command`).catch(console.error);
        message.channel.send(`Try \`?speech true\` or \`?speech false\``);
    }
};