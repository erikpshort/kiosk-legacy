import { server } from './config/dev-server'

let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.connection;
// autoIncrement.initialize(connection);

// Establishes MongoDb Connection
mongoose.connect(process.env.CONNECTIONSTRING, {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

var conn = mongoose.createConnection(process.env.CONNECTIONSTRING);

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function () {
	server.listen(process.env.PORT, function () {
		console.log(`Running on port: ${process.env.PORT}`);
	})
});
