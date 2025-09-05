#!/bin/bash

echo "🚀 Starting full RILT stack setup on Amazon Linux 2023..."

# Update system
sudo dnf update -y

# Basic tools
sudo dnf install -y git curl unzip tar gcc-c++ make policycoreutils

#########################################
# PHP 8.2 + Composer
#########################################

# Enable Remi repo for PHP 8.2
sudo dnf install -y dnf-utils
sudo dnf install -y https://rpms.remirepo.net/enterprise/remi-release-9.rpm
sudo dnf module enable php:remi-8.2 -y
sudo dnf install -y php php-cli php-mbstring php-xml php-curl php-mysqlnd php-zip php-bcmath php-soap php-intl php-readline

# Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
rm composer-setup.php

#########################################
# Node.js 22 + PM2
#########################################

curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
sudo npm install -g pm2

#########################################
# MySQL 8.0
#########################################

# Add MySQL official repo
sudo rpm -Uvh https://repo.mysql.com/mysql80-community-release-el9-1.noarch.rpm
sudo dnf install -y mysql-server mysql

# Start & enable MySQL
sudo systemctl enable mysqld
sudo systemctl start mysqld

# Optionally secure MySQL (requires manual input)
# sudo mysql_secure_installation

#########################################
# Nginx
#########################################

sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

#########################################
# Redis
#########################################

sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis

#########################################
# Laravel Installer
#########################################

composer global require laravel/installer

# Add Composer global bin to PATH (for current session and bashrc)
export PATH="$PATH:$HOME/.composer/vendor/bin"
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc

#########################################
# Final Checks
#########################################

echo ""
echo "✅ PHP version: $(php -v | head -n 1)"
echo "✅ Composer version: $(composer --version)"
echo "✅ Node version: $(node -v)"
echo "✅ NPM version: $(npm -v)"
echo "✅ Git version: $(git --version)"
echo "✅ MySQL version: $(mysql --version)"
echo "✅ Redis version: $(redis-server --version | head -n 1)"
echo "✅ Laravel version: $(~/.composer/vendor/bin/laravel --version || echo 'Laravel not yet available')"

echo ""
echo "🎉 All done! Your RILT stack is ready to go."