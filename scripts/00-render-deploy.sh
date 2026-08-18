#!/usr/bin/env bash

set -euo pipefail

echo "Caching Laravel configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Running database migrations..."
php artisan migrate --force

echo "Seeding the administrator and Coffeejam products..."
php artisan db:seed --force

echo "Render startup preparation completed."

exec apache2-foreground
