# Gamma-Distribution
A module with the PDF and CDF functions for the gamma distribution. Also has maximum likelihood fitting capabilities.
An example:
`
var dist = require('gamma-distribution');

var x = 2, k = 1, theta = 3;
dist.pdf(x, k, theta);
dist.cdf(x, k, theta);
dist.fit([1, 2, 2, 2, 2, 3, 3, 4, 6]); // returns an object with k and theta
`
