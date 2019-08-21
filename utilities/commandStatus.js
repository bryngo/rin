const commandSuccess = async function (message) {

    // indicate success
    await message.react('✅')
        .catch(console.error);
};

const commandFail = async function (message) {

    // indicate failure
    await message.react('❌')
        .catch(console.error);
};

const commandRunning = async function (message) {

    // start processing the command
    await message.react('🕛')
        .catch(console.error);
};

const statusClear = async function (message) {
    await message.reactions.removeAll();
};

exports.commandSuccess = commandSuccess;
exports.commandFail = commandFail;
exports.commandRunning = commandRunning;
exports.statusClear = statusClear;