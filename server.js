
// Initialize the cluster and get reference to http object
var cluster = require('cluster');

var cpus = require('os').cpus().length || 1;

// If we're the master, fork for each CPU
if ( cluster.isMaster ) {
	for ( var i = 0; i < cpus; ++i )
		cluster.fork({INDEX_OF_PROCESS:i});

	cluster.on('exit', function(worker) {
		var exitCode = worker.process.exitCode;
		console.log('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
		cluster.fork();
	});

} else {

	module.exports = require('./service');

}