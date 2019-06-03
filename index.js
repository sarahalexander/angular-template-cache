'use strict';

var fileScanner = require('./lib/fileScanner');
var templateGenerator = require('./lib/templateGenerator');
var resultSaver = require('./lib/resultSaver');

module.exports = function html2jsProcessor(options) {
	return fileScanner(options.filesGlob, options.fileList)
		.then(templateGenerator(options))
		.then(resultSaver(options))
		.catch(function (err) {
			console.error(err.toString());
			process.exit(1);
		});
};
