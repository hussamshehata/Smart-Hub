import ProductCard from "../components/ProductCard";

export default function Shop() {
    return (
        <section className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Shop</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </section>
    );
}
