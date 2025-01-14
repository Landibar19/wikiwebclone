// filepath: /c:/Users/User/Desktop/Lizander/Pdf/MERN/wikicloneapp/next.config.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};