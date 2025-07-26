import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import DonationsSection from "@/components/donations-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <Navbar />
      <HeroSection />
      <DonationsSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
