import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { ServiceCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";
import { Icon } from "../lib/icons";

const CAPABILITIES = [
  "Mobilized crews with project-specific certifications",
  "Documented HSE and quality management systems",
  "24/7 regional support desks across our operating regions",
  "Scalable resourcing for short-term and multi-year assignments",
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const service = content.services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const related = content.services.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);
  const relatedProjects = content.projects.filter((p) => (p.servicesProvided || []).includes(service.title)).slice(0, 3);

  return (
    <div>
      <PageHero
        kicker={service.category?.toUpperCase()}
        title={service.title}
        subtitle={service.shortDesc}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
      />

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-2">
            <div className="w-14 h-14 rounded-md bg-amber-400/10 flex items-center justify-center mb-6">
              <Icon name={service.icon} size={26} className="text-amber-400" strokeWidth={1.75} />
            </div>
            <p className="text-slate-300 text-base leading-relaxed">{service.description}</p>

            <div className="mt-10 space-y-3">
              {CAPABILITIES.map((c) => (
                <div key={c} className="flex items-start gap-3 text-sm text-slate-400">
                  <CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" />
                  {c}
                </div>
              ))}
            </div>

            {relatedProjects.length > 0 && (
              <div className="mt-14">
                <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">RELATED PROJECTS</div>
                <div className="space-y-3">
                  {relatedProjects.map((p) => (
                    <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between gap-4 border border-white/10 rounded-md p-4 hover:border-amber-500/50 transition-colors group">
                      <div>
                        <div className="text-sm text-white font-display">{p.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{p.country}</div>
                      </div>
                      <ArrowRight size={16} className="text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 sticky top-24">
              <div className="font-display text-white text-base mb-2">Need this service?</div>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Tell us about your project and a regional team will follow up within one business day.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-amber-400 text-slate-950 font-medium text-sm px-5 py-3 rounded-sm hover:bg-amber-300 transition-colors">
                Request This Service <ArrowRight size={15} />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 w-full text-slate-400 text-xs mt-4 hover:text-amber-400 transition-colors">
                <ArrowLeft size={13} /> Back to All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#0a1220] border-t border-white/10 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="font-mono text-xs tracking-widest text-amber-400 mb-8">RELATED SERVICES</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((s, i) => (
                <ServiceCard key={s.id} service={s} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
