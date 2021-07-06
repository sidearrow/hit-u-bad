FROM php:7.4.21-apache-buster

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update \
  && apt-get -y install \
  libzip-dev \
  libpng-dev \
  unzip \
  libonig-dev \
  && docker-php-ext-install \
  pdo_mysql \
  zip \
  gd \
  && a2enmod rewrite

COPY ./app/000-default.conf /etc/apache2/sites-enabled/000-default.conf

WORKDIR /app