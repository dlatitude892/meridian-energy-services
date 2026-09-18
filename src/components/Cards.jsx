import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, User } from "lucide-react";
import { Icon } from "../lib/icons";
import { Reveal } from "./Reveal";

export function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/services/${service.slug}`}
        className="group block border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-amber-500/60 hover:-translate-y-1 hover:bg-white/[0.04] transition-all duration-300"
      >
        <div className="w-11 h-11 rounded-sm bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors">
          <Icon name={service.icon} size={20} className="text-amber-400" strokeWidth={1.75} />
        </div>
        <h3 className="font-display font-medium text-lg text-white mb-2">{service.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{service.shortDesc}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
          LEARN MORE <ArrowRight size={12} />
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectCard({ project, delay = 0 }) {
  const img = project.images?.[0];
  return (
    <Reveal delay={delay}>
      <Link
        to={`/projects/${project.id}`}
        className="group block border border-white/10 bg-white/[0.02] rounded-md overflow-hidden h-full hover:border-amber-500/60 transition-all duration-300"
      >
        <div className="aspect-[16/10] bg-gradient-to-br from-[#101c30] to-[#0a1220] relative overflow-hidden">
          {img ? (
            <img src={img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-700">
              <Icon name="Factory" size={36} strokeWidth={1} />
            </div>
          )}
          <span
            className={`absolute top-3 left-3 text-[10px] font-mono tracking-wide px-2 py-1 rounded-sm border ${
              project.status === "Current"
                ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/30"
                : "bg-slate-400/10 text-slate-300 border-slate-400/30"
            }`}
          >
            {project.status === "Current" ? "IN PROGRESS" : "COMPLETED"}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 mb-2">
            <MapPin size={11} /> {project.country}
          </div>
          <h3 className="font-display font-medium text-base text-white mb-2 leading-snug">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {(project.category || []).slice(0, 3).map((c) => (
              <span key={c} className="text-[10px] font-mono text-amber-400/80 border border-amber-400/20 rounded-sm px-1.5 py-0.5">{c}</span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function NewsCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/news/${item.id}`}
        className="group block border border-white/10 bg-white/[0.02] rounded-md overflow-hidden h-full hover:border-amber-500/60 transition-all duration-300"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-[#101c30] to-[#0a1220] relative overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-700">
              <Icon name="Newspaper" size={32} strokeWidth={1} />
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mb-2">
            <span className="text-amber-400">{item.category}</span>
            <span className="flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
          </div>
          <h3 className="font-display font-medium text-base text-white leading-snug">{item.title}</h3>
        </div>
      </Link>
    </Reveal>
  );
}

export function EmployeeCard({ person, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-amber-500/40 transition-colors">
        {person.photo ? (
          <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-full object-cover mb-4 border border-white/10" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center font-display text-base mb-4">
            {person.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
        )}
        <h3 className="font-display font-medium text-base text-white">{person.name}</h3>
        <div className="text-xs font-mono text-amber-400 mt-1">{person.position}</div>
        <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1"><MapPin size={11} /> {person.region}</div>
        <p className="text-sm text-slate-400 mt-3 leading-relaxed line-clamp-4">{person.bio}</p>
        {person.certifications?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {person.certifications.map((c) => (
              <span key={c} className="text-[10px] font-mono text-slate-400 border border-white/10 rounded-sm px-1.5 py-0.5">{c}</span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function JobCard({ job, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/careers/${job.id}`}
        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 bg-white/[0.02] rounded-md p-5 hover:border-amber-500/60 transition-colors"
      >
        <div>
          <h3 className="font-display font-medium text-base text-white group-hover:text-amber-400 transition-colors">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
            <span>{job.department}</span>
            <span>{job.type}</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 shrink-0">
          APPLY <ArrowRight size={12} />
        </span>
      </Link>
    </Reveal>
  );
}

export function AuthorLine({ author, date }) {
  return (
    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
      <span className="flex items-center gap-1"><User size={11} /> {author}</span>
      <span className="flex items-center gap-1"><Calendar size={11} /> {date}</span>
    </div>
  );
}
