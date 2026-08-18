import { Link, router, usePage } from '@inertiajs/react';
import { Coffee, LogOut, Menu, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

export default function CoffeejamLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/menu' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f7ff] text-slate-950">
            <header className="sticky top-0 z-40 border-b border-indigo-100 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/logo.jpg" alt="Coffeejam" className="h-11 w-14 rounded-lg object-cover object-center" />
                        <div>
                            <div className="text-xl font-black tracking-tight text-[#2316b8]">Coffeejam</div>
                            <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500">YOUR DAILY FUEL</div>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className="transition hover:text-[#2316b8]">
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-[#2316b8] px-5 py-2.5 text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-[#170c8f]">
                            <ShoppingBag className="size-4" /> Order now
                        </Link>
                        {auth.user ? (
                            auth.user.is_admin ? (
                                <Link href="/admin" className="inline-flex items-center gap-1 text-slate-500 hover:text-[#2316b8]">
                                    <ShieldCheck className="size-4" /> Admin
                                </Link>
                            ) : (
                                <button type="button" onClick={() => router.post('/logout')} className="inline-flex items-center gap-1 text-slate-500 hover:text-[#2316b8]">
                                    <LogOut className="size-4" /> Log out
                                </button>
                            )
                        ) : (
                            <Link href="/login" className="inline-flex items-center gap-1 text-slate-500 hover:text-[#2316b8]">
                                <ShieldCheck className="size-4" /> Admin login
                            </Link>
                        )}
                    </nav>

                    <button type="button" onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-label="Toggle navigation">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>

                {open && (
                    <nav className="space-y-1 border-t border-indigo-100 bg-white px-5 py-4 md:hidden">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 font-semibold hover:bg-indigo-50" onClick={() => setOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/menu" className="block rounded-lg bg-[#2316b8] px-3 py-2 font-semibold text-white">Order now</Link>
                        {auth.user ? (
                            auth.user.is_admin ? (
                                <Link href="/admin" className="block rounded-lg px-3 py-2 font-semibold">Admin</Link>
                            ) : (
                                <button type="button" onClick={() => router.post('/logout')} className="block w-full rounded-lg px-3 py-2 text-left font-semibold">Log out</button>
                            )
                        ) : (
                            <Link href="/login" className="block rounded-lg px-3 py-2 font-semibold">Admin login</Link>
                        )}
                    </nav>
                )}
            </header>

            <main>{children}</main>

            <footer className="mt-20 bg-[#17105f] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 lg:px-8">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-2xl font-black"><Coffee /> Coffeejam</div>
                        <p className="max-w-sm text-sm leading-6 text-indigo-100">Freshly prepared drinks made to keep your day moving. Established in 2025.</p>
                    </div>
                    <div>
                        <h2 className="mb-3 font-bold">Quick links</h2>
                        <div className="space-y-2 text-sm text-indigo-100">
                            <Link href="/" className="block hover:text-white">Home</Link>
                            <Link href="/menu" className="block hover:text-white">Coffee menu</Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-3 font-bold">Ordering hours</h2>
                        <p className="text-sm leading-6 text-indigo-100">Open daily for pickup orders. Submit your order online and wait for confirmation.</p>
                    </div>
                </div>
                <div className="border-t border-white/10 py-5 text-center text-xs text-indigo-200">© 2026 Coffeejam. Your daily fuel.</div>
            </footer>
        </div>
    );
}
