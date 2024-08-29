module.exports = (express, app) => {
	const glob = require('glob')
	const path = require('path')
	const config = require('./config')

	glob.sync('./routes/**/*.js',{
		ignore: [
			'./routes/**/*.test.*',
			'./routes/**/*.spec.*',
		]
	}).forEach(function (file) {
		require(path.resolve(file))(express, app);
	});
};
