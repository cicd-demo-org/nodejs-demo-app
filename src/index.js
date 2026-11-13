'use strict';

const http = require('http');

const PORT = process.env.PORT || 3000;

/**
 * Creates the HTTP server for the demo application.
 * @returns {http.Server} The configured server instance.
 */
function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url === '/health') {
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    res.end(JSON.stringify({ message: 'Hello from demo-app-1', path: req.url }));
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`demo-app-1 listening on port ${PORT}`);
  });
}

module.exports = { createServer };
