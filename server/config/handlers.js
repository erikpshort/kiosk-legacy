let defaultErrorHandler = (err, req, res, next) => {
	let error;
	console.log('Error Caught:')
	console.log(err);
	if (res.headersSent) {
		return next(err);
	}
	let env = process.env.NODE_ENV;
	if (env !== 'production') {
		error = {
			ok: false,
			error: err.message,
			stack: err
		}
	} else {
		error = {
			ok: false,
			error: err.message,
		}
	}
	res.status(400).send(error);
}

//Default Urls 
// var whitelist = ['http://192.168.0.39:8080', 'http://localhost:8080', 'http://portal.boisecodeworks.com'];
 var whitelist = ['http://192.168.0.91:8080','http://localhost:8080', 'http://192.168.0.91:3000', 'LEGACYSERVER:3000'];
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};
export {
	defaultErrorHandler,
	corsOptions
}