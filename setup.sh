#!/bin/bash

echo "🚀 Starting full RILT stack setup on Ubuntu EC2..."

# Update system
sudo apt update -y && sudo apt upgrade -y

# Basic tools
sudo apt install -y git curl unzip tar build-essential software-properties-common

#########################################
# PHP 8.2 + Composer
#########################################

# Add Ondrej PPA for PHP
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update -y

# Install PHP 8.2 and extensions
sudo apt install -y php8.2 php8.2-cli php8.2-mbstring php8.2-xml php8.2-curl \
    php8.2-mysql php8.2-zip php8.2-bcmath php8.2-soap php8.2-intl php8.2-readline

# Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
rm composer-setup.php

#########################################
# Node.js 22 + PM2
#########################################

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

#########################################
# MySQL 8.0
#########################################

# Install MySQL server
sudo apt install -y mysql-server

# Start & enable MySQL
sudo systemctl enable mysql
sudo systemctl start mysql

# Optionally secure MySQL (manual input required)
# sudo mysql_secure_installation

#########################################
# Nginx
#########################################

sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

#########################################
# Redis
#########################################

sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

#########################################
# Laravel Installer
#########################################

composer global require laravel/installer

# Add Composer global bin to PATH (for current session and bashrc/zshrc)
export PATH="$PATH:$HOME/.config/composer/vendor/bin"
echo 'export PATH="$PATH:$HOME/.config/composer/vendor/bin"' >> ~/.bashrc

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
echo "✅ Laravel version: $(~/.config/composer/vendor/bin/laravel --version || echo 'Laravel not yet available')"

echo ""
echo "🎉 All done! Your RILT stack is ready to go."
