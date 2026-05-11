export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12 sm:mt-16 w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* 4-Column Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Column 1: Shop */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Kids</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Column 2: Teams */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Teams</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Premier League</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">La Liga</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Serie A</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Bundesliga</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">African Teams</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Twitter/X</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">TikTok</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-3 font-bold">We Accept</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="bg-gray-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded">VISA</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded">Mastercard</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded">M-Pesa</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded">Paystack</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded">Stripe</span>
          </div>
        </div>

        {/* Sign-off */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="font-bold text-base sm:text-lg">made wt ♥️ by P.o.Riot🍄</p>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-2">&copy; 2025 RiotGear Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
