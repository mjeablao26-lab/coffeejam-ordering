export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: string | number;
    image: string | null;
    is_available: boolean;
};

export type Order = {
    id: number;
    order_number: string;
    product_id: number | null;
    product_name: string;
    unit_price: string | number;
    size: string;
    quantity: number;
    total_amount: string | number;
    customer_name: string;
    contact_number: string;
    address: string;
    notes: string | null;
    status: string;
    created_at: string;
};

export const peso = (value: string | number) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
    }).format(Number(value));
