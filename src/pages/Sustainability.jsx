import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { Leaf, Droplets, Recycle, Users2 } from "lucide-react";

const PILLARS = [
  { icon: Leaf, title: "Emissions & Energy", desc: "Evaluating energy efficiency and emissions intensity at the design stage of every project." },
  { icon: Droplets, title: "Water & Waste", desc: "Strict waste-management and spill-prevention protocols across offshore and onshore sites." },
  { icon: Recycle, title: "Responsible Operations", desc: "Minimizing environmental footprint through disciplined field practices and equipment upkeep." },
  { icon: Users2, title: "Community Impact", desc: "Local hiring, training programs and transparent environmental reporting in every region." },
];

export default function Sustainability() {
  const { content } = useContent();
  return (
    <div>
      <PageHero
        kicker="RESPONSIBLE OPERATIONS"
        title="Sustainability"
        subtitle="Reducing our environmental footprint while delivering reliable energy-services solutions across the regions we operate in."
        crumbs={[{ label: "Sustainability" }]}
      />
      <section className="max-w-5xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <p className="text-slate-300 text-lg leading-relaxed mb-14">{content.siteSettings.sustainability}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-amber-500/40 transition-colors">
                <p.icon size={22} className="text-amber-400 mb-4" strokeWidth={1.75} />
                <div className="font-display text-white text-sm mb-1.5">{p.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
