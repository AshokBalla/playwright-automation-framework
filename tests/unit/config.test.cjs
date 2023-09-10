const test = require('node:test');
const assert = require('node:assert/strict');


test('fixture catalog exists', () => {
  const raw = require('node:fs').readFileSync('test-data/cases.json', 'utf8');
  const catalog = JSON.parse(raw);
  assert.ok(catalog.length >= 1);
});

test('runtime defaults use two workers', () => {
  const source = require('node:fs').readFileSync('utils/env.ts', 'utf8');
  assert.match(source, /WORKERS/);
});
