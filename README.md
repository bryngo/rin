# Rin

![rin](img/rin.png)

Discord bot build from following mainly [this guide](https://refruity.xyz/writing-discord-bot/) and a bit of 
[this codebase](https://github.com/dtinth/discord-transcriber).

Built with

- node v10.16.0
- discord.js v12.0.0-dev

## Future Plans
- Add permissions for who can / can't use the voice recognition features. It can get pretty costly.
- Add features all the other bots have out there (e.g. kicking, playing music, etc)
- Add those same features, but make it voice enabled.
- Figure out a way to reduce the Google Speech to text API usage. I've only tested this thing for like less than an hour each day for 3 days, and I've been charged $3 already. I think I'm making unecesscary requests; [info](https://cloud.google.com/speech-to-text/docs/basics).

### TODO: Commands
- `?play`: play audio from any audio source
- `?playtime`: get summary statistics of user activity (games, speaking, etc)
- `?playlist`: create custom playlists per user

## Useful links
- [File organization for events and commands](https://anidiots.guide/first-bot/a-basic-command-handler)
- [More in-depth guide](http://bryngo.me/articles/2019-08/discord-bot) on how to make this bot.