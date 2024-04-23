const connection = require('../database');

const createUser = async (user) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

module.exports = {
  createUser,
};