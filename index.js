require('dotenv').config();
const Discord = require('discord.js');
const conf = require('./config.js').jsonConfig();
const logger = require(conf.pathLogger).getBotLogger();
const fs = require('fs');
// const DiscordContext = require('discord-context');

const client = new Discord.Client();

// get config values.
client.config = {
  TOKEN: process.env.TOKENBOT,
  PREFIX: conf.prefix,
  IGNORE_CHANNELS: conf.ignoreChannels,
  OWNER_ID: conf.ownerId,
};

// let other files access config
exports.config = () => {
  return client.config;
};

// let other files access commands
exports.commands = () => {
  return client.commands;
};

// add all commands
client.commands = [];
fs.readdir('./commands/', function(err, files) {
  files.forEach((f) => {
    const cmd = require(`./commands/${f}`);
    client.commands.push(cmd);
  });
});

client.on('ready', () => {
  logger.info(`Bot is ready as: ${client.user.tag}!`);
  client.user.setStatus('online');
  client.user.setActivity('Type '+client.config.PREFIX
                          +'help to use the bot!!!');
});

client.on('message', (msg) => {
  try {
    // avoid spam channels
    if (client.config.IGNORE_CHANNELS.includes(msg.channel.id)) return;

    if (!msg.content.startsWith(client.config.PREFIX)) return;

    // log all messages read (not saved)
    const user = msg.author.username;
    let channel = msg.channel.name;
    if (channel == undefined) channel = 'private';
    logger.info('[' + channel + '] ' + user + ': ' + msg.content);

    const args = msg.content.substring(client.config.PREFIX.length).split(' ');
    const cmdName = args[0].toLowerCase();

    client.commands.forEach((command) => {
      if (cmdName === command.info.name
                    || command.info.alias.includes(cmdName)) {
        // guild or private chat check
        if (msg.channel.type === 'dm'
                    && msg.author.id != client.config.OWNER_ID) {
          msg.channel.send('This command unavailable in private chat');
          return;
        }

        // admin check
        if (command.info.permission == 'admin'
                     && msg.author.id != client.config.OWNER_ID) {
          msg.channel.send('Admin only command');
        } else {
          command.execute(client, msg, args);
        }
      }
    });
  } catch (error) {
    logger.error( error );
  }
});
// token discord bot here
client.login(client.config.TOKEN);
