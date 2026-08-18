import { Head, Link } from '@inertiajs/react';
import { Banknote, Clock3, Package, ReceiptText } from 'lucide-react';
import AdminLayout from '@/components/admin-layout';
import { peso  } from '@/types/coffeejam';
import type {Order} from '@/types/coffeejam';

type Stats = { products: number; availableProducts: number; orders: number; pendingOrders: number; sales: string | number };

export default function Dashboard({ stats, recentOrders }: { stats: Stats; recentOrders: Order[] }) {
    const cards = [
        ['Products', stats.products, `${stats.availableProducts} available`, Package],
        ['All orders', stats.orders, 'Customer orders', ReceiptText],
        ['Pending', stats.pendingOrders, 'Need attention', Clock3],
        ['Completed sales', peso(stats.sales), 'Completed orders only', Banknote],
    ] as const;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map(([label, value, note, Icon]) => <article key={label} className="rounded-2xl bg-white p-5 shadow-sm"><Icon className="mb-4 size-7 text-[#2316b8]" /><div className="text-sm font-semibold text-slate-500">{label}</div><div className="mt-1 text-3xl font-black">{value}</div><div className="mt-2 text-xs text-slate-400">{note}</div></article>)}
            </div>
            <section className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5"><h2 className="text-xl font-black">Recent orders</h2><Link href="/admin/orders" className="text-sm font-bold text-[#2316b8]">View all orders</Link></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Product</th><th className="p-4">Total</th><th className="p-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{recentOrders.map((order) => <tr key={order.id}><td className="p-4 font-bold text-[#2316b8]">{order.order_number}</td><td className="p-4">{order.customer_name}</td><td className="p-4">{order.product_name} × {order.quantity}</td><td className="p-4 font-bold">{peso(order.total_amount)}</td><td className="p-4"><StatusBadge status={order.status} /></td></tr>)}</tbody></table>
                    {recentOrders.length === 0 && <div className="p-10 text-center text-slate-500">No orders yet.</div>}
                </div>
            </section>
        </AdminLayout>
    );
}

function StatusBadge({ status }: { status: string }) {
    return <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">{status}</span>;
}
