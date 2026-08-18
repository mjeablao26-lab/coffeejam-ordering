import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/components/admin-layout';
import { peso  } from '@/types/coffeejam';
import type {Order} from '@/types/coffeejam';

export default function OrdersIndex({ orders, statuses }: { orders: Order[]; statuses: string[] }) {
    return (
        <AdminLayout title="Customer Orders">
            <Head title="Customer Orders" />
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Item</th><th className="p-4">Address / Notes</th><th className="p-4">Total</th><th className="p-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{orders.map((order) => <tr key={order.id} className="align-top"><td className="p-4"><div className="font-bold text-[#2316b8]">{order.order_number}</div><div className="mt-1 text-xs text-slate-400">{new Date(order.created_at).toLocaleString('en-PH')}</div></td><td className="p-4"><div className="font-bold">{order.customer_name}</div><div className="text-slate-500">{order.contact_number}</div></td><td className="p-4"><div className="font-bold">{order.product_name}</div><div className="text-slate-500">{order.size} × {order.quantity}</div></td><td className="max-w-xs p-4"><div>{order.address}</div>{order.notes && <div className="mt-1 text-xs italic text-slate-500">Note: {order.notes}</div>}</td><td className="p-4 font-black">{peso(order.total_amount)}</td><td className="p-4"><select value={order.status} onChange={(e) => router.patch(`/admin/orders/${order.id}`, { status: e.target.value }, { preserveScroll: true })} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table>
                </div>
                {orders.length === 0 && <div className="p-10 text-center text-slate-500">No customer orders yet.</div>}
            </div>
        </AdminLayout>
    );
}
