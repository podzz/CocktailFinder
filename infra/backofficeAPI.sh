#!/usr/bin/env bash

# General packages installation
sudo apt-get update
sudo apt-get install -y curl upstart

# NodeJs Installation
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install -y nodejs

# CocktailFinder fetching && Installaiton
cd /CocktailFinder/backoffice
sudo npm install forever -g
sudo npm install

# Server start
sudo forever start backoffice.js
# Upstart, not working yet
#sudo cp cocktailfinder /etc/init/cocktailfinder.conf
#sudo start cocktailfinder
