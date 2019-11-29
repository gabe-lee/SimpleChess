const express = require('express');
const json = express.json();
const cors = require('cors')();

const server = express();

server.use(cors);
server.use(json);
server.use('/', express.static('./client/dist'));

server.post('/game', (req, res) => {
  res.send(200);
});

server.use('*', express.static('./client/dist'));

module.exports = server;
