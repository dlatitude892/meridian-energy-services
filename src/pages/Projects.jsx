import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { ProjectCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../lib/defaultContent";

export default function Projects() {
  const { content } = useContent();
  const [status, setStatus] = useState("All");
  const [cat, setCat] = useState("All");

  const projects = useMemo(
    () =>
      content.projects.filter(
        (p) =>
          (status === "All" || p.status === status) &&
          (cat === "All" || (p.category || []).includes(cat))
      ),
    [content.projects, status, cat]
  );

  return (
    <div>
      <PageHero
        kicker="OUR TRACK RECORD"
        title="Projects & Case Studies"
        subtitle="A selection of current and completed projects across offshore, onshore, engineering, equipment supply, maintenance, marine and construction work."
        crumbs={[{ label: "Projects" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {["All", ...PROJECT_STATUSES].map((st) => (
              <button
                key={st}
                onClick={() => setStatus(st)}
                className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                  status === st ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {st === "All" ? "All Status" : st}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...PROJECT_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                  cat === c ? "bg-cyan-400/20 text-cyan-300 border-cyan-400/50" : "border-white/15 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-slate-500">No projects match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 40} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
