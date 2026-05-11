import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CheckoutOptions from "@/components/CheckoutButtons";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Split Banner */}
        <HeroSection />

        {/* Product Grid */}
        <ProductGrid />

        {/* Checkout Section Preview */}
        <section className="max-w-md mx-auto px-4 py-12">
          <CheckoutOptions amount={89.99} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
