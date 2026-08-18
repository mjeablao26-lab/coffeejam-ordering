<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\User;

test('customers can browse the coffee menu', function () {
    Product::create([
        'name' => 'Spanish Latte',
        'description' => 'Sweet and creamy.',
        'price' => 110,
        'image' => '/images/picture1.jpg',
        'is_available' => true,
    ]);

    $this->get(route('home'))->assertOk();
    $this->get(route('products.index'))
        ->assertOk()
        ->assertSee('Spanish Latte');
});

test('customers can submit an order and view its summary', function () {
    $product = Product::create([
        'name' => 'Americano',
        'description' => 'Bold and refreshing.',
        'price' => 85,
        'is_available' => true,
    ]);

    $response = $this->post(route('orders.store'), [
        'product_id' => $product->id,
        'quantity' => 2,
        'customer_name' => 'Juan Dela Cruz',
        'contact_number' => '09123456789',
        'address' => 'Quezon City',
        'notes' => 'Less ice',
    ]);

    $order = Order::firstOrFail();

    $response->assertRedirect(route('orders.show', ['order' => $order->order_number]));
    expect((float) $order->total_amount)->toBe(170.0);
    $this->get(route('orders.show', ['order' => $order->order_number]))
        ->assertOk()
        ->assertSee($order->order_number);
});

test('only administrators can open the admin panel', function () {
    $regularUser = User::factory()->create(['is_admin' => false]);
    $admin = User::factory()->create(['is_admin' => true]);

    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
    $this->actingAs($regularUser)->get(route('admin.dashboard'))->assertForbidden();
    $this->actingAs($admin)->get(route('admin.dashboard'))->assertOk();
});
