# Free Render Deployment

This repository includes a Render Blueprint that creates a free Docker web service and a free PostgreSQL database in Singapore.

## Before deploying

Generate a production application key locally:

```powershell
php artisan key:generate --show
```

Copy the complete result beginning with `base64:`. This value is a secret and must only be entered in Render.

Prepare a new administrator password containing at least 12 characters. Do not reuse an important personal password.

## Create the Render Blueprint

1. Sign up at https://render.com using GitHub.
2. Give Render access only to `mjeablao26-lab/coffeejam-ordering`.
3. In the Render Dashboard, select **New > Blueprint**.
4. Connect the `coffeejam-ordering` repository.
5. Render detects `render.yaml` and displays the two free resources.
6. Enter the prompted secret values:
   - `APP_KEY`: the complete `base64:...` result generated locally.
   - `COFFEEJAM_ADMIN_EMAIL`: `mjeablao26@tip.edu.ph`.
   - `COFFEEJAM_ADMIN_PASSWORD`: a new password containing at least 12 characters.
7. Create or apply the Blueprint and wait for the build and first startup to finish.

The startup script automatically caches Laravel configuration, runs database migrations, creates the administrator, and seeds the eight default products.

## Verify the public application

Open the generated `https://coffeejam-ordering.onrender.com` address shown in the Render dashboard. The exact hostname can include a suffix if the preferred name is already taken.

Verify:

- `/up` returns a successful response.
- `/` displays the landing page.
- `/menu` displays eight products and their images.
- `/login` accepts the configured administrator credentials.
- `/admin` displays the dashboard.
- `/admin/products` displays product management.
- `/admin/orders` displays customer orders.

Submit one public order and change its status in the administrator panel.

## Free-tier limitations

- The web service sleeps after 15 minutes without traffic, so the first request after sleeping can take about one minute.
- The free PostgreSQL database expires after 30 days.
- The filesystem is temporary. Default product images remain safe because they are committed in the repository. Images uploaded through the admin panel may disappear after a restart or deployment.

Deploy close enough to the project-checking date that the free database remains active. Add the final Render URL to the PDF documentation after testing.
