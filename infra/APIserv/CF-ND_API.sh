#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y git curl upstart
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install -y nodejs
git clone https://github.com/Flasheur111/CocktailFinder.git
cd CocktailFinder/server && sudo npm install -g npm
sudo npm install
sudo cp cocktailfinder /etc/init/cocktailfinder.conf
sudo start cocktailfinder