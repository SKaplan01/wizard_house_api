/** Database setup for harry_potter_game. */

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql:///harry_potter'
});

client.connect();

module.exports = client;
