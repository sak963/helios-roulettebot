const main = require('../index.js');
const Discord = require('discord.js');

exports.execute = (client, message, args) => {
  if (args.length == 1) {
    const title = `You have been helped :question:`;
    let msg = 'List all commands: `'+client.config.PREFIX+'commands`\n';
    msg += 'Info about a command: `'+client.config.PREFIX+'help <command>`';

    const embed = new Discord.RichEmbed()
        .setColor(9955331)
        .setTitle(title)
        .setDescription(msg);
    message.channel.send(embed);
  } else {
    const cmdName = args[1];
    main.commands().forEach((command) => {
      if (cmdName === command.info.name
                    || command.info.alias.includes(cmdName)) {
        const embed = new Discord.RichEmbed()
            .setColor(9955331)
            .setTitle(`${command.info.name}`)
            .setDescription(`${command.info.help}`);
        message.channel.send(embed);
        return;
      }
    });
    // if cmdName doesn't match any command
    message.react('❓'); // needs to wait for forEach to finish
  }
};

exports.info = {
  name: 'help',
  alias: [],
  permission: 'default',
  type: 'dm',
  help: 'Print help message',
};
