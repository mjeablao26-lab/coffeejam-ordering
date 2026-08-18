<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'products' => Product::query()->count(),
                'availableProducts' => Product::query()->where('is_available', true)->count(),
                'orders' => Order::query()->count(),
                'pendingOrders' => Order::query()->where('status', 'Pending')->count(),
                'sales' => Order::query()->where('status', 'Completed')->sum('total_amount'),
            ],
            'recentOrders' => Order::query()->latest()->limit(6)->get(),
        ]);
    }
}
