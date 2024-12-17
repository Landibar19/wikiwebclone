const path = require('path');

module.exports = {
  experimental: {

  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};