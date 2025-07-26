import { useState } from "react";
import { 
  Heart, 
  HandHelping as HandsHelping, 
  UserCheck, 
  Home, 
  Globe2, 
  Sprout,
  ExternalLink,
  CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { charities } from "@/data/charities";

const iconMap = {
  heart: Heart,
  "hands-helping": HandsHelping,
  "user-doctor": UserCheck,
  home: Home,
  globe: Globe2,
  seedling: Sprout,
};

const colorMap = {
  emerald: "bg-emerald-500 hover:bg-emerald-600",
  amber: "bg-amber-500 hover:bg-amber-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  red: "bg-red-500 hover:bg-red-600",
  green: "bg-green-500 hover:bg-green-600",
};

const iconColorMap = {
  emerald: "bg-emerald-500/20 text-emerald-500",
  amber: "bg-amber-500/20 text-amber-500",
  blue: "bg-blue-500/20 text-blue-400",
  purple: "bg-purple-500/20 text-purple-400",
  red: "bg-red-500/20 text-red-400",
  green: "bg-green-500/20 text-green-400",
};

export default function DonationsSection() {
  const handleDonate = (charity: typeof charities[0]) => {
    window.open(charity.donationUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="donations" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-500">
            Make a Donation
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose from verified Muslim charities working directly in Gaza to provide humanitarian aid
          </p>
          <div className="text-sm text-slate-400 mt-4 font-medium">
            Allah S.W.T knows best, and we can only guess
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {charities.map((charity) => {
            const IconComponent = iconMap[charity.icon as keyof typeof iconMap];
            const buttonColor = colorMap[charity.color as keyof typeof colorMap];
            const iconColor = iconColorMap[charity.color as keyof typeof iconColorMap];
            
            return (
              <div
                key={charity.id}
                className="charity-card bg-slate-800/60 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500 transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-100">
                          {charity.name}
                        </h3>
                        <div className="text-sm text-slate-400">
                          {charity.categories.join(" • ")}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        charity.verificationBadge === "UN Official" 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {charity.verificationBadge}
                    </Badge>
                  </div>

                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                    {charity.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {charity.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleDonate(charity)}
                    className={`w-full text-white font-medium transition-colors ${buttonColor}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}