const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: 3333,
  },
};

const test = {
  app: {
    port: 3000,
  },
};

const config = {
  dev,
  test,
};

module.exports = config[env];
