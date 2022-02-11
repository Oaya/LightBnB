const { Client } = require("pg");

const client = new Client({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
  // user: process.env.PG_USER,
  // password: process.env.PG_PASSWORD,
  // host: process.env.PG_HOST,
  // database: process.env.PG_DATABASE,
});

client.connect();

module.exports = {
  query: (text, params) => {
    return client.query(text, params);
  },
};
