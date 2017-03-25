// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: process.env.PORT || 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'legacy',
	DBPASSWORD: 'feedandfuel',
	// DBHOST: 'ds058369.mlab.com:58369',
		DBHOST: 'LEGACYSERVER:27017',
	DBNAME: 'legacyfeedfuel',
	SERVERNAME: 'dev-server'
}
mongodb://<dbuser>:<dbpassword>@ds060009.mlab.com:60009/legacy
// mongodb://<dbuser>:<dbpassword>@ds058369.mlab.com:58369/legacycounter

// MAPS env TO ACTUAL ENVIRONMENT
if (process.env.NODE_ENV == 'development') {
	Object.keys(env).forEach(v => {
		process.env[v] = process.env[v] || env[v]
	})
} else {
	Object.keys(env).forEach(v => {
		process.env[v] = env[v]
	})
}

// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env