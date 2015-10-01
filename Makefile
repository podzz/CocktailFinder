scrapy:
	cd scraping && $(MAKE) 1001cocktail

export:
	neo4j stop
	neo4j start
	cd scraping && $(MAKE) export-data
	cp scraping/export/liquids.csv data
	cp scraping/export/recipes.csv data
	cp scraping/export/recipient.csv data
	cp scraping/export/recipes_link_liquids.csv data
	cp scraping/export/recipes_link_recipient.csv data
	neo4j-shell -file data/import.cypher

API:
	cd infra/APIserv; vagrant up; cd -

cleanAPI:
	cd infra/APIserv; vagrant destroy; cd -

NGINX:
	cd infra/LBserv; vagrant up; cd -

cleanNGINX:
	cd infra/LBserv;vagrant destroy;cd -

DB:
	cd infra/DBserv;vagrant up;cd -

cleanDB:
	cd infra/DBserv;vagrant destroy;cd -
