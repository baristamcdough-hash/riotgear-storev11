export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] text-white mt-12 sm:mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        {/* 4-Column Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Column 1: Shop */}
          <div>
            <h4 className="text-[var(--color-gold)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5">Shop</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Kids</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Column 2: Teams */}
          <div>
            <h4 className="text-[var(--color-gold)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5">Teams</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Premier League</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">La Liga</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Serie A</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Bundesliga</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">African Teams</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-[var(--color-gold)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-[var(--color-gold)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Twitter/X</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">TikTok</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700/50 pt-8 mb-8">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-bold">We Accept</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="bg-white/10 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-sm border border-white/10">VISA</span>
            <span className="bg-white/10 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-sm border border-white/10">Mastercard</span>
            <span className="bg-[#49B642]/20 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-sm border border-[#49B642]/30 text-[#49B642]">M-Pesa</span>
            <span className="bg-[#09A5DB]/20 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-sm border border-[#09A5DB]/30 text-[#09A5DB]">Paystack</span>
            <span className="bg-white/10 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-sm border border-white/10">Stripe</span>
          </div>
        </div>

        {/* Sign-off */}
        <div className="border-t border-gray-700/50 pt-8 text-center">
          <p className="font-bold text-base sm:text-lg">
            made wt <span className="text-[var(--color-accent)]">♥️</span> by P.o.Riot🍄
          </p>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-2 tracking-wider">&copy; 2025 RiotGear Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
