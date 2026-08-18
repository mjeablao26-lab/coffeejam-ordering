import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin-layout';
import { peso  } from '@/types/coffeejam';
import type {Product} from '@/types/coffeejam';

export default function ProductsIndex({ products }: { products: Product[] }) {
    const remove = (product: Product) => {
        if (window.confirm(`Delete ${product.name}? Existing orders will be preserved.`)) {
            router.delete(`/admin/products/${product.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Product Management">
            <Head title="Manage Products" />
            <div className="mb-5 flex justify-end"><Link href="/admin/products/create" className="inline-flex items-center gap-2 rounded-xl bg-[#2316b8] px-5 py-3 font-bold text-white"><Plus className="size-4" /> Add product</Link></div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Availability</th><th className="p-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{products.map((product) => <tr key={product.id}><td className="p-4"><div className="flex items-center gap-3"><img src={product.image || '/images/picture1.jpg'} alt="" className="size-14 rounded-xl object-cover" /><div><div className="font-bold">{product.name}</div><div className="max-w-md truncate text-xs text-slate-500">{product.description}</div></div></div></td><td className="p-4 font-bold">{peso(product.price)}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${product.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>{product.is_available ? 'Available' : 'Unavailable'}</span></td><td className="p-4"><div className="flex justify-end gap-2"><Link href={`/admin/products/${product.id}/edit`} className="rounded-lg bg-indigo-50 p-2 text-[#2316b8]" aria-label={`Edit ${product.name}`}><Pencil className="size-4" /></Link><button type="button" onClick={() => remove(product)} className="rounded-lg bg-red-50 p-2 text-red-600" aria-label={`Delete ${product.name}`}><Trash2 className="size-4" /></button></div></td></tr>)}</tbody></table>
                </div>
            </div>
        </AdminLayout>
    );
}
