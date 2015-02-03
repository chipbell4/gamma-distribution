var G = require('./index.js');
var assert = require('assert');

assert.ok(G.pdf(0, 0.9, 2) < Infinity);
