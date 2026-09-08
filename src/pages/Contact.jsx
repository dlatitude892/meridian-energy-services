import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { newId } from "../lib/useSiteContent";
import { INQUIRY_TYPES } from "../lib/defaultContent";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { content, save } = useContent();
  const s = content.siteSettings;
  const [type, setType] = useState("General");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const entry = { id: newId("iq"), type, ...form, date: new Date().toISOString(), status: "New" };
    await save({ ...content, inquiries: [entry, ...content.inquiries] });
    setForm({ name: "", email: "", company: "", phone: "", message: "" });
    setStatus("sent");
  };

  return (
    <div>
      <PageHero
        kicker="GET IN TOUCH"
        title="Contact Meridian Energy Services"
        subtitle="Reach our headquarters or a regional office directly, or send a project, vendor or careers inquiry below."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <Reveal className="lg:col-span-2">
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">HEADQUARTERS</div>
          <div className="space-y-3 text-sm text-slate-300 mb-10">
            <div className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 text-amber-400 shrink-0" /> {content.locations[0]?.address}</div>
            <div className="flex items-center gap-2.5"><Phone size={15} className="text-amber-400 shrink-0" /> {s.contact?.hqPhone}</div>
            <div className="flex items-center gap-2.5 break-all"><Mail size={15} className="text-amber-400 shrink-0" /> {s.contact?.hqEmail}</div>
          </div>

          <div className="font-mono text-xs tracking-widest text-amber-400 mb-4">DIRECT LINES</div>
          <div className="space-y-2 text-sm text-slate-400">
            <div>Project Inquiries — <span className="text-slate-300">{s.contact?.projectsEmail}</span></div>
            <div>Vendor / Supplier — <span className="text-slate-300">{s.contact?.vendorEmail}</span></div>
            <div>Careers — <span className="text-slate-300">{s.contact?.careersEmail}</span></div>
          </div>

          <div className="font-mono text-xs tracking-widest text-amber-400 mb-4 mt-10">REGIONAL OFFICES</div>
          <div className="grid grid-cols-2 gap-3">
            {content.locations.slice(1).map((l) => (
              <div key={l.id} className="border border-white/10 rounded-sm p-3">
                <div className="text-xs text-white">{l.city}</div>
                <div className="text-[10px] text-slate-500 font-mono">{l.region}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-3">
          <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {INQUIRY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                    type === t ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {status === "sent" ? (
              <div className="flex items-start gap-3 text-emerald-400 text-sm py-6">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                Thank you — your {type.toLowerCase()} inquiry has been received. Our team will follow up shortly.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setStatus("idle"); }}
                  />
                  <input
                    type="email"
                    className="bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setStatus("idle"); }}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                  <input
                    className="bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <textarea
                  className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 h-32 focus:outline-none focus:border-amber-400"
                  placeholder={type === "Project" ? "Project location, scope and timeline" : type === "Vendor / Supplier" ? "Company, capability and products/services offered" : type === "Careers" ? "Role of interest and background" : "How can we help?"}
                  value={form.message}
                  onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setStatus("idle"); }}
                />
                <button className="bg-amber-400 text-slate-950 font-medium text-sm px-6 py-3 rounded-sm hover:bg-amber-300 transition-colors" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : `Send ${type} Inquiry`}
                </button>
                {status === "error" && <div className="text-red-400 text-xs">Please fill in your name, email and message.</div>}
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
