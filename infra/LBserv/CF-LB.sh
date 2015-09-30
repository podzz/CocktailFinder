#!/bin/bash

sudo apt-get update
sudo apt-get install -y nginx
cp /vagrant/default /etc/nginx/sites-enabled/
sudo service nginx start