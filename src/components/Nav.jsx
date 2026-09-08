import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Lock, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const PRIMARY = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/global-operations", label: "Global Operations" },
  { to: "/news", label: "News" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const MORE = [
  { to: "/people", label: "Our People" },
  { to: "/gallery", label: "Work in Action" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/safety", label: "Safety" },
  { to: "/partners", label: "Suppliers & Partners" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
    setPortalOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = ({ isActive }) =>
    `relative text-sm transition-colors py-1 ${
      isActive ? "text-amber-400" : "text-slate-300 hover:text-white"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-amber-400 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[#05070a]/95 backdrop-blur border-b border-white/10" : "bg-[#05070a]/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-6">
        <Link to="/">
          <Logo light />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {PRIMARY.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors py-1">
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 pt-3 w-56">
                <div className="bg-[#0a1220] border border-white/10 rounded-md shadow-2xl shadow-black/50 py-2">
                  {MORE.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative" onMouseEnter={() => setPortalOpen(true)} onMouseLeave={() => setPortalOpen(false)}>
            <button className="flex items-center gap-1.5 text-xs font-mono tracking-wide text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-500 rounded-sm px-3 py-1.5 transition-colors">
              <Lock size={12} /> PORTAL
            </button>
            {portalOpen && (
              <div className="absolute top-full right-0 pt-3 w-48">
                <div className="bg-[#0a1220] border border-white/10 rounded-md shadow-2xl shadow-black/50 py-2">
                  <Link to="/staff/login" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5">Staff Login</Link>
                  <Link to="/admin/login" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5">Admin Login</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="lg:hidden text-slate-200" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#05070a] px-5 py-5 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          {[...PRIMARY, ...MORE].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm py-2.5 border-b border-white/5 ${isActive ? "text-amber-400" : "text-slate-300"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-4">
            <Link to="/staff/login" className="flex-1 text-center text-xs font-mono text-slate-300 border border-slate-700 rounded-sm px-3 py-2.5">Staff Login</Link>
            <Link to="/admin/login" className="flex-1 text-center text-xs font-mono text-slate-300 border border-slate-700 rounded-sm px-3 py-2.5">Admin Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}
