import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { JobCard } from "../components/Cards";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { EMPLOYEE_DEPARTMENTS } from "../lib/defaultContent";
import { GraduationCap, ShieldCheck, TrendingUp, Globe2 } from "lucide-react";

const PERKS = [
  { icon: Globe2, title: "Global Assignments", desc: "Work across our regional offices and project sites worldwide." },
  { icon: GraduationCap, title: "Training & Certification", desc: "Ongoing technical training and professional development support." },
  { icon: ShieldCheck, title: "Safety-First Culture", desc: "Industry-leading HSE standards on every assignment." },
  { icon: TrendingUp, title: "Career Growth", desc: "Clear paths from field roles into supervision and management." },
];

export default function Careers() {
  const { content } = useContent();
  const [dept, setDept] = useState("All");

  const jobs = useMemo(
    () => content.jobs.filter((j) => j.status === "Open" && (dept === "All" || j.department === dept)),
    [content.jobs, dept]
  );

  return (
    <div>
      <PageHero
        kicker="JOIN MERIDIAN"
        title="Careers"
        subtitle="Build your career with an international oil & gas services company operating across six continents."
        crumbs={[{ label: "Careers" }]}
      />

      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full">
                <p.icon size={22} className="text-amber-400 mb-4" strokeWidth={1.75} />
                <div className="font-display text-white text-sm mb-1.5">{p.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-semibold text-2xl text-white">Current Vacancies</h2>
          <span className="text-xs font-mono text-slate-500">{jobs.length} OPEN ROLES</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...EMPLOYEE_DEPARTMENTS].map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                dept === d ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-500">No open roles in this department right now — check back soon.</p>
        ) : (
          <div className="space-y-3">
            {jobs.map((j, i) => (
              <JobCard key={j.id} job={j} delay={i * 40} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
