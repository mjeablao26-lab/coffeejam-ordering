import { Head, Link } from '@inertiajs/react';
import { Coffee } from 'lucide-react';
import CoffeejamLayout from '@/components/coffeejam-layout';
import { peso  } from '@/types/coffeejam';
import type {Product} from '@/types/coffeejam';

export default function ProductsIndex({ products }: { products: Product[] }) {
    return (
        <CoffeejamLayout>
            <Head title="Menu" />
            <section className="bg-[#2316b8] px-5 py-16 text-center text-white">
                <Coffee className="mx-auto mb-4 size-10" />
                <p className="font-bold tracking-[0.2em] text-indigo-200">COFFEEJAM MENU</p>
                <h1 className="mt-2 text-4xl font-black sm:text-5xl">Find your daily fuel</h1>
                <p className="mx-auto mt-4 max-w-2xl text-indigo-100">All listed drinks are served in our regular 16 oz size. Choose a drink and submit your pickup order.</p>
            </section>
            <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
                {products.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center text-slate-600">No products are available right now.</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <article key={product.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-indigo-100">
                                <img src={product.image || '/images/picture1.jpg'} alt={product.name} className="aspect-square w-full object-cover" />
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-start justify-between gap-3"><h2 className="text-xl font-black">{product.name}</h2><span className="font-black text-[#2316b8]">{peso(product.price)}</span></div>
                                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>
                                    <Link href={`/order/${product.id}`} className="mt-5 rounded-xl bg-[#2316b8] px-4 py-3 text-center font-bold text-white hover:bg-[#170c8f]">Order now</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </CoffeejamLayout>
    );
}
