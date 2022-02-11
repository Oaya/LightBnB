const { Client } = require("pg");

const client = new Client();

modoule.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback);
  },
};
