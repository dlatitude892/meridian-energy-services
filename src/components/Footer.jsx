import { Link } from "react-router-dom";
import { Link2, MessageCircle, Globe2, Rss } from "lucide-react";
import { Logo } from "./Logo";

export function Footer({ content }) {
  const s = content?.siteSettings || {};
  const locations = content?.locations || [];

  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <Logo light />
            <p className="text-sm text-slate-500 mt-4 max-w-xs leading-relaxed">
              {s.footerText || "International oil & gas contracting, engineering, equipment supply and field services."}
            </p>
            <div className="flex gap-3 mt-5">
              {[Link2, MessageCircle, Globe2, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-sm border border-slate-700 flex items-center justify-center text-slate-500 hover:text-amber-400 hover:border-amber-500 transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono tracking-widest text-slate-200 mb-4">SERVICES</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-amber-400">All Services</Link></li>
              <li><Link to="/services" className="hover:text-amber-400">Drilling & Rig Support</Link></li>
              <li><Link to="/services" className="hover:text-amber-400">Offshore Services</Link></li>
              <li><Link to="/services" className="hover:text-amber-400">Engineering</Link></li>
              <li><Link to="/services" className="hover:text-amber-400">Equipment Supply</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono tracking-widest text-slate-200 mb-4">COMPANY</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-amber-400">Projects</Link></li>
              <li><Link to="/people" className="hover:text-amber-400">Our People</Link></li>
              <li><Link to="/sustainability" className="hover:text-amber-400">Sustainability</Link></li>
              <li><Link to="/safety" className="hover:text-amber-400">Safety</Link></li>
              <li><Link to="/careers" className="hover:text-amber-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono tracking-widest text-slate-200 mb-4">GLOBAL LOCATIONS</div>
            <ul className="space-y-2 text-sm">
              {locations.slice(0, 6).map((l) => (
                <li key={l.id}>
                  <Link to="/global-operations" className="hover:text-amber-400">{l.city}, {l.country}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono tracking-widest text-slate-200 mb-4">CONTACT</div>
            <ul className="space-y-2 text-sm">
              <li>{s.contact?.hqPhone}</li>
              <li className="break-all">{s.contact?.hqEmail}</li>
              <li className="pt-1"><Link to="/contact" className="hover:text-amber-400">Contact Us →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>© {new Date().getFullYear()} Meridian Energy Services. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-amber-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400">Terms & Conditions</Link>
            <Link to="/cookie-policy" className="hover:text-amber-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
