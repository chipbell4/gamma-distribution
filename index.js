var gamma = require('gamma');
var lowerGamma = require('incomplete-gamma').lower;

/**
 * Calculates the PDF of the gamma distribution at some x, for a given shape and scale
 *
 * @param x     The value at which to calculate
 * @param k     The shape parameter
 * @param theta The scale parameter 
 *
 * @return float
 */
var pdf = function(x, k, theta) {
    return Math.pow(x, k - 1) * Math.exp(-x / theta) / gamma(k) / Math.pow(theta, k);
};

/**
 * Calculates the CDF of the gamma distribution from 0 to a given x for a given shape and scale parameter
 *
 * @param x     The value at which to calculate
 * @param k     The shape parameter
 * @param theta The scale parameter
 */
var cdf = function(x, k, theta) {
    return lowerGamma(k, x / theta) / gamma(k);
};

module.exports = {
    pdf: pdf,
    cdf: cdf
};
