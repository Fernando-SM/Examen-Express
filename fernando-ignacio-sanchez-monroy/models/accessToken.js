const connection = require('../database');

const createAccessToken = async (token) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO access_tokens SET ?', token, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

const getAccessTokenByToken = async (token) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM access_tokens WHERE token = ?', [token], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = {
  createAccessToken,
  getAccessTokenByToken,
};