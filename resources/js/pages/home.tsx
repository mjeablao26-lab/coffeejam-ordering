import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Coffee, ShieldCheck, Sparkles } from 'lucide-react';
import CoffeejamLayout from '@/components/coffeejam-layout';
import { peso  } from '@/types/coffeejam';
import type {Product} from '@/types/coffeejam';

export default function Home({ featuredProducts }: { featuredProducts: Product[] }) {
    return (
        <CoffeejamLayout>
            <Head title="Your Daily Fuel" />
            <section className="overflow-hidden bg-white">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
                    <div>
                        <span className="mb-5 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-black tracking-[0.18em] text-[#2316b8]">EST. 2025 · FRESHLY MADE</span>
                        <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">Your daily fuel, now a few clicks away.</h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Discover Coffeejam favorites, place your order online, and get a clear summary before pickup.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-[#2316b8] px-6 py-3.5 font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-0.5">Explore the menu <ArrowRight className="size-5" /></Link>
                            <a href="#favorites" className="rounded-full border border-slate-300 px-6 py-3.5 font-bold hover:border-[#2316b8] hover:text-[#2316b8]">See favorites</a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-5 rounded-[2.5rem] bg-indigo-100 blur-2xl" />
                        <img src="/images/coffeejam-hero-no-circle.png" alt="Coffeejam Americano, Biscoff latte, and matcha latte" className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" />
                        <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-4 shadow-xl">
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Starting at</div>
                            <div className="text-2xl font-black text-[#2316b8]">₱45</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:grid-cols-3 lg:px-8">
                {[
                    [Coffee, 'Real menu', 'Coffee and non-coffee favorites based on the current Coffeejam menu.'],
                    [Sparkles, 'Freshly prepared', 'Every drink is prepared after your order is received.'],
                    [ShieldCheck, 'Clear summary', 'Review the item, quantity, and total before pickup.'],
                ].map(([Icon, title, copy]) => (
                    <article key={String(title)} className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                        <Icon className="mb-4 size-8 text-[#2316b8]" />
                        <h2 className="text-lg font-black">{String(title)}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{String(copy)}</p>
                    </article>
                ))}
            </section>

            <section id="favorites" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div><p className="font-bold text-[#2316b8]">CUSTOMER FAVORITES</p><h2 className="mt-1 text-3xl font-black tracking-tight">Pick your next cup</h2></div>
                    <Link href="/menu" className="hidden items-center gap-2 font-bold text-[#2316b8] sm:flex">Full menu <ArrowRight className="size-4" /></Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-indigo-100 transition hover:-translate-y-1 hover:shadow-xl">
                            <img src={product.image || '/images/picture1.jpg'} alt={product.name} className="aspect-[16/10] w-full object-cover" />
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-black">{product.name}</h3><span className="font-black text-[#2316b8]">{peso(product.price)}</span></div>
                                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>
                                <Link href={`/order/${product.id}`} className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#2316b8] px-4 py-3 font-bold text-white hover:bg-[#170c8f]">Order this drink</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </CoffeejamLayout>
    );
}
