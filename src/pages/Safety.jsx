import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { useContent } from "../lib/ContentContext";
import { ShieldCheck, ClipboardCheck, GraduationCap, Radio } from "lucide-react";

const PILLARS = [
  { icon: ShieldCheck, title: "Stop-Work Authority", desc: "Every employee is empowered to halt any activity they believe is unsafe — no exceptions." },
  { icon: ClipboardCheck, title: "Permit-to-Work Controls", desc: "Rigorous hazard identification and permit systems across every site and task." },
  { icon: GraduationCap, title: "Training & Certification", desc: "Continuous crew training, competency verification and certification tracking." },
  { icon: Radio, title: "24/7 Incident Response", desc: "Global HSE coordination and rapid incident response across all regions." },
];

export default function Safety() {
  const { content } = useContent();
  return (
    <div>
      <PageHero
        kicker="OUR FOUNDATION"
        title="Safety"
        subtitle="An uncompromising HSE standard applied consistently across every offshore platform, onshore field, workshop and warehouse we operate."
        crumbs={[{ label: "Safety" }]}
      />
      <section className="max-w-5xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <p className="text-slate-300 text-lg leading-relaxed mb-14">{content.siteSettings.safety}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
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
        <Reveal>
          <div className="border border-amber-500/30 bg-amber-400/5 rounded-md p-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { v: 1, s: "", l: "Year Without a Lost-Time Incident (Offshore)" },
              { v: 1200000, s: "+", l: "Safe Work-Hours (West Africa Pipeline)" },
              { v: 100, s: "%", l: "Sites Under Active HSE Audit" },
              { v: 24, s: "/7", l: "HSE Support Coverage" },
            ].map((st) => (
              <div key={st.l}>
                <div className="font-display font-semibold text-3xl text-amber-400">
                  <StatCounter value={st.v} suffix={st.s} />
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2 leading-relaxed">{st.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
