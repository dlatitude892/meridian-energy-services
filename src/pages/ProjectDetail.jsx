import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { MapPin, Calendar, Building2, CheckCircle2, ArrowLeft } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { content } = useContent();
  const project = content.projects.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div>
      <PageHero
        kicker={project.status === "Current" ? "PROJECT IN PROGRESS" : "COMPLETED PROJECT"}
        title={project.title}
        subtitle={`${project.location}, ${project.country}`}
        crumbs={[{ label: "Projects", to: "/projects" }, { label: project.title }]}
      />

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-2">
            {project.images?.length > 0 ? (
              <div className="mb-8">
                <div className="aspect-video rounded-md overflow-hidden border border-white/10 bg-[#0a1220]">
                  <img src={project.images[activeImg]} alt={project.title} className="w-full h-full object-cover" />
                </div>
                {project.images.length > 1 && (
                  <div className="flex gap-2 mt-3">
                    {project.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-sm overflow-hidden border ${i === activeImg ? "border-amber-400" : "border-white/10"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                {project.video && (
                  <div className="mt-4 aspect-video rounded-md overflow-hidden border border-white/10">
                    <video src={project.video} controls className="w-full h-full" />
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-8 aspect-video rounded-md border border-white/10 bg-gradient-to-br from-[#101c30] to-[#0a1220] flex items-center justify-center text-slate-700 font-mono text-xs">
                NO IMAGES UPLOADED YET
              </div>
            )}

            <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">PROJECT OVERVIEW</div>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-wrap">{project.description}</p>

            {project.servicesProvided?.length > 0 && (
              <div className="mt-10">
                <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">SERVICES PROVIDED</div>
                <div className="space-y-2.5">
                  {project.servicesProvided.map((s) => (
                    <div key={s} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-amber-400 shrink-0" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 text-xs mt-10 hover:text-amber-400 transition-colors">
              <ArrowLeft size={13} /> Back to All Projects
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 sticky top-24 space-y-5">
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wide mb-1">STATUS</div>
                <span className={`inline-block text-xs font-mono px-2.5 py-1 rounded-sm border ${project.status === "Current" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/30" : "bg-slate-400/10 text-slate-300 border-slate-400/30"}`}>
                  {project.status}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wide mb-1 flex items-center gap-1.5"><MapPin size={11} /> LOCATION</div>
                <div className="text-sm text-white">{project.location}</div>
                <div className="text-xs text-slate-500">{project.country}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wide mb-1 flex items-center gap-1.5"><Building2 size={11} /> CLIENT / CATEGORY</div>
                <div className="text-sm text-white">{project.client}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(project.category || []).map((c) => (
                    <span key={c} className="text-[10px] font-mono text-amber-400/80 border border-amber-400/20 rounded-sm px-1.5 py-0.5">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wide mb-1 flex items-center gap-1.5"><Calendar size={11} /> TIMELINE</div>
                <div className="text-sm text-white">Start: {project.startDate || "—"}</div>
                <div className="text-sm text-white">{project.status === "Current" ? "Ongoing" : `Completed: ${project.completionDate || "—"}`}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
