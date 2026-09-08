import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AuthorLine, NewsCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";

export default function NewsDetail() {
  const { id } = useParams();
  const { content } = useContent();
  const item = content.news.find((n) => n.id === id);
  if (!item) return <Navigate to="/news" replace />;

  const more = content.news.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <div>
      <PageHero
        kicker={item.category}
        title={item.title}
        crumbs={[{ label: "News", to: "/news" }, { label: item.title }]}
      />
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <AuthorLine author={item.author} date={item.date} />
          {item.image && (
            <div className="mt-6 aspect-video rounded-md overflow-hidden border border-white/10">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="mt-8 text-slate-300 text-base leading-relaxed whitespace-pre-wrap">{item.content}</p>

          {item.images?.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {item.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-sm overflow-hidden border border-white/10">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {item.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono text-amber-400/80 border border-amber-400/20 rounded-sm px-2 py-1">#{t}</span>
              ))}
            </div>
          )}

          <Link to="/news" className="inline-flex items-center gap-2 text-slate-400 text-xs mt-10 hover:text-amber-400 transition-colors">
            <ArrowLeft size={13} /> Back to All News
          </Link>
        </Reveal>
      </section>

      {more.length > 0 && (
        <section className="bg-[#0a1220] border-t border-white/10 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="font-mono text-xs tracking-widest text-amber-400 mb-8">MORE UPDATES</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {more.map((n, i) => (
                <NewsCard key={n.id} item={n} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
