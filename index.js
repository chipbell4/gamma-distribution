var gamma = require('gamma');
var lowerGamma = require('incomplete-gamma').lower;
var mean = require('mean');

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

/**
 * Fits a given data set to a gamma function
 *
 * @param data An array of values to fit
 *
 * @return An object with a k and theta key indicating the fitted k and theta values
 */
var fit = function(data) {
    var logData = data.map(function(item) {
        return Math.log(item);
    });
    var s = Math.log(mean(data)) - mean(logData) / logData.length;

    // an approximate form for k. From: http://research.microsoft.com/en-us/um/people/minka/papers/minka-gamma.pdf
    // TODO: Use Newton-Rhapson refinement: Choi, S.C.; Wette, R. (1969) "Maximum Likelihood Estimation of the Parameters of the Gamma Distribution and Their Bias", Technometrics, 11(4) 683–690
    var k = (3 - s + Math.sqrt( Math.pow(s - 3, 2.0) + 24 * s)) / (12 * s);
    var theta = mean(data) / k;

    return {
        k: k,
        theta: theta
    };
};

module.exports = {
    pdf: pdf,
    cdf: cdf,
    fit: fit
};
