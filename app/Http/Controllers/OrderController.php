<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function create(Product $product): Response
    {
        abort_unless($product->is_available, 404);

        return Inertia::render('orders/create', [
            'product' => $product,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:50'],
            'customer_name' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:30'],
            'address' => ['required', 'string', 'max:1000'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $product = Product::query()
            ->where('is_available', true)
            ->findOrFail($validated['product_id']);

        $order = Order::create([
            'order_number' => $this->makeOrderNumber(),
            'product_id' => $product->id,
            'product_name' => $product->name,
            'unit_price' => $product->price,
            'size' => '16 oz',
            'quantity' => $validated['quantity'],
            'total_amount' => (float) $product->price * $validated['quantity'],
            'customer_name' => $validated['customer_name'],
            'contact_number' => $validated['contact_number'],
            'address' => $validated['address'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'Pending',
        ]);

        return to_route('orders.show', ['order' => $order->order_number]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    private function makeOrderNumber(): string
    {
        do {
            $number = 'CJ-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
        } while (Order::query()->where('order_number', $number)->exists());

        return $number;
    }
}
