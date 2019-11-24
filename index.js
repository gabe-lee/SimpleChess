const server = require('./server.js');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(PORT, () => {
  console.log(`Chess Listening on port ${PORT}`);
});