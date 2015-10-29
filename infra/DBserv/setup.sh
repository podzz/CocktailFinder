#!/bin/bash

sudo -i
#Set password for neo4j access
NEO4J_PASS=secret
NEO4J_SETPASS_JSON='{"password":"'$NEO4J_PASS'"}'

#==============================#

echo "Installing Neo4j ..."
wget -O - http://debian.neo4j.org/neotechnology.gpg.key | apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' > /etc/apt/sources.list.d/neo4j.list
apt-get update
apt-get -y install neo4j

#Set server on broadcast
sed -i 's/#org\.neo4j\.server\.webserver\.address=0\.0\.0\.0/org.neo4j.server.webserver.address=0.0.0.0/' /etc/neo4j/neo4j-server.properties

#==============================#

echo "Installing Python ..."
apt-get -y install python python-pip vim curl

#==============================#

echo "Starting Neo4j..."
service neo4j-service start

#Set custom password for neo4j
echo "Set Neo4J password to" $NEO4J_PASS
curl -H "Content-Type":"application/json" -X POST -d $NEO4J_SETPASS_JSON http://neo4j:neo4j@127.0.0.1:7474/user/neo4j/password

echo "Fill Database ..."
neo4j-shell -file /vagrant/data/import.cypher
neo4j-shell -file /vagrant/data/bootstrap.cypher

service neo4j-service restart

pip install py2neo; cd /vagrant/data/dataColor; python BootstrapColorDatabase.py; cd -
#==============================#
