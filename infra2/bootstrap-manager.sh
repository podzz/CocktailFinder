#!/usr/bin/env bash

# install ansible (http://docs.ansible.com/intro_installation.html)
apt-get -y install software-properties-common
apt-add-repository -y ppa:ansible/ansible
apt-get update
apt-get -y install ansible

# copy examples into /home/vagrant (from inside the mgmt node)
cp -a /vagrant/examples/* /home/vagrant
chown -R vagrant:vagrant /home/vagrant

# configure hosts file for our internal network defined by Vagrantfile
cat >> /etc/hosts <<EOL

# vagrant environment nodes
192.168.50.1  manager
192.168.50.2  lb
192.168.50.3  db
192.168.50.11  frontofficeAPI1
192.168.50.12  frontofficeAPI2
192.168.50.13  frontofficeAPI3
192.168.50.14  frontofficeAPI4
192.168.50.15  frontofficeAPI5
192.168.50.16  frontofficeAPI6
192.168.50.17  frontofficeAPI7
192.168.50.18  frontofficeAPI8
192.168.50.19  frontofficeAPI9
192.168.50.21  static1
192.168.50.22  static2
192.168.50.23  static3
192.168.50.24  static4
192.168.50.25  static5
192.168.50.26  static6
192.168.50.27  static7
192.168.50.28  static8
192.168.50.29  static9
EOL

#ssh-keyscan lb db frontofficeAPI1 frontofficeAPI2 static1 static2 >> .ssh/known_hosts

sudo apt-get -y install sshpass