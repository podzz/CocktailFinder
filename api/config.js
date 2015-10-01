// Don't touch that
var config = {};
config.app = {};

// CONFIG START
// Server port on which the server will be run
config.app.port							= 3000;

// Database authentification parameters
config.app.db = {};
config.app.db.endpoint					= "localhost:7474/db/data/transaction/commit";
config.app.db.username					= "neo4j";
config.app.db.password					= "secret";

// Neo4j cache settings
// You can disable caching using cache.enabled = false
config.app.cache = {};
config.app.cache.enabled				= true;
config.app.cache.TTL					= 600;
config.app.cache.checkperiod			= 660;

// Node clustering settings
// You can disable multithreading using
// config.cluster.is_multicore				= false;
config.cluster = {};
config.cluster.is_multicore				= true;
config.cluster.restart_on_error			= true;
config.cluster.restart_on_file_change	= true;

// Don't touch that
module.exports = config;