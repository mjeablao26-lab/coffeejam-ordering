import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/admin-layout';
import ProductForm from '@/components/product-form';
import type { Product } from '@/types/coffeejam';

export default function EditProduct({ product }: { product: Product }) {
    return <AdminLayout title={`Edit ${product.name}`}><Head title={`Edit ${product.name}`} /><ProductForm product={product} /></AdminLayout>;
}
