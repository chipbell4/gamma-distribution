var gamma = require('gamma');
var integrate = require('simpsons-rule');
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
 * Wrapper around the PDF of the gamma distribution. Handles edge cases like k <= 1 and x = 0,
 * which is undefined but has a clear limit.
 *
 * @param x     The value at which to calculate
 * @param k     The shape parameter
 * @param theta The scale parameter 
 *
 * @return float
 */
var pdfWrapper = function(x, k, theta) {
    if(k >= 1 || x != 0) {
        return pdf(x, k, theta);
    }

    // else approximate by estimating the limit
    var h = 0.0001;
    var pdfOfH = pdf(h, k, theta);
    var pdfOf2h = pdf(2 * h, k, theta);

    // using a linear extrapolation (or just Taylor's theorem), we can estimate pdf(0):
    return pdfOfH + (pdfOfH - pdfOf2h) / h;
};

/**
 * Calculates the CDF of the gamma distribution from 0 to a given x for a given shape and scale parameter
 *
 * @param x     The value at which to calculate
 * @param k     The shape parameter
 * @param theta The scale parameter
 */
var cdf = function(x, k, theta) {

    var noParamPdf = function(t) {
        return pdf(t, k, theta);
    };

    return integrate(noParamPdf, 0, x, Math.round(x * 10));
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
    pdf: pdfWrapper,
    cdf: cdf,
    fit: fit
};
