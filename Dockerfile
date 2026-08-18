FROM php:8.4-apache-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libicu-dev \
        libonig-dev \
        libpq-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        intl \
        mbstring \
        opcache \
        pdo_pgsql \
        zip \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV COMPOSER_ALLOW_SUPERUSER=1

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
        /etc/apache2/sites-available/*.conf \
        /etc/apache2/apache2.conf \
        /etc/apache2/conf-available/*.conf \
    && sed -ri -e '/<Directory \/var\/www\/>/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' \
        /etc/apache2/apache2.conf

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install \
        --no-dev \
        --no-interaction \
        --prefer-dist \
        --optimize-autoloader \
    && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && php artisan storage:link \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod +x /var/www/html/scripts/00-render-deploy.sh

CMD ["/var/www/html/scripts/00-render-deploy.sh"]
