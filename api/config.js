var config = {};

config.app = {};
config.app.port 							= 3000;

config.app.db = {};
config.app.db.endpoint 						= "http://localhost:7474/db/data/transaction/commit";
config.app.db.username						= "neo4j";
config.app.db.password						= "secret";

config.app.cache = {};
config.app.cache.enabled 					= true;
config.app.cache.TTL 						= 600;
config.app.cache.checkperiod 				= 660;

config.cluster = {};
config.cluster.restart_on_error 		    = true;
config.cluster.restart_on_file_change 		= true;
config.cluster.is_multicore 				= true;

module.exports = config;