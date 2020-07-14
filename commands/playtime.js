const activityLog = require('../models/activityLog');
const commandUtil = require('../utilities/commandStatus');

/*
-- USAGE --
?playtime [user]

-- RETURN --


 */
exports.run = async (client, message, args) => {

    await commandUtil.commandRunning(message);

    const taggedUser = message.mentions.users.first();

    if(!taggedUser) {
        await commandUtil.statusClear(message);
        await commandUtil.commandFail(message);
        message.channel.send(`Please tag a single user.`);
        return;
    }

    const userID = taggedUser.id;

    activityLog.find({userID: userID}, null, async function (err, docs) {

        if(err) {

            await commandUtil.statusClear(message);
            await commandUtil.commandFail(message);
            message.channel.send(`Uh oh, something went wrong here. Please contact support.`);
            return;
        }

        // if there's no data on the specified user
        if(docs.length === 0) {

            await commandUtil.statusClear(message);
            await commandUtil.commandFail(message);
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
        let response = `Total play times for ${taggedUser.username}: \n`;

        Object.keys(totalPlayTimes).forEach(function(key) {

            // format the output depending on how long the game was played
            if(totalPlayTimes[key] > 3600) {
                response += (`---- ${key}: ${(totalPlayTimes[key] / 3600).toFixed(2)}h\n`);
            } else if(totalPlayTimes[key] > 60) {
                response += (`---- ${key}: ${(totalPlayTimes[key] / 60).toFixed(2)}m\n`);
            } else {
                response += (`---- ${key}: ${totalPlayTimes[key]}s\n`);
            }
        });

        message.channel.send(response);

        await commandUtil.statusClear(message);
        await commandUtil.commandSuccess(message);
    });
};

exports.help = {
    name: "playtime",
    description: "Total play time for each logged game on a specified user.",
    usage: "playtime @bryngo"
}