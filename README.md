# Rin

She's alive! Rin now lives on a Digital Ocean droplet. I have githooks set up to auto build when I push, so she'll
always be online.

![rin](img/rin.png)

Discord bot build from following mainly [this guide](https://refruity.xyz/writing-discord-bot/) and a bit of 
[this codebase](https://github.com/dtinth/discord-transcriber).

Built with
- node v10.16.0
- discord.js v12.0.0-dev

## Quick Start 
- Make sure you are using node v10.16.0 `nvm use --lts` 
- Start mongodb server `sudo service mongodb start`. For some reason, this doesn't work for my [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) machine 
so I do `sudo mongod &` every time I want to work on this project after restarting my computer.
- Run `node index.js` to start. 

Chat about the bot with me here

![Discord Banner 2](https://discordapp.com/api/guilds/613899158448766986/widget.png?style=banner2)


## Future Plans
- Add permissions for who can / can't use the voice recognition features. It can get pretty costly.
- Add those same features, but make it voice enabled.
- Figure out a way to reduce the Google Speech to text API usage. I've only tested this thing for like less than an hour each day for 3 days, and I've been charged $3 already. I think I'm making unecesscary requests; [info](https://cloud.google.com/speech-to-text/docs/basics).

### TODO: 
- Make the `?play` command more robust
- Make all bot outputs the same format (i.e. message embeds)
- Check for stability
- Deploy bot to server
- Make bot website
- Publicize bot

## Useful links
- [File organization for events and commands](https://anidiots.guide/first-bot/a-basic-command-handler)
- [More in-depth guide](http://bryngo.me/articles/2019-08/discord-bot) on how to make this bot.
- [Setting up githooks](https://medium.com/@aunnnn/automate-digitalocean-deployment-for-node-js-with-git-and-pm2-67a3cfa7a02b)