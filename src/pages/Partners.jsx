import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { CLIENT_TYPES } from "../lib/defaultContent";

export default function Partners() {
  const { content } = useContent();
  const [type, setType] = useState("All");
  const list = content.clients.filter((c) => type === "All" || c.type === type);

  return (
    <div>
      <PageHero
        kicker="WHO WE WORK WITH"
        title="Clients, Suppliers & Partners"
        subtitle="Meridian works alongside operators, EPC contractors, equipment suppliers and strategic partners across every region we serve."
        crumbs={[{ label: "Suppliers & Partners" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...CLIENT_TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                type === t ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {t === "All" ? "All" : `${t}s`}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={i * 40}>
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-32 flex flex-col items-center justify-center text-center hover:border-amber-500/40 transition-colors">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="max-h-10 max-w-full object-contain mb-2" />
                ) : (
                  <div className="font-display text-white text-lg mb-1">{c.name}</div>
                )}
                <div className="text-[10px] font-mono text-slate-500 tracking-wide">{c.type.toUpperCase()}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
