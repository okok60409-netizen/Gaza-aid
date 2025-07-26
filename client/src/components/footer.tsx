import { Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-emerald-500">Gaza Relief</span>
            </div>
            <p className="text-slate-400 text-sm">
              Connecting compassionate donors with verified charities supporting Gaza.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="hover:text-emerald-500 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("donations")} 
                  className="hover:text-emerald-500 transition-colors"
                >
                  Donations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="hover:text-emerald-500 transition-colors"
                >
                  About
                </button>
              </li>

            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Security & Privacy</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Enhanced security protection</li>
              <li>IP masking & privacy protection</li>
              <li>Military-grade encryption</li>
              <li>Anonymous donation routing</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-slate-400 text-sm mb-2">
            "Allah S.W.T knows best, and we can only guess"
          </p>
          <p className="text-xs text-slate-500">
            © 2025 Gaza Relief Platform. Secure, anonymous, and protected humanitarian aid portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
