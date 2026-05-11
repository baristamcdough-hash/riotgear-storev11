import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full">
        {/* Hero Split Banner */}
        <HeroSection />

        {/* Product Grid */}
        <ProductGrid />
      </main>

      <Footer />

      {/* Cart Drawer (slides in from right) */}
      <CartDrawer />
    </div>
  );
}
