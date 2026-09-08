import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, LogOut, Mail, FileCheck, Settings, Trash2, Download,
  CheckCircle2, Circle, ExternalLink,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { Icon } from "../lib/icons";
import { useContent } from "../lib/ContentContext";
import { isAdminAuthed, setAdminAuthed } from "../lib/auth";
import { COLLECTIONS, COLLECTION_ORDER } from "../lib/collections";
import { CrudSection } from "../components/admin/CrudSection";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { content, save, loaded } = useContent();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    if (!isAdminAuthed()) navigate("/admin/login");
  }, [navigate]);

  if (!isAdminAuthed() || !loaded) {
    return <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-amber-400 font-mono text-sm">Loading…</div>;
  }

  const logout = () => {
    setAdminAuthed(false);
    navigate("/");
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: "Activity" },
    ...COLLECTION_ORDER.map((k) => ({ key: k, label: COLLECTIONS[k].label, icon: COLLECTIONS[k].icon })),
    { key: "applications", label: "Applications", icon: "FileText" },
    { key: "inquiries", label: "Inquiries", icon: "Mail" },
    { key: "settings", label: "Site Settings", icon: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#05070a] font-sans">
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#05070a]/95 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/"><Logo light compact /></Link>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-400">
              <ExternalLink size={13} /> VIEW SITE
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-amber-400">
              <LogOut size={14} /> LOG OUT
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-5 py-8 flex flex-col lg:flex-row gap-8">
        <nav className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-sm whitespace-nowrap text-left transition-colors ${
                  tab === t.key ? "bg-amber-400 text-slate-950 font-medium" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon name={t.icon} size={15} /> {t.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 min-w-0">
          {tab === "dashboard" && <DashboardOverview content={content} setTab={setTab} />}
          {COLLECTION_ORDER.includes(tab) && <CrudSection config={COLLECTIONS[tab]} content={content} save={save} />}
          {tab === "applications" && <ApplicationsPanel content={content} save={save} />}
          {tab === "inquiries" && <InquiriesPanel content={content} save={save} />}
          {tab === "settings" && <SettingsPanel content={content} save={save} />}
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, icon }) {
  return (
    <div className="border border-white/10 bg-white/[0.02] rounded-md p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon name={icon} size={18} className="text-amber-400" />
        <span className="font-display text-2xl text-white">{value}</span>
      </div>
      <div className="text-xs font-mono text-slate-500 tracking-wide">{label}</div>
    </div>
  );
}

function DashboardOverview({ content, setTab }) {
  const newApps = content.applications.filter((a) => a.status === "New").length;
  const newInquiries = content.inquiries.filter((i) => i.status === "New").length;

  return (
    <div>
      <h1 className="font-display text-2xl text-white mb-1">Welcome back</h1>
      <p className="text-sm text-slate-500 mb-8">Changes made here update the live website immediately for every visitor.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatTile label="SERVICES" value={content.services.length} icon="Cog" />
        <StatTile label="PROJECTS" value={content.projects.length} icon="Factory" />
        <StatTile label="NEWS ARTICLES" value={content.news.length} icon="Newspaper" />
        <StatTile label="EMPLOYEES" value={content.employees.length} icon="Users" />
        <StatTile label="GALLERY PHOTOS" value={content.gallery.length} icon="ImageIcon" />
        <StatTile label="OPEN VACANCIES" value={content.jobs.filter((j) => j.status === "Open").length} icon="Briefcase" />
        <StatTile label="NEW APPLICATIONS" value={newApps} icon="FileText" />
        <StatTile label="NEW INQUIRIES" value={newInquiries} icon="Mail" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={() => setTab("applications")} className="text-left border border-white/10 bg-white/[0.02] rounded-md p-5 hover:border-amber-500/40 transition-colors">
          <div className="font-display text-white text-sm mb-1">Review Job Applications</div>
          <div className="text-xs text-slate-500">{newApps} new application{newApps === 1 ? "" : "s"} awaiting review.</div>
        </button>
        <button onClick={() => setTab("inquiries")} className="text-left border border-white/10 bg-white/[0.02] rounded-md p-5 hover:border-amber-500/40 transition-colors">
          <div className="font-display text-white text-sm mb-1">Review Contact Inquiries</div>
          <div className="text-xs text-slate-500">{newInquiries} new inquir{newInquiries === 1 ? "y" : "ies"} awaiting response.</div>
        </button>
      </div>
    </div>
  );
}

function ApplicationsPanel({ content, save }) {
  const setStatus = (id, status) => {
    save({ ...content, applications: content.applications.map((a) => (a.id === id ? { ...a, status } : a)) });
  };
  const remove = (id) => {
    if (!confirm("Delete this application?")) return;
    save({ ...content, applications: content.applications.filter((a) => a.id !== id) });
  };

  if (content.applications.length === 0) {
    return <p className="text-sm text-slate-500">No job applications submitted yet.</p>;
  }

  return (
    <div className="space-y-3">
      {content.applications.map((a) => (
        <div key={a.id} className="border border-white/10 bg-white/[0.02] rounded-md p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="font-display text-white text-base">{a.name}</div>
              <div className="text-xs text-amber-400 font-mono mt-0.5">Applying for: {a.jobTitle}</div>
              <div className="text-xs text-slate-500 mt-1">{a.email} {a.phone && `· ${a.phone}`}</div>
              <div className="text-[10px] text-slate-600 font-mono mt-1">{new Date(a.date).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={a.status}
                onChange={(e) => setStatus(a.id, e.target.value)}
                className="bg-[#0a1220] border border-white/15 rounded-sm px-2.5 py-1.5 text-xs text-white"
              >
                {["New", "Reviewed", "Shortlisted", "Rejected", "Hired"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => remove(a.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={15} /></button>
            </div>
          </div>
          {a.coverLetter && <p className="text-sm text-slate-400 mt-3 whitespace-pre-wrap">{a.coverLetter}</p>}
          {a.resumeData && (
            <a href={a.resumeData} download={a.resumeName || "resume"} className="inline-flex items-center gap-1.5 text-xs text-amber-400 mt-3 hover:underline">
              <Download size={12} /> Download Resume ({a.resumeName})
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function InquiriesPanel({ content, save }) {
  const toggle = (id) => {
    save({
      ...content,
      inquiries: content.inquiries.map((i) => (i.id === id ? { ...i, status: i.status === "New" ? "Responded" : "New" } : i)),
    });
  };
  const remove = (id) => {
    if (!confirm("Delete this inquiry?")) return;
    save({ ...content, inquiries: content.inquiries.filter((i) => i.id !== id) });
  };

  if (content.inquiries.length === 0) {
    return <p className="text-sm text-slate-500">No inquiries submitted yet.</p>;
  }

  return (
    <div className="space-y-3">
      {content.inquiries.map((i) => (
        <div key={i.id} className="border border-white/10 bg-white/[0.02] rounded-md p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-amber-400 border border-amber-400/30 rounded-sm px-1.5 py-0.5">{i.type}</span>
                <div className="font-display text-white text-base">{i.name}</div>
              </div>
              <div className="text-xs text-slate-500 mt-1">{i.email} {i.company && `· ${i.company}`} {i.phone && `· ${i.phone}`}</div>
              <div className="text-[10px] text-slate-600 font-mono mt-1">{new Date(i.date).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => toggle(i.id)} className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400">
                {i.status === "Responded" ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Circle size={14} />}
                {i.status}
              </button>
              <button onClick={() => remove(i.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={15} /></button>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-3 whitespace-pre-wrap">{i.message}</p>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel({ content, save }) {
  const [form, setForm] = useState(content.siteSettings);
  const [savedFlash, setSavedFlash] = useState(false);

  const set = (path, value) => {
    setForm((f) => ({ ...f, [path]: value }));
  };
  const setContact = (key, value) => {
    setForm((f) => ({ ...f, contact: { ...f.contact, [key]: value } }));
  };
  const setStat = (i, key, value) => {
    setForm((f) => {
      const stats = [...f.stats];
      stats[i] = { ...stats[i], [key]: key === "value" ? Number(value) : value };
      return { ...f, stats };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    save({ ...content, siteSettings: form });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  };

  const inputCls = "w-full bg-transparent border border-white/15 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400";
  const labelCls = "block text-xs font-mono text-slate-500 mb-1.5 tracking-wide";

  return (
    <form onSubmit={submit} className="space-y-8 max-w-2xl">
      <div>
        <div className="font-display text-white text-lg mb-4">Homepage Hero</div>
        <div className="space-y-3">
          <div><label className={labelCls}>Headline</label><input className={inputCls} value={form.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} /></div>
          <div><label className={labelCls}>Subheadline</label><textarea className={`${inputCls} h-20`} value={form.heroSubheadline} onChange={(e) => set("heroSubheadline", e.target.value)} /></div>
        </div>
      </div>

      <div>
        <div className="font-display text-white text-lg mb-4">About Section</div>
        <div className="space-y-3">
          <div><label className={labelCls}>Heading</label><input className={inputCls} value={form.aboutHeading} onChange={(e) => set("aboutHeading", e.target.value)} /></div>
          <div><label className={labelCls}>Body</label><textarea className={`${inputCls} h-28`} value={form.aboutBody} onChange={(e) => set("aboutBody", e.target.value)} /></div>
        </div>
      </div>

      <div>
        <div className="font-display text-white text-lg mb-4">Company Statistics</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {form.stats.map((s, i) => (
            <div key={i} className="border border-white/10 rounded-sm p-3 space-y-2">
              <input className={inputCls} placeholder="Label" value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
              <div className="flex gap-2">
                <input type="number" className={inputCls} placeholder="Value" value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} />
                <input className={inputCls} placeholder="Suffix" value={s.suffix} onChange={(e) => setStat(i, "suffix", e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-display text-white text-lg mb-4">Sustainability & Safety Pages</div>
        <div className="space-y-3">
          <div><label className={labelCls}>Sustainability Statement</label><textarea className={`${inputCls} h-28`} value={form.sustainability} onChange={(e) => set("sustainability", e.target.value)} /></div>
          <div><label className={labelCls}>Safety Statement</label><textarea className={`${inputCls} h-28`} value={form.safety} onChange={(e) => set("safety", e.target.value)} /></div>
        </div>
      </div>

      <div>
        <div className="font-display text-white text-lg mb-4">Contact Details</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>HQ Phone</label><input className={inputCls} value={form.contact.hqPhone} onChange={(e) => setContact("hqPhone", e.target.value)} /></div>
          <div><label className={labelCls}>HQ Email</label><input className={inputCls} value={form.contact.hqEmail} onChange={(e) => setContact("hqEmail", e.target.value)} /></div>
          <div><label className={labelCls}>Projects Email</label><input className={inputCls} value={form.contact.projectsEmail} onChange={(e) => setContact("projectsEmail", e.target.value)} /></div>
          <div><label className={labelCls}>Vendor Email</label><input className={inputCls} value={form.contact.vendorEmail} onChange={(e) => setContact("vendorEmail", e.target.value)} /></div>
          <div><label className={labelCls}>Careers Email</label><input className={inputCls} value={form.contact.careersEmail} onChange={(e) => setContact("careersEmail", e.target.value)} /></div>
        </div>
      </div>

      <div>
        <label className={labelCls}>Footer Description</label>
        <textarea className={`${inputCls} h-20`} value={form.footerText} onChange={(e) => set("footerText", e.target.value)} />
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-amber-400 text-slate-950 font-medium text-sm px-6 py-2.5 rounded-sm hover:bg-amber-300">Save Settings</button>
        {savedFlash && <span className="text-emerald-400 text-xs flex items-center gap-1.5"><CheckCircle2 size={14} /> Saved</span>}
      </div>
    </form>
  );
}
