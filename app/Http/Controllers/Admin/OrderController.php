<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/orders/index', [
            'orders' => Order::query()->latest()->get(),
            'statuses' => ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'],
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:Pending,Preparing,Ready,Completed,Cancelled'],
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated.');
    }
}
