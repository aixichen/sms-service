'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538271174312_5274';

  // add your config here
  config.middleware = [];
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    database: 'sms',
    host: '118.24.45.246',
    port: 3307,
    username: 'sms',
    password: 'sms123456',
    timezone: '+08:00',
  };
  return config;
};
