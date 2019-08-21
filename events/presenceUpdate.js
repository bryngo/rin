const activityLog = require('../models/activityLog');
const channelUtil = require('../utilities/channel');

module.exports = async (client, oldPresence, newPresence) => {

    if (!oldPresence || !newPresence) return;

    const oldGame = oldPresence.activity ? oldPresence.activity.name : 'nothing';
    const newGame = newPresence.activity ? newPresence.activity.name : 'nothing';

    // we dont want to log idle times
    if (oldGame === 'nothing') return;

    // game status didn't actually change (?) so return
    /// TODO: Potential bug here, might need to still log this
    if (oldGame === newGame) return;

    let timeIn = oldPresence.activity.timestamps.start;
    let timeOut = new Date();

    if (newGame !== 'nothing') {
        timeOut = newPresence.activity.timestamps.start;
    }

    let activityLogEntry = new activityLog({
        userID: oldPresence.userID,
        timeIn: timeIn,
        timeOut: timeOut,
        activityName: oldGame
    });

    activityLogEntry.save(function (err) {
        if (err) {
            console.log("Problem saving timeLog");
            return;
        }

        console.log("Entry successfully saved");
    });

    let timeDiff = (timeOut.getTime() - timeIn.getTime()) / 1000;

    const textChannel = await channelUtil.getDefaultTextChannel(client, oldPresence.guild);
    textChannel.send(`${oldPresence.user.username} moved from ${oldGame} to ${newGame}`);
    textChannel.send(`--- Played ${oldGame} for ${timeDiff} seconds`);
};