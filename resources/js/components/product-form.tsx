import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { Product } from '@/types/coffeejam';

export default function ProductForm({ product }: { product?: Product }) {
    const form = useForm({
        name: product?.name ?? '',
        description: product?.description ?? '',
        price: product ? String(product.price) : '',
        image: null as File | null,
        is_available: product?.is_available ?? true,
        ...(product ? { _method: 'put' } : {}),
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post(product ? `/admin/products/${product.id}` : '/admin/products', { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Product name" error={form.errors.name}><input className="field" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Example: Caramel Latte" /></FormField>
                <FormField label="Price" error={form.errors.price}><input className="field" type="number" min="0" step="0.01" value={form.data.price} onChange={(e) => form.setData('price', e.target.value)} placeholder="99" /></FormField>
                <FormField label="Description" error={form.errors.description} wide><textarea className="field min-h-28" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} /></FormField>
                <FormField label="Product image" error={form.errors.image} wide><input className="field" type="file" accept="image/*" onChange={(e) => form.setData('image', e.target.files?.[0] ?? null)} />{product?.image && <img src={product.image} alt="Current product" className="mt-3 h-28 rounded-xl object-cover" />}</FormField>
                <label className="flex items-center gap-3 sm:col-span-2"><input type="checkbox" checked={form.data.is_available} onChange={(e) => form.setData('is_available', e.target.checked)} className="size-5 accent-[#2316b8]" /><span className="font-bold">Available for ordering</span></label>
            </div>
            <div className="mt-7 flex gap-3"><button disabled={form.processing} className="rounded-xl bg-[#2316b8] px-6 py-3 font-bold text-white disabled:opacity-50">{form.processing ? 'Saving…' : product ? 'Update product' : 'Add product'}</button><Link href="/admin/products" className="rounded-xl border border-slate-300 px-6 py-3 font-bold">Cancel</Link></div>
        </form>
    );
}

function FormField({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
    return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-1 block text-sm text-red-600">{error}</span>}</label>;
}
