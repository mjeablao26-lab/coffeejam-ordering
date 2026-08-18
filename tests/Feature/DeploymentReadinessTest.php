<?php

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Hash;

test('production credentials create an administrator during seeding', function () {
    config()->set('coffeejam.admin', [
        'name' => 'Coffeejam Administrator',
        'email' => 'admin@coffeejam.test',
        'password' => 'a-secure-test-password',
    ]);

    $this->seed(DatabaseSeeder::class);

    $administrator = User::query()->where('email', 'admin@coffeejam.test')->firstOrFail();

    expect($administrator->name)->toBe('Coffeejam Administrator')
        ->and($administrator->is_admin)->toBeTrue()
        ->and($administrator->email_verified_at)->not->toBeNull()
        ->and(Hash::check('a-secure-test-password', $administrator->password))->toBeTrue();
});

test('running the production seeder again does not duplicate or reset the administrator', function () {
    config()->set('coffeejam.admin', [
        'name' => 'Coffeejam Administrator',
        'email' => 'admin@coffeejam.test',
        'password' => 'original-test-password',
    ]);

    $this->seed(DatabaseSeeder::class);
    $originalPassword = User::query()->where('email', 'admin@coffeejam.test')->value('password');

    config()->set('coffeejam.admin.password', 'different-test-password');
    $this->seed(DatabaseSeeder::class);

    expect(User::query()->where('email', 'admin@coffeejam.test')->count())->toBe(1)
        ->and(User::query()->where('email', 'admin@coffeejam.test')->value('password'))->toBe($originalPassword);
});

test('administrator deployment credentials must be complete and strong', function (array $admin, string $message) {
    config()->set('coffeejam.admin', $admin);

    expect(fn () => $this->seed(DatabaseSeeder::class))
        ->toThrow(InvalidArgumentException::class, $message);
})->with([
    'missing password' => [
        ['name' => 'Admin', 'email' => 'admin@coffeejam.test', 'password' => null],
        'Both COFFEEJAM_ADMIN_EMAIL and COFFEEJAM_ADMIN_PASSWORD must be configured.',
    ],
    'invalid email' => [
        ['name' => 'Admin', 'email' => 'not-an-email', 'password' => 'a-secure-test-password'],
        'COFFEEJAM_ADMIN_EMAIL must be a valid email address.',
    ],
    'short password' => [
        ['name' => 'Admin', 'email' => 'admin@coffeejam.test', 'password' => 'too-short'],
        'COFFEEJAM_ADMIN_PASSWORD must contain at least 12 characters.',
    ],
]);
