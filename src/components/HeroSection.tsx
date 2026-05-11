export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
        {/* Left Banner */}
        <div className="relative text-white flex flex-col justify-end min-h-[240px] sm:min-h-[320px] md:min-h-[440px] overflow-hidden group cursor-pointer rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&q=80"
            alt="2025/26 Home Kits"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 p-6 sm:p-8 md:p-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-gold-light)] mb-2">
              New Season
            </p>
            <h2 className="font-[var(--font-oswald)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-2 sm:mb-3 leading-tight">
              2025/26 Home Kits
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-4 max-w-xs">
              Rep your team with the latest match-day jerseys.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-[var(--color-charcoal)] font-bold text-[10px] sm:text-xs px-5 sm:px-7 py-2.5 sm:py-3 uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Banner */}
        <div className="relative text-white flex flex-col justify-end min-h-[240px] sm:min-h-[320px] md:min-h-[440px] overflow-hidden group cursor-pointer rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop&q=80"
            alt="African Retro Collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 p-6 sm:p-8 md:p-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-gold-light)] mb-2">
              Limited Edition
            </p>
            <h2 className="font-[var(--font-oswald)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-2 sm:mb-3 leading-tight">
              African Retro Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-4 max-w-xs">
              Classic designs inspired by legendary African football moments.
            </p>
            <a
              href="#"
              className="inline-block bg-[var(--color-gold)] text-white font-bold text-[10px] sm:text-xs px-5 sm:px-7 py-2.5 sm:py-3 uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
