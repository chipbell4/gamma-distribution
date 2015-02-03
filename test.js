var G = require('./index.js');
var assert = require('assert');

assert.ok(G.pdf(0, 0.9, 2) < Infinity);

var result = G.cdf(0, 0.9, 2);
assert.ok(result == result, 'CDF at 0 got NaN');
