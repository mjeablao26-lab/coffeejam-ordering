import { Link, router, usePage } from '@inertiajs/react';
import { Coffee, LayoutDashboard, LogOut, Package, ReceiptText, Store } from 'lucide-react';

const links = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ReceiptText },
];

export default function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
    const page = usePage();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
                    <Link href="/admin" className="flex items-center gap-2 text-xl font-black text-[#2316b8]"><Coffee /> Coffeejam Admin</Link>
                    <nav className="flex flex-wrap items-center gap-1">
                        {links.map(({ label, href, icon: Icon }) => (
                            <Link key={href} href={href} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${page.url === href || (href !== '/admin' && page.url.startsWith(href)) ? 'bg-indigo-100 text-[#2316b8]' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <Icon className="size-4" /> {label}
                            </Link>
                        ))}
                        <Link href="/" className="ml-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Store className="size-4" /> View shop</Link>
                        <button type="button" onClick={() => router.post('/logout')} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut className="size-4" /> Log out</button>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                <h1 className="mb-7 text-3xl font-black tracking-tight">{title}</h1>
                {children}
            </main>
        </div>
    );
}
