export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Banner */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 md:p-12 flex flex-col justify-end min-h-[300px] md:min-h-[400px] overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
              New Season
            </p>
            <h2 className="font-[var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase mb-3">
              2025/26 Home Kits
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              Rep your team with the latest match-day jerseys.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-black font-bold text-sm px-6 py-3 uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Banner */}
        <div className="relative bg-gradient-to-br from-red-700 to-red-900 text-white p-8 md:p-12 flex flex-col justify-end min-h-[300px] md:min-h-[400px] overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-300 mb-2">
              Limited Edition
            </p>
            <h2 className="font-[var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase mb-3">
              African Retro Collection
            </h2>
            <p className="text-sm text-gray-200 mb-4">
              Classic designs inspired by legendary African football moments.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-black font-bold text-sm px-6 py-3 uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
