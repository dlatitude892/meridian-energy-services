import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { ServiceCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";
import { SERVICE_CATEGORIES } from "../lib/defaultContent";

export default function Services() {
  const { content } = useContent();
  const [filter, setFilter] = useState("All");
  const services = content.services.filter((s) => filter === "All" || s.category === filter);

  return (
    <div>
      <PageHero
        kicker="WHAT WE DO"
        title="Full-Scope Oil & Gas Services"
        subtitle="From wellsite to refinery, offshore to onshore — Meridian delivers contracting, engineering, equipment and field-service solutions across the full project lifecycle."
        crumbs={[{ label: "Services" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...SERVICE_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                filter === cat
                  ? "bg-amber-400 text-slate-950 border-amber-400"
                  : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={i * 40} />
          ))}
        </div>
      </section>
    </div>
  );
}
