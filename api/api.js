var cluster_restart_on_error 		= true;
var cluster_restart_on_file_change 	= true;
var cluster_is_multicore 			= true;

var cluster = require('cluster'),
	// Restart with zero down time
	restartWorkers = function restartWorkers() {
		var wid, workerIds = [];

    console.log("Restarting cluster");

		// create a copy of current running worker ids
		for(wid in cluster.workers) {
			workerIds.push(wid);
		}

		workerIds.forEach(function(wid) {
			cluster.workers[wid].send({
				text: 'shutdown',
				from: 'master'
			});

			setTimeout(function() {
				if(cluster.workers[wid]) {
					cluster.workers[wid].kill('SIGKILL');
				}
			}, 5000);
		});
	};

if (cluster.isMaster) {
	// Number of CPU cores
	var numWorkers = cluster_is_multicore ? require('os').cpus().length : 1;
	
	// To watch for file changes
	var fs = require('fs');

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	var i;
	var worker;

	// Creating workers
	for (i = 0; i < numWorkers; i++) {
		worker = cluster.fork();
		worker.on('message', function() {
			console.log('arguments', arguments);
		});
	}

	// Set up listener of file changes for restarting workers
	if (cluster_restart_on_file_change) {
    console.log("Looking for file changes");
		fs.readdir('.', function(err, files) {
			files.forEach(function(file) {
				fs.watch(file, function() {
					restartWorkers();
				});
			});
		});
	}

	// Restart on error
	cluster.on('exit', function(_worker, code, signal) {
		console.log('Worker ' + _worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		if (cluster_restart_on_error) {
			console.log('Starting a new worker');
			worker = cluster.fork();
			worker.on('message', function() {
				console.log('arguments', arguments);
			});
		}
	});
} else {
	process.on('message', function(message) {
		if (message.type === 'shutdown') {
			process.exit(0);
		}
	});

	console.log('Worker ' + process.pid + ' is running');
	
	// Calling main app
	require("./core");
}