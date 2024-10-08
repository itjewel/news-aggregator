# Base image
FROM php:8.1-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache bash \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    libzip-dev \
    unzip \
    curl \
    git \
    icu-dev \
    libxslt-dev \
    oniguruma-dev \
    zlib-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set file permissions to ensure proper access
RUN chown -R www-data:www-data /var/www/html

# Copy composer files first for better caching
COPY composer.json composer.lock ./ 

# Install PHP dependencies using Composer
RUN composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist --ignore-platform-reqs --no-progress --no-scripts

# Copy the application files
COPY . .

# Set file permissions again for storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose the application on port 8000
EXPOSE 8000

# Start the Laravel development server and run migrations
CMD php artisan migrate && php artisan serve --host=0.0.0.0 --port=8000
