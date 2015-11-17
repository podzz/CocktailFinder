#!/bin/bash
sudo service neo4j-service stop
cd /var/lib/neo4j/data
sudo tar -zcf graph.db.tar.gz graph.db/
cp graph.db.tar.gz /vagrant/data/dump.tar.gz
sudo service neo4j-service start