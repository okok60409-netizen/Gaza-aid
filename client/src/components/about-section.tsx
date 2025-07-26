export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-emerald-500">
          About Gaza Relief
        </h2>
        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
          <p>
            Gaza Relief serves as a trusted platform connecting donors with verified Muslim charities working on the ground in Gaza. We understand the importance of ensuring your donations reach those most in need through legitimate, established organizations.
          </p>
          <p>
            Every charity featured on our platform has been verified for their humanitarian work, transparency, and direct impact in Gaza. We provide easy access to multiple organizations so you can choose based on your preferred focus area and donation preferences.
          </p>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mt-8">
            <p className="text-emerald-500 font-semibold mb-2">
              "And whoever saves a life, it is as if he has saved all of mankind."
            </p>
            <p className="text-sm text-slate-400">- Quran 5:32</p>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            Allah سُبْحَانَهُ وَتَعَالَىٰ knows best, and we can only do our part to facilitate your charitable giving.
          </p>
        </div>
      </div>
    </section>
  );
}
