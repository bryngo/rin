require('dotenv').config()
const Discord = require('discord.js')
const config = require('./config')
const Dispatcher = require('./promised/Dispatcher')

const { Transform } = require('stream')
const googleSpeech = require('@google-cloud/speech')

const pino = require('pino')({
    prettyPrint: true,
    level: 'trace'
})

let totalBilledThisSession = 0


function convertBufferTo1Channel(buffer) {
    const convertedBuffer = Buffer.alloc(buffer.length / 2)

    for (let i = 0; i < (convertedBuffer.length / 2) - 1; i++) {
        const uint16 = buffer.readUInt16LE(i * 4)
        convertedBuffer.writeUInt16LE(uint16, i * 2)
    }

    return convertedBuffer
}

class ConvertTo1ChannelStream extends Transform {
    constructor(source, options) {
        super(options)
    }

    _transform(data, encoding, next) {
        next(null, convertBufferTo1Channel(data))
    }
}

const discordClient = new Discord.Client();
const googleSpeechClient = new googleSpeech.SpeechClient();

discordClient.login(config.discordApiToken);

discordClient.on('ready', () => {

    pino.info('Discord client ready.')

    pino.info(`Logged in as ${discordClient.user.tag}!`);

    const guild = discordClient.guilds.get(config.guildId);
    if (!guild) {
        throw new Error('Cannot find guild.')
    }
    const voiceChannel = guild.channels.find(ch => {
        return ch.name === config.voiceChannelName && ch.type === 'voice'
    })
    if (!voiceChannel) {
        throw new Error('Cannot find voice channel.')
    }
    pino.info('Voice channel: %s (%s)', voiceChannel.id, voiceChannel.name);

    const textChannel = guild.channels.find(ch => {
        return ch.name === config.textChannelName && ch.type === 'text'
    });
    if (!textChannel) {
        throw new Error('Cannot find text channel.')
    }
    pino.info('Text channel: %s (%s)', textChannel.id, textChannel.name);

    join(voiceChannel, textChannel)

})

async function join(voiceChannel, textChannel) {
    pino.trace('Joining voice channel...');
    const voiceConnection = await voiceChannel.join();
    const receiver = voiceConnection.receiver;
    pino.info('Voice channel joined.');

    voiceConnection.on('speaking', (user, speaking) => {
        if (!speaking) {
            return
        }

        pino.info(`I'm listening to ${user.username}`);

        // this creates a 16-bit signed PCM, stereo 48KHz stream
        const audioStream = receiver.createStream(user, {mode: "pcm"});
        const requestConfig = {
            encoding: 'LINEAR16',
            sampleRateHertz: 48000,
            languageCode: 'en-US'
        };
        const request = {
            config: requestConfig
        };
        const recognizeStream = googleSpeechClient
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', async response => {
                const transcription = response.results
                    .map(result => result.alternatives[0].transcript)
                    .join('\n')
                    .toLowerCase();
                pino.trace(`Transcription: ${transcription}`);

                if (transcription.includes("twice")) {
                    await Dispatcher.playFile(voiceConnection, config["twice-clip"]);
                }
            });

        const convertTo1ChannelStream = new ConvertTo1ChannelStream();

        audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream);

        audioStream.on('end', async () => {
            pino.info(`I'm done listenting to ${user.username}`);
        })
    })
}

