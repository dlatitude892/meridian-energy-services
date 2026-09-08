import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { NewsCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";
import { NEWS_CATEGORIES } from "../lib/defaultContent";

export default function News() {
  const { content } = useContent();
  const [cat, setCat] = useState("All");

  const items = useMemo(
    () =>
      [...content.news]
        .filter((n) => cat === "All" || n.category === cat)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [content.news, cat]
  );

  return (
    <div>
      <PageHero
        kicker="COMPANY UPDATES"
        title="News & Updates"
        subtitle="Contracts, project milestones, equipment deliveries, safety achievements and corporate announcements from across Meridian."
        crumbs={[{ label: "News" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...NEWS_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                cat === c ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((n, i) => (
              <NewsCard key={n.id} item={n} delay={i * 40} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
