const activityLog = require('../models/activityLog');
const channelUtil = require('../utilities/channel');

module.exports = async (client, oldPresence, newPresence) => {


    const textChannel = await channelUtil.getDefaultTextChannel(client, oldPresence.guild);
    textChannel.send(`${oldPresence.user.username} moved from ${oldActivity} to ${newActivity}`);
    textChannel.send(`--- Played ${oldActivity} for ${timeDiff} seconds`);

    // if (!oldPresence || !newPresence) return;
    //
    // const oldActivity = oldPresence.activities ? oldPresence.activities[newPresence.activities.length - 1].name : 'nothing';
    // const newActivity = newPresence.activities ? newPresence.activities[newPresence.activities.length - 1].name : 'nothing';
    //
    // // we dont want to log idle times
    // if (oldActivity === 'nothing') return;
    //
    // // game status didn't actually change (?) so return
    // /// TODO: Potential bug here, might need to still log this
    // if (oldActivity === newActivity) return;
    //
    // const serverId = oldPresence.guild.available ? oldPresence.guild.id : 0;
    // const timeIn = oldPresence.activity.timestamps.start;
    // let timeOut = new Date();
    //
    // if (newActivity !== 'nothing') {
    //     timeOut = newPresence.activity.timestamps.start;
    // }
    //
    // let activityLogEntry = new activityLog({
    //     userID: oldPresence.userID,
    //     serverID: serverId,
    //     timeIn: timeIn,
    //     timeOut: timeOut,
    //     activityName: oldActivity
    // });
    //
    // activityLogEntry.save(function (err) {
    //     if (err) {
    //         console.log("Problem saving timeLog");
    //         return;
    //     }
    //
    //     console.log("Entry successfully saved");
    // });
    //
    // let timeDiff = (timeOut.getTime() - timeIn.getTime()) / 1000;
    //
    // const textChannel = await channelUtil.getDefaultTextChannel(client, oldPresence.guild);
    // textChannel.send(`${oldPresence.user.username} moved from ${oldActivity} to ${newActivity}`);
    // textChannel.send(`--- Played ${oldActivity} for ${timeDiff} seconds`);
};