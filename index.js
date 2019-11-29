const server = require('./server.js');

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Chess Listening on port ${PORT}`);
});
