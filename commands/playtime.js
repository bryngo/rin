var activityLog = require('../models/activityLog');

/*
-- USAGE --
?playtime [user]

-- RETURN --
Total play time for each logged game on a specified user

 */
exports.run = async (client, message, args) => {

    // start processing the command
    await message.react('🕛')
        .catch(console.error);

    const taggedUser = message.mentions.users.first();
    const userID = taggedUser.id;

    activityLog.find({userID: userID}, null, async function (err, docs) {

        await message.reactions.removeAll();

        if(err) {

            // indicate failure
            message.react('❌')
                .catch(console.error);

            message.channel.send(`Uh oh, something went wrong here. Please contact support.`);
            return;
        }

        // if there's no data on the specified user
        if(docs.length === 0) {

            // indicate failure
            message.react('❌')
                .catch(console.error);

            message.channel.send(`Can't find any information on this user. Trying playing some games and make sure Discord can detect your game activity!`);
            return;
        }

        // https://stackoverflow.com/questions/34010342/map-and-reduce-json-objects-with-javascript
        // compute the total play times
        const totalPlayTimes = docs.reduce(function (total, currentValue) {

            let timeDiff = (currentValue.timeOut - currentValue.timeIn) / 1000;

            if (total[currentValue.activityName]) {
                total[currentValue.activityName] += timeDiff;
            } else {
                total[currentValue.activityName] = timeDiff;
            }

            return total;
        }, {});

        // send output to user
        message.channel.send(`Total play times for ${message.author.username}: `);

        Object.keys(totalPlayTimes).forEach(function(key) {

            // format the output depending on how long the game was played
            if(totalPlayTimes[key] > 3600) {
                message.channel.send(`---- ${key}: ${(totalPlayTimes[key] / 3600).toFixed(2)}h`);
            } else if(totalPlayTimes[key] > 60) {
                message.channel.send(`---- ${key}: ${(totalPlayTimes[key] / 60).toFixed(2)}m`);
            } else {
                message.channel.send(`---- ${key}: ${totalPlayTimes[key]}s`);
            }
        });

        // indicate success
        message.react('✅')
            .catch(console.error);

    });
};