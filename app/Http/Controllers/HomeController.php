<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('home', [
            'featuredProducts' => Product::query()
                ->where('is_available', true)
                ->orderBy('id')
                ->limit(6)
                ->get(),
        ]);
    }
}
