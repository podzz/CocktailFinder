#!/bin/bash

sudo apt-get update
sudo apt-get install -y nginx git curl npm

#Replace nginx configuration
cp /vagrant/default /etc/nginx/sites-enabled/
sudo service nginx start


