import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { GALLERY_CATEGORIES } from "../lib/defaultContent";
import { Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  const { content } = useContent();
  const [cat, setCat] = useState("All");
  const items = content.gallery.filter((g) => cat === "All" || g.category === cat);

  return (
    <div>
      <PageHero
        kicker="WORK IN ACTION"
        title="Field & Work-Site Gallery"
        subtitle="Photographs from work sites, offshore platforms, onshore fields, equipment and completed projects across our operating regions."
        crumbs={[{ label: "Work in Action" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...GALLERY_CATEGORIES].map((c) => (
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
          <div className="border border-dashed border-white/15 rounded-md py-20 text-center">
            <ImageIcon size={28} className="mx-auto text-slate-700 mb-4" />
            <p className="text-sm text-slate-500">No photos posted yet — add work-site, offshore, onshore and equipment photos from the Admin or Staff dashboard.</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {items.map((g, i) => (
              <Reveal key={g.id} delay={i * 35} className="mb-4 break-inside-avoid">
                <div className="group relative overflow-hidden rounded-md border border-white/10 bg-[#0a1220]">
                  <img src={g.photo} alt={g.caption} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-[10px] font-mono text-amber-400 tracking-wide">{g.category}</span>
                    {g.caption && <p className="text-white text-xs mt-0.5">{g.caption}</p>}
                    {(g.location || g.date) && (
                      <p className="text-slate-400 text-[10px] mt-1">{[g.location, g.date].filter(Boolean).join(" · ")}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
