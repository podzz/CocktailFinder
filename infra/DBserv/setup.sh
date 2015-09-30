#!/bin/bash

sudo -i

echo "Installing Neo4j ..."
wget -O - http://debian.neo4j.org/neotechnology.gpg.key | apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' > /etc/apt/sources.list.d/neo4j.list
apt-get update
apt-get -y install neo4j
sed -i 's/#org\.neo4j\.server\.webserver\.address=0\.0\.0\.0/org.neo4j.server.webserver.address=0.0.0.0/' /etc/neo4j/neo4j-server.properties

echo "Installing Python ..."
apt-get -y install python python-pip

echo "Starting Neo4j..."
service neo4j-service start

echo "Fill Database ..."
neo4j-shell -file /vagrant/data/import.cypher

service neo4j-service restart
