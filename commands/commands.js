const Discord = require('discord.js');

exports.execute = (client, message, args) => {
  let generalCommands = '';

  client.commands.forEach((command) => {
    switch (command.info.type) {
      case 'general':
        generalCommands += command.info.name + '\n';
        break;

      case 'admin':
        adminCommands += command.info.name + '\n';
        break;

            // ignore hidden commands :^)
    }
  });

  const embed = new Discord.RichEmbed()
      .setColor(9955331)
      .addField('General Commands', generalCommands + '\n', false);

  message.channel.send(embed);
};

exports.info = {
  name: 'commands',
  alias: ['cmds', 'cmd', 'c'],
  permission: 'default',
  type: 'general',
  help: 'Print all commands',
};
