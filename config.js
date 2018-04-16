var path = require('path');

var env = process.env;
var config = {};

if (env.HOW2_SOURCE_DIRPATH) {
  config.sourceDirpath = path.resolve(env.HOW2_SOURCE_DIRPATH);
} else {
  config.sourceDirpath = path.resolve(__dirname, './src/');
}

if (env.HOW2_ASSET_DIRPATH) {
  config.assetDirpath = path.resolve(env.HOW2_ASSET_DIRPATH);
} else {
  config.assetDirpath = path.resolve(__dirname, './public/');
}

if (env.HOW2_MANIFEST_FILEPATH) {
  config.manifestFilepath = path.resolve(env.HOW2_MANIFEST_FILEPATH);
} else {
  config.manifestFilepath = path.resolve(__dirname, './dist/how2db.json');
}

config.server = {};
config.server.port = env.HOW2_PORT || '5500';

module.exports = config;
