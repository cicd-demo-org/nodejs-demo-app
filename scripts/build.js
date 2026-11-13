'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const manifest = require(path.join(root, 'package.json'));

fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(path.join(root, 'src/index.js'), path.join(output, 'index.js'));
fs.writeFileSync(
  path.join(output, 'package.json'),
  `${JSON.stringify({
    name: manifest.name,
    version: manifest.version,
    main: 'index.js',
    type: 'commonjs',
  }, null, 2)}\n`,
);
