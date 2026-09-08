import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { IndustrialSkyline } from "./IndustrialSkyline";
import { ParticleField } from "./ParticleField";

export function PageHero({ kicker, title, subtitle, crumbs = [] }) {
  return (
    <section className="relative bg-[#05070a] text-white overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <ParticleField className="absolute inset-0 w-full h-full opacity-70" density={26} />
      <IndustrialSkyline className="absolute inset-x-0 bottom-0 w-full h-[220px] text-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-[#05070a]/70 to-[#05070a]" />
      <div className="relative max-w-6xl mx-auto px-5">
        {crumbs.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-slate-500 mb-5">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {c.to ? (
                  <Link to={c.to} className="hover:text-amber-400 transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-slate-300">{c.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        {kicker && (
          <div className="font-mono text-xs tracking-[0.3em] text-amber-400 mb-4">{kicker}</div>
        )}
        <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[1.08] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-slate-300 max-w-2xl text-base leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
