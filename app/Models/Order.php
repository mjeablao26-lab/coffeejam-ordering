<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'order_number',
    'product_id',
    'product_name',
    'unit_price',
    'size',
    'quantity',
    'total_amount',
    'customer_name',
    'contact_number',
    'address',
    'notes',
    'status',
])]
class Order extends Model
{
    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'quantity' => 'integer',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
