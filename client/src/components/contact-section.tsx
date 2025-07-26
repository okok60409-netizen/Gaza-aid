import { Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-t from-slate-900 to-slate-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-emerald-500">Contact & Support</h2>
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-slate-100">Have Questions?</h3>
            <p className="text-slate-300 mb-4">
              If you need assistance with donations or have questions about any of the featured charities, we're here to help.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@gazarelief.org</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-slate-400 space-y-2">
            <p>All charity information is independently verified.</p>
            <p>We do not handle donations directly - all donations go directly to the selected charity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
