import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import CoffeejamLayout from '@/components/coffeejam-layout';
import { peso  } from '@/types/coffeejam';
import type {Product} from '@/types/coffeejam';

export default function CreateOrder({ product }: { product: Product }) {
    const form = useForm({
        product_id: product.id,
        quantity: 1,
        customer_name: '',
        contact_number: '',
        address: '',
        notes: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/orders');
    };

    return (
        <CoffeejamLayout>
            <Head title={`Order ${product.name}`} />
            <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-indigo-100">
                    <img src={product.image || '/images/picture1.jpg'} alt={product.name} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-6"><p className="text-xs font-black tracking-[0.18em] text-[#2316b8]">YOUR SELECTION</p><h1 className="mt-2 text-3xl font-black">{product.name}</h1><p className="mt-3 leading-7 text-slate-600">{product.description}</p><div className="mt-5 flex justify-between border-t border-slate-100 pt-5"><span>Regular 16 oz</span><strong className="text-xl text-[#2316b8]">{peso(product.price)}</strong></div></div>
                </aside>

                <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100 sm:p-8">
                    <p className="text-xs font-black tracking-[0.18em] text-[#2316b8]">ORDER FORM</p>
                    <h2 className="mt-2 text-3xl font-black">Tell us where to reach you</h2>
                    <p className="mt-2 text-sm text-slate-600">Complete the form below. Payment is handled when you pick up your order.</p>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <Field label="Customer name" error={form.errors.customer_name}><input value={form.data.customer_name} onChange={(e) => form.setData('customer_name', e.target.value)} className="field" placeholder="Your full name" /></Field>
                        <Field label="Contact number" error={form.errors.contact_number}><input value={form.data.contact_number} onChange={(e) => form.setData('contact_number', e.target.value)} className="field" placeholder="09XX XXX XXXX" /></Field>
                        <Field label="Quantity" error={form.errors.quantity}>
                            <input type="number" min="1" max="50" value={form.data.quantity} onChange={(e) => form.setData('quantity', Number(e.target.value))} className="field" />
                        </Field>
                        <div className="rounded-xl bg-indigo-50 p-4"><div className="text-xs font-bold uppercase tracking-wider text-indigo-500">Estimated total</div><div className="mt-1 text-2xl font-black text-[#2316b8]">{peso(Number(product.price) * form.data.quantity)}</div></div>
                        <Field label="Pickup address / location" error={form.errors.address} wide><textarea value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} className="field min-h-24" placeholder="Your complete address or pickup reference" /></Field>
                        <Field label="Order notes (optional)" error={form.errors.notes} wide><textarea value={form.data.notes} onChange={(e) => form.setData('notes', e.target.value)} className="field min-h-20" placeholder="Example: less ice, no straw" /></Field>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <button disabled={form.processing} className="rounded-xl bg-[#2316b8] px-6 py-3 font-bold text-white hover:bg-[#170c8f] disabled:opacity-50">{form.processing ? 'Submitting…' : 'Submit order'}</button>
                        <Link href="/menu" className="rounded-xl border border-slate-300 px-6 py-3 font-bold hover:border-[#2316b8]">Back to menu</Link>
                    </div>
                </form>
            </section>
        </CoffeejamLayout>
    );
}

function Field({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
    return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-1 block text-sm text-red-600">{error}</span>}</label>;
}
