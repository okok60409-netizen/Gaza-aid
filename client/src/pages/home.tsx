import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import DonationCategories from "@/components/donation-categories";
import FeaturedCharities from "@/components/featured-charities";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
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
      <DonationCategories />
      <FeaturedCharities />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
