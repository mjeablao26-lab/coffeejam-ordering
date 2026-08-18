import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import CoffeejamLayout from '@/components/coffeejam-layout';
import { peso  } from '@/types/coffeejam';
import type {Order} from '@/types/coffeejam';

export default function OrderSummary({ order }: { order: Order }) {
    return (
        <CoffeejamLayout>
            <Head title={`Order ${order.order_number}`} />
            <section className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-indigo-100">
                    <div className="bg-[#2316b8] px-6 py-9 text-center text-white"><CheckCircle2 className="mx-auto mb-3 size-12" /><p className="text-sm font-bold tracking-[0.18em] text-indigo-200">ORDER RECEIVED</p><h1 className="mt-2 text-3xl font-black">Thank you, {order.customer_name}!</h1><p className="mt-2 text-indigo-100">Keep your order number for reference.</p></div>
                    <div className="p-6 sm:p-8">
                        <div className="mb-7 rounded-2xl bg-indigo-50 p-5 text-center"><div className="text-xs font-bold uppercase tracking-wider text-indigo-500">Order number</div><div className="mt-1 text-2xl font-black text-[#2316b8]">{order.order_number}</div><span className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">{order.status}</span></div>
                        <dl className="divide-y divide-slate-100 text-sm">
                            <Row label="Product" value={order.product_name} />
                            <Row label="Size" value={order.size} />
                            <Row label="Unit price" value={peso(order.unit_price)} />
                            <Row label="Quantity" value={String(order.quantity)} />
                            <Row label="Customer" value={order.customer_name} />
                            <Row label="Contact" value={order.contact_number} />
                            <Row label="Address" value={order.address} />
                            {order.notes && <Row label="Notes" value={order.notes} />}
                        </dl>
                        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-950 p-5 text-white"><span className="font-bold">Order total</span><strong className="text-2xl">{peso(order.total_amount)}</strong></div>
                        <Link href="/menu" className="mt-6 block rounded-xl border border-slate-300 px-5 py-3 text-center font-bold hover:border-[#2316b8] hover:text-[#2316b8]">Order another drink</Link>
                    </div>
                </div>
            </section>
        </CoffeejamLayout>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return <div className="grid grid-cols-[120px_1fr] gap-4 py-3"><dt className="font-semibold text-slate-500">{label}</dt><dd className="font-medium text-slate-900">{value}</dd></div>;
}
