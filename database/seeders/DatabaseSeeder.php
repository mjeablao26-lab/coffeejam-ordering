<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->orderBy('id')->first()?->update(['is_admin' => true]);

        $products = [
            ['name' => 'Americano', 'description' => 'Bold espresso mellowed with water for a clean, energizing cup.', 'price' => 85, 'image' => '/images/products/americano.png'],
            ['name' => 'Classic Latte', 'description' => 'Smooth espresso and creamy milk, balanced for an everyday favorite.', 'price' => 85, 'image' => '/images/products/classic-latte.png'],
            ['name' => 'Mocha', 'description' => 'Espresso, chocolate, and milk in one rich and comforting drink.', 'price' => 99, 'image' => '/images/products/mocha.png'],
            ['name' => 'Caramel Latte', 'description' => 'Creamy coffee with a buttery caramel finish.', 'price' => 99, 'image' => '/images/products/caramel-latte.png'],
            ['name' => 'Spanish Latte', 'description' => 'A sweet, full-bodied latte inspired by condensed-milk coffee.', 'price' => 110, 'image' => '/images/products/spanish-latte.png'],
            ['name' => 'Seasalt Latte', 'description' => 'Coffee topped with velvety sea-salt cream for a sweet-salty finish.', 'price' => 120, 'image' => '/images/products/seasalt-latte.png'],
            ['name' => 'Matcha Latte', 'description' => 'Earthy matcha blended with creamy milk and served refreshingly cold.', 'price' => 129, 'image' => '/images/products/matcha-latte.png'],
            ['name' => 'Biscoff Latte', 'description' => 'Espresso and milk with the warm caramel-spice flavor of Biscoff.', 'price' => 120, 'image' => '/images/products/biscoff-latte.png'],
        ];

        foreach ($products as $product) {
            Product::query()->updateOrCreate(
                ['name' => $product['name']],
                [...$product, 'is_available' => true],
            );
        }
    }
}
