# Coffeejam Laravel Cloud Deployment

This project is prepared for deployment from the `main` branch on Laravel Cloud.

## 1. Create the application

1. Sign in to Laravel Cloud using the GitHub account that can access `mjeablao26-lab/coffeejam-ordering`.
2. Create an application from the existing GitHub repository.
3. Select the `main` branch.
4. Choose the Singapore (`ap-southeast-1`) region when available.

## 2. Attach the database

Add a Laravel MySQL database to the production environment. Laravel Cloud injects the database connection variables after the resource is attached.

Do not deploy with the repository's local SQLite database. The local database file is excluded from Git and is intended only for development.

## 3. Configure environment variables

Add these variables in the production environment settings:

```dotenv
APP_NAME=Coffeejam
APP_ENV=production
APP_DEBUG=false
COFFEEJAM_ADMIN_NAME="John Eddie Ablao"
COFFEEJAM_ADMIN_EMAIL="mjeablao26@tip.edu.ph"
COFFEEJAM_ADMIN_PASSWORD="use-a-unique-password-with-at-least-12-characters"
```

Replace the example administrator password before deployment. Do not add the real password to GitHub, `.env.example`, screenshots, or documentation.

Laravel Cloud manages the application URL and attached database credentials. Confirm that `APP_URL` matches the Cloud domain after the environment is created.

## 4. Build and deploy commands

Use the build command detected by Laravel Cloud. If a custom command is required, use:

```bash
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
npm ci
npm run build
php artisan storage:link
php artisan optimize
```

Set the deploy command to:

```bash
php artisan migrate --force
php artisan db:seed --force
```

The seeder safely creates the production administrator once and keeps the eight default Coffeejam products synchronized. Re-running it does not duplicate the administrator or products and does not reset an existing administrator password.

## 5. Verify the deployment

Check each endpoint after deployment:

- `/up` returns a successful health response.
- `/` displays the landing page.
- `/menu` displays all seeded products and images.
- `/login` accepts the configured administrator email and password.
- `/admin` displays the dashboard after login.
- `/admin/products` allows products to be managed.
- `/admin/orders` displays submitted customer orders.

Submit one public test order and confirm that it appears in the administrator order list. Set its status to Completed to verify the full workflow.

## 6. Complete the project documentation

After verification, add the public Laravel Cloud URL, student number, and section to the final PDF documentation.

## Uploaded product image note

Laravel Cloud application filesystems are ephemeral. The eight seeded product images are part of the repository and remain available. Images uploaded later through the admin panel can be lost on a redeployment unless Laravel Object Storage is configured. This does not affect the default product catalog used for the final-project demonstration.
