import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { useContent } from "../lib/ContentContext";
import { ShieldCheck, Globe2, Award, Leaf, Users, Clock, Cpu, BadgeCheck } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Safety", desc: "Every operation, every site, held to one uncompromising HSE standard." },
  { icon: Cpu, title: "Engineering Excellence", desc: "Technical depth across process, mechanical, electrical and civil disciplines." },
  { icon: BadgeCheck, title: "Reliability", desc: "Consistent execution operators and EPC contractors can plan around." },
  { icon: Globe2, title: "Global Operations", desc: "Regional teams close to the work, backed by global standards." },
  { icon: Award, title: "Technical Expertise", desc: "Specialists across drilling, offshore, engineering and equipment." },
  { icon: Leaf, title: "Environmental Responsibility", desc: "Responsible operations that protect the communities we work in." },
  { icon: Clock, title: "On-Time Delivery", desc: "Disciplined planning and cost control from concept to close-out." },
  { icon: Users, title: "People First", desc: "Trained, certified crews who take ownership of every project." },
];

export default function About() {
  const { content } = useContent();
  const s = content.siteSettings;

  return (
    <div>
      <PageHero
        kicker="ABOUT MERIDIAN"
        title="An integrated partner for oil & gas operators worldwide"
        subtitle="Meridian Energy Services provides contracting, engineering, equipment and field-services solutions to operators, EPC contractors, drilling contractors and industrial clients across six continents."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="max-w-5xl mx-auto px-5 py-20">
        <Reveal>
          <p className="text-slate-300 text-lg leading-relaxed">{s.aboutBody}</p>
        </Reveal>
      </section>

      <section className="bg-[#0a1220] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {s.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <div className="font-display font-semibold text-4xl text-amber-400">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono text-slate-500 mt-2 tracking-wide">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20 sm:py-24">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">WHAT WE STAND FOR</div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-12">Our Values</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 50}>
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-amber-500/40 transition-colors">
                <v.icon size={22} className="text-amber-400 mb-4" strokeWidth={1.75} />
                <div className="font-display font-medium text-white text-sm mb-1.5">{v.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{v.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
