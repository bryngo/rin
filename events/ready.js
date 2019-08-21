module.exports = async (client) => {

    // ---- Configure the text and voice channels ----
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

    console.log(`Logged in as ${client.user.tag}!`);
};
