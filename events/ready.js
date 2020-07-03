module.exports = async (client) => {

    // ---- Configure the text and voice channels ----
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    console.log(`Logged in as ${client.user.tag}!`);
};
