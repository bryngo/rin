var timeLog = require('../models/timeLog');

module.exports = (client, oldPresence, newPresence) => {

    if(!oldPresence || !newPresence) return;

    const oldGame = oldPresence.activity ? oldPresence.activity.name : 'nothing';
    const newGame = newPresence.activity ? newPresence.activity.name : 'nothing';

    // we dont want to log idle times
    if(oldGame === 'nothing') return;

    // game status didn't actually change (?) so return
    /// TODO: Potential bug here, might need to still log this
    if(oldGame === newGame) return;

    let timeIn = oldPresence.activity.timestamps.start;
    let timeOut = new Date();

    if(newGame !== 'nothing') {
        timeOut = newPresence.activity.timestamps.start;
    }

    let timeLogEntry = new timeLog({
        userID: oldPresence.userID,
        timeIn: timeIn ,
        timeOut: timeOut,
        activityName: oldGame
    });

    timeLogEntry.save(function(err) {
        if(err) {
            console.log("Problem saving timeLog");
            return;
        }

        console.log("Entry successfully saved");
    });

    let timeDiff = (timeOut.getTime() - timeIn.getTime()) / 1000;

    client.textChannel.send(`${oldPresence.user.username} moved from ${oldGame} to ${newGame}`);
    client.textChannel.send(`Played ${oldGame} for ${timeDiff} seconds`);
};