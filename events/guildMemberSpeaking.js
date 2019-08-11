const { Transform } = require('stream');
const ytdl = require('ytdl-core');

const googleSpeech = require('@google-cloud/speech');
const googleSpeechClient = new googleSpeech.SpeechClient();

module.exports = async (client, member, speaking) => {

    return;

    if (!speaking || member.user.bot) return;

    console.log(`I'm listening to ${member.displayName}`);

    const voiceConnection = client.voiceConnection;
    let receiver = voiceConnection.receiver;

    // this creates a 16-bit signed PCM, stereo 48KHz stream
    const audioStream = receiver.createStream(member, {mode: "pcm"});
    const requestConfig = {
        encoding: 'LINEAR16',
        sampleRateHertz: 48000,
        languageCode: 'en-US'
    };

    const request = {
        config: requestConfig
    };

    // API call to transcribe the message
    const recognizeStream = googleSpeechClient
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', async response => {
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n')
                .toLowerCase();

            console.log(`Transcription: ${transcription}`);

            // play an audio file if keyword is detected
            if (transcription.includes("twice")) {
                voiceConnection.play(client.config["twice-clip"]);
            }
        });

    const convertTo1ChannelStream = new ConvertTo1ChannelStream();

    audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream);

    audioStream.on('end', async () => {
        console.log(`I'm done listenting to ${member.displayName}`);
        client.voiceConnection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));

    })
};

function convertBufferTo1Channel(buffer) {
    const convertedBuffer = Buffer.alloc(buffer.length / 2);

    for (let i = 0; i < (convertedBuffer.length / 2) - 1; i++) {
        const uint16 = buffer.readUInt16LE(i * 4);
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
