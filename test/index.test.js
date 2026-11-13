'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/index');

test('server responds with 200 and expected message', async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await fetch(`http://localhost:${port}/`);
  const body = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(body.message, 'Hello from demo-app-1');

  server.close();
});
