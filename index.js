'use strict';

const util = require('gulp-util');

/**
 * Error handling support code based on https://gist.github.com/noahmiller/61699ad1b0a7cc65ae2d
 */

const ERROR_LEVELS = ['error', 'warning'];

/**
 * Adds command line arguments for prepare process
 * 
 * @param {Object} yargs Yargs instance
 * @return Extended Yargs instance
 */
exports.addYargs = function addYargs(yargs) {
	return yargs
		.choices('fatal', ['off', ...ERROR_LEVELS])
		.describe('fatal', 'Treat errors/warnings as fatal');
}

/**
 * Creates an error handler based on its severity level.
 *
 * Log all levels, and exit the process for fatal levels.
 * 
 * @param {String} fatalLevel Error level on which the system starts to stop
 */
exports.create = fatalLevel => function handleError(level, error) {
	util.log(error.message);
	if (isFatal(level, fatalLevel)) {
		process.exit(1);
	}
}

/**
 * Return true if the given level is equal to or more severe than the configured fatality error level.
 * If the fatalLevel is 'off', then this will always return false.
 * Defaults the fatalLevel to 'error'.
 */
function isFatal(level, fatalLevel) {
	return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}
