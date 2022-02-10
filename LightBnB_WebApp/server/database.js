const { Client } = require("pg");
const properties = require("./json/properties.json");
const users = require("./json/users.json");

const client = new Client({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

client.connect();
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const value = [email];

  return client
    .query(queryString, value)
    .then((result) => {
      if (!result) {
        return null;
      }
      console.log(`rows`, result.rows);
      return Promise.resolve(result.rows[0]);
    })
    .catch((err) => {
      console.log(`login Error: ${err.message}`);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const value = [id];
  return client
    .query(queryString, value)
    .catch((result) => {
      if (!result) {
        return null;
      }
      return Promise.resolve(result.rows[0]);
    })
    .catch((err) => {
      console.log(`get user id Error: ${err.message}`);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password)
  VALUES($1, $2, $3)RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return client
    .query(queryString, values)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      console.log(`adduser Error : ${err.message}`);
    });
  //   const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryString = `SELECT * FROM properties LIMIT $1;`;
  const value = [limit];
  return client
    .query(queryString, value)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
  // return Promise.resolve(property);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
