import { HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToDonations = () => {
    const element = document.getElementById("donations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "5+", label: "Verified Charities", color: "text-emerald-500" },
    { value: "24/7", label: "Support Available", color: "text-green-500" },
  ];

  return (
    <section id="home" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
            Stand with Gaza
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Support humanitarian efforts in Gaza through verified Muslim charities. Every donation matters in providing essential aid to those in need.
          </p>
          <div className="text-sm text-slate-400 mb-8 font-medium">
            "Allah S.W.T knows best, and we can only guess"
          </div>
          <Button
            onClick={scrollToDonations}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <HandHeart className="w-5 h-5 mr-2" />
            Start Donating
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700"
            >
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
