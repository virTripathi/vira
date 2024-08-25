FROM php:8.0.3-apache

WORKDIR /var/www/html

# Installing required dependencies
RUN a2enmod rewrite
RUN apt-get update && apt-get -y install gcc mono-mcs && rm -rf /var/lib/apt/lists/*
RUN apt-get update -y && apt-get install -y libicu-dev libmariadb-dev unzip zip zlib1g-dev libpng-dev libjpeg-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev default-libmysqlclient-dev gcc
RUN apt-get -y update && apt-get -y install curl

# Installing Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installing PHP extensions
RUN docker-php-ext-install gettext intl pdo_mysql gd
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg && docker-php-ext-install -j$(nproc) gd

# Installing Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Copy application files into the container
COPY . .

# Ensure correct ownership and permissions for the application directory
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Installing NPM dependencies
RUN npm install

# Build frontend assets
RUN npm run build  # Or `npm run dev` if you are in development mode
