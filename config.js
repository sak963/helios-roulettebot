// console.log('loading config...');
const path = __dirname + '/';

exports.jsonConfig = function() {
  const jsonConfig = {
    'path': path,
    'pathLogger': path + 'loggerConfig.js',
    'prefix': '-',
    'ignoreChannels': ['397961894654246913'],
    'ownerId': '242816216605917184',
  };
  return jsonConfig;
};

