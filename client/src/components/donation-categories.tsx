import { useState } from "react";
import { 
  Stethoscope, 
  Utensils, 
  Home, 
  GraduationCap, 
  Truck, 
  Sprout 
} from "lucide-react";
import { categories } from "@/data/charities";

const iconMap = {
  stethoscope: Stethoscope,
  utensils: Utensils,
  home: Home,
  "graduation-cap": GraduationCap,
  truck: Truck,
  seedling: Sprout,
};

const colorMap = {
  emerald: "group-hover:bg-emerald-500/30 bg-emerald-500/20 text-emerald-500 group-hover:text-emerald-500",
  amber: "group-hover:bg-amber-500/30 bg-amber-500/20 text-amber-500 group-hover:text-amber-500",
  blue: "group-hover:bg-blue-500/30 bg-blue-500/20 text-blue-400 group-hover:text-blue-400",
  purple: "group-hover:bg-purple-500/30 bg-purple-500/20 text-purple-400 group-hover:text-purple-400",
  red: "group-hover:bg-red-500/30 bg-red-500/20 text-red-400 group-hover:text-red-400",
  green: "group-hover:bg-green-500/30 bg-green-500/20 text-green-400 group-hover:text-green-400",
};

export default function DonationCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to featured charities section
    const element = document.getElementById("featured-charities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="donations" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-500">
            Choose Your Donation Category
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Select a category below to view verified Muslim charities working in that area
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            const colorClasses = colorMap[category.color as keyof typeof colorMap];
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`category-card bg-slate-800/80 rounded-xl p-6 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer group ${
                  selectedCategory === category.id ? "border-emerald-500 bg-slate-700/80" : ""
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${colorClasses}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 mb-4">{category.description}</p>
                  <div className={`text-sm font-medium ${colorClasses.split(' ')[2]}`}>
                    {category.organizationCount} Organizations Available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
