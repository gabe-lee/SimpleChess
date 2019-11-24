const server = require('./server.js');
const PORT = 4242;

server.listen(PORT, () => {
  console.log(`Chess Listening on port ${PORT}`);
});