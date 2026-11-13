'use strict';

const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { createServer } = require('../src/index');

test('createServer wires up a single request listener via http.createServer', (t) => {
  const createServerSpy = t.mock.method(http, 'createServer');

  const server = createServer();

  assert.strictEqual(createServerSpy.mock.callCount(), 1);
  const [listener] = createServerSpy.mock.calls[0].arguments;
  assert.strictEqual(typeof listener, 'function');
  assert.strictEqual(server instanceof http.Server, true);
});

test('request listener responds with 200 and echoes the request path using mocked req/res', () => {
  const server = createServer();
  const [listener] = server.listeners('request');

  const req = { url: '/mock-path' };
  const res = {
    writeHead: (statusCode, headers) => {
      res.writeHeadArgs = [statusCode, headers];
    },
    end: (body) => {
      res.endArg = body;
    },
  };

  listener(req, res);

  assert.deepStrictEqual(res.writeHeadArgs, [200, { 'Content-Type': 'application/json' }]);
  const body = JSON.parse(res.endArg);
  assert.deepStrictEqual(body, { message: 'Hello from demo-app-1', path: '/mock-path' });
});

test('request listener reflects whatever path is provided on the mocked request', () => {
  const server = createServer();
  const [listener] = server.listeners('request');

  const req = { url: '/another/path?query=1' };
  let capturedBody;
  const res = {
    writeHead: () => {},
    end: (body) => {
      capturedBody = body;
    },
  };

  listener(req, res);

  const body = JSON.parse(capturedBody);
  assert.strictEqual(body.path, '/another/path?query=1');
  assert.strictEqual(body.message, 'Hello from demo-app-1');
});
