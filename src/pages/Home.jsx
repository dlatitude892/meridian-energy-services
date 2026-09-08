import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Globe2, Award, Clock } from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { ParticleField } from "../components/ParticleField";
import { IndustrialSkyline } from "../components/IndustrialSkyline";
import { ServiceCard, ProjectCard, NewsCard } from "../components/Cards";

export default function Home() {
  const { content } = useContent();
  const s = content.siteSettings;
  const services = content.services.slice(0, 6);
  const projects = content.projects.slice(0, 3);
  const news = content.news.slice(0, 3);
  const clients = content.clients;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#05070a] text-white overflow-hidden min-h-[92vh] flex items-end">
        <ParticleField className="absolute inset-0 w-full h-full" density={55} />
        <IndustrialSkyline className="absolute inset-x-0 bottom-0 w-full h-[320px] text-slate-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,163,61,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-[#05070a]/70" />
        <div className="relative max-w-7xl mx-auto px-5 pt-40 pb-24 w-full">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.3em] text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-amber-400" /> HOUSTON · DUBAI · AMMAN · MUSCAT · SINGAPORE · ABERDEEN
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.02] max-w-4xl">
              {s.heroHeadline}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-slate-300 max-w-xl text-base sm:text-lg leading-relaxed">
              {s.heroSubheadline}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-medium text-sm px-6 py-3.5 rounded-sm hover:bg-amber-300 transition-colors">
                Explore Our Services <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 border border-slate-600 text-slate-200 text-sm px-6 py-3.5 rounded-sm hover:border-amber-400 hover:text-amber-400 transition-colors">
                Our Projects
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-slate-400 text-sm px-6 py-3.5 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Animated stats strip */}
      <section className="bg-[#0a1220] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {s.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center lg:text-left">
              <div className="font-display font-semibold text-3xl sm:text-4xl text-amber-400">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono text-slate-500 mt-1.5 tracking-wide">{stat.label}</div>
            </Reveal>
          ))}
          <Reveal delay={s.stats.length * 80} className="text-center lg:text-left">
            <div className="font-display font-semibold text-3xl sm:text-4xl text-amber-400 flex items-center gap-2 justify-center lg:justify-start">
              24/7
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1.5 tracking-wide">Global Support</div>
          </Reveal>
        </div>
      </section>

      {/* About preview */}
      <section className="max-w-7xl mx-auto px-5 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <Reveal className="lg:col-span-2">
            <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">ABOUT MERIDIAN</div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-5 leading-tight">{s.aboutHeading}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-7">{s.aboutBody}</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:gap-3 transition-all">
              More About Us <ArrowRight size={15} />
            </Link>
          </Reveal>
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 sm:gap-5">
            {[
              { icon: ShieldCheck, label: "Safety First", desc: "Uncompromising HSE standards on every site." },
              { icon: Globe2, label: "Global Reach", desc: "Operations across six continents." },
              { icon: Award, label: "Engineering Excellence", desc: "Technical expertise across every discipline." },
              { icon: Clock, label: "On-Time Delivery", desc: "Disciplined project execution, every time." },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 70}>
                <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 h-full hover:border-amber-500/40 transition-colors">
                  <f.icon size={22} className="text-amber-400 mb-4" strokeWidth={1.75} />
                  <div className="font-display font-medium text-white text-sm mb-1.5">{f.label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-[#0a1220] border-y border-white/10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <Reveal>
              <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">WHAT WE DO</div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">Integrated Oilfield Services</h2>
            </Reveal>
            <Reveal delay={80}>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400 transition-colors">
                View All 14 Services <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((sv, i) => (
              <ServiceCard key={sv.id} service={sv} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="max-w-7xl mx-auto px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <Reveal>
            <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">FIELD-PROVEN</div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">Selected Projects</h2>
          </Reveal>
          <Reveal delay={80}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400 transition-colors">
              View All Projects <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* Global operations preview */}
      <section className="relative bg-[#0a1220] border-y border-white/10 py-20 sm:py-28 overflow-hidden">
        <ParticleField className="absolute inset-0 w-full h-full opacity-50" density={30} color="34,211,238" />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">GLOBAL OPERATIONS</div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-5">Present where energy is produced</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-md">
                Headquartered in the United States, with regional offices across North America, South America,
                Europe, West Africa, North Africa, the Middle East and Asia-Pacific — Meridian is positioned to
                mobilize wherever your project is located.
              </p>
              <Link to="/global-operations" className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:gap-3 transition-all">
                View Global Operations <ArrowRight size={15} />
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                {content.locations.map((l) => (
                  <div key={l.id} className="border border-white/10 bg-white/[0.02] rounded-md p-4">
                    <div className="text-[10px] font-mono text-amber-400 tracking-wide">{l.type === "Headquarters" ? "HEADQUARTERS" : l.region.toUpperCase()}</div>
                    <div className="text-sm text-white font-display mt-1">{l.city}</div>
                    <div className="text-xs text-slate-500">{l.country}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* News preview */}
      <section className="max-w-7xl mx-auto px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <Reveal>
            <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">LATEST</div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">News & Updates</h2>
          </Reveal>
          <Reveal delay={80}>
            <Link to="/news" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400 transition-colors">
              View All News <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((n, i) => (
            <NewsCard key={n.id} item={n} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* Clients marquee */}
      <section className="bg-[#0a1220] border-y border-white/10 py-14 overflow-hidden">
        <div className="text-center font-mono text-xs tracking-widest text-slate-500 mb-8">
          TRUSTED BY OPERATORS, CONTRACTORS & PARTNERS WORLDWIDE
        </div>
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-14 mrd-marquee shrink-0">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 whitespace-nowrap">
                <span className="font-display text-lg">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#05070a] py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,163,61,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-5">
              Ready to mobilize your next project?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-9 max-w-xl mx-auto leading-relaxed">
              Talk to our team about contracting, engineering, equipment supply or field-service support anywhere we operate.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-medium text-sm px-6 py-3.5 rounded-sm hover:bg-amber-300 transition-colors">
                Start a Project Inquiry <ArrowRight size={16} />
              </Link>
              <Link to="/careers" className="inline-flex items-center gap-2 border border-slate-600 text-slate-200 text-sm px-6 py-3.5 rounded-sm hover:border-amber-400 hover:text-amber-400 transition-colors">
                View Careers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
