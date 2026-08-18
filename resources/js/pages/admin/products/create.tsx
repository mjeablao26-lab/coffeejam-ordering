import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/admin-layout';
import ProductForm from '@/components/product-form';

export default function CreateProduct() {
    return <AdminLayout title="Add Product"><Head title="Add Product" /><ProductForm /></AdminLayout>;
}
