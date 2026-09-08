import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export default function GlobalOperations() {
  const { content } = useContent();
  const locations = content.locations;
  const hq = locations.find((l) => l.type === "Headquarters");
  const regional = locations.filter((l) => l.type !== "Headquarters");

  return (
    <div>
      <PageHero
        kicker="WHERE WE WORK"
        title="Global Operations"
        subtitle="Headquartered in the United States, with regional offices supporting operators across North America, South America, Europe, Africa, the Middle East and Asia-Pacific."
        crumbs={[{ label: "Global Operations" }]}
      />

      {/* Simple world-map style layout using a grid of region cards positioned like a map legend */}
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <div className="relative border border-white/10 rounded-lg bg-white/[0.02] p-8 sm:p-12 overflow-hidden mb-14">
            <div className="absolute inset-0 opacity-[0.06] mrd-grain" />
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {locations.map((l) => (
                <div key={l.id} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mb-3 ${l.type === "Headquarters" ? "bg-amber-400" : "bg-cyan-400"} mrd-pulse`} />
                  <div className="text-sm text-white font-display">{l.city}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1 tracking-wide">{l.region.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">HEADQUARTERS</div>
        </Reveal>
        {hq && (
          <Reveal delay={60}>
            <div className="border border-amber-500/30 bg-amber-400/5 rounded-md p-6 mb-14 grid sm:grid-cols-3 gap-6">
              <div>
                <div className="font-display text-white text-lg mb-2">{hq.city}, {hq.country}</div>
                <div className="text-sm text-slate-400 flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {hq.address}</div>
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-2"><Phone size={14} /> {hq.phone}</div>
              <div className="text-sm text-slate-400 flex items-center gap-2 break-all"><Mail size={14} className="shrink-0" /> {hq.email}</div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-6">REGIONAL OFFICES</div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regional.map((l, i) => (
            <Reveal key={l.id} delay={i * 50}>
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-widest mb-3">
                  <Building2 size={13} /> {l.region.toUpperCase()}
                </div>
                <div className="font-display text-white text-base mb-1">{l.city}</div>
                <div className="text-xs text-slate-500 mb-4">{l.country}</div>
                <div className="text-xs text-slate-500 space-y-1.5">
                  <div className="flex items-start gap-1.5"><MapPin size={12} className="mt-0.5 shrink-0" /> {l.address}</div>
                  <div className="flex items-center gap-1.5"><Phone size={12} /> {l.phone}</div>
                  <div className="flex items-center gap-1.5 break-all"><Mail size={12} className="shrink-0" /> {l.email}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
