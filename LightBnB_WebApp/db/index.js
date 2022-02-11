const { Client } = require("pg");

const client = new Client({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

client.connect();

module.exports = {
  query: (text, params) => {
    return client.query(text, params);
  },
};
