const Discord = require('discord.js');

const red = '🟥';
const black = '⬛';
const green = '🟩';
const top = '➖➖➖➖🔶➖➖➖➖';

exports.execute = async (client, message, args) => {
  if ( typeof parseFloat(args[1]) != 'number' || isNaN(parseFloat(args[1]))) {
    message.author.send( 'The command used is invalid for example: '
                          +`${client.config.PREFIX}sr 10`);
    await message.react('❌');
    return;
  }

  const numberRoulette = Math.floor(Math.random() * (14 - 0)) + 0;
  console.log('--> Rolled ' + numberRoulette + ' in roulette');
  const defaultText = '⬛🟥⬛🟥🟩⬛🟥⬛🟥';
  const title = 'Roulette #0000';
  let lastText;
  let wonText;
  try {
    // Start message
    let embed = embedConstructor(title, top + '\n' + defaultText);
    const msg = await message.channel.send(embed);

    // Travel message
    for (let i = 0; i <= 14; i++) {
      lastText = await editDelay(msg, i, title);
      if (numberRoulette == i+1) break;
    }

    // Wom message
    if (args[0] === color(numberRoulette, 'sg', 'sr', 'sb')) {
      wonText = message.author.username + ' won '.concat(
                (args[0] !== 'sg') ? String(args[1]*2) : String(args[1]*5)
                + ' HLS');
    } else {
      wonText = 'No Wom :(';
    }
    embed = embedConstructor(title, top + '\n' + lastText + '\n\n'
                            + color(numberRoulette, green, red, black)
                            + ' ' +numberRoulette+ ' WON!!!' + '\n\n'
                            + wonText);
    msg.edit(embed);
  } catch (error) {
    console.log(error);
  }
};


/**
 * @date 2020-08-27
 * @param {any} msg
 * @param {any} i
 * @param {any} title
 * @return {any}
 */
function editDelay(msg, i, title) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function() {
        let text = '';
        let init;
        if (i-3 > 0) init = i-3;
        if (i-3 <= 0) init = 15 - Math.abs(i-3);
        for (let y = 0; y < 9; y++) {
          if (init > 14) init = 0;
          text += color(init, green, red, black);
          init++;
        }
        const embed = embedConstructor(title, top + '\n' + text);
        msg.edit(embed);
        resolve(text);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * @date 2020-08-27
 * @param {any} title
 * @param {any} msg
 * @return {any}
 */
function embedConstructor(title, msg) {
  return new Discord.RichEmbed()
      .setColor(9955331)
      .setTitle(title)
      .setDescription(msg);
}


/**
 * @date 2020-08-27
 * @param {any} number
 * @param {any} g
 * @param {any} r
 * @param {any} b
 * @return {any}
 */
function color(number, g, r, b) {
  return (number === 0) ? g : (number % 2 === 0) ? r : b;
}

exports.info = {
  name: 'roulette',
  alias: ['sr', 'sg', 'sb'],
  permission: 'default',
  type: 'general',
  help: 'Simulate a roulette game.',
};
