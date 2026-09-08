import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Calendar, UploadCloud, CheckCircle2 } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { useContent } from "../lib/ContentContext";
import { newId } from "../lib/useSiteContent";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

export default function JobDetail() {
  const { id } = useParams();
  const { content, save } = useContent();
  const job = content.jobs.find((j) => j.id === id);
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [status, setStatus] = useState("idle");

  if (!job) return <Navigate to="/careers" replace />;

  const handleResume = (file) => {
    if (!file) return;
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError("File is too large — please use a resume under 4MB.");
      return;
    }
    setResumeError("");
    const reader = new FileReader();
    reader.onload = () => setResume({ name: file.name, data: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const entry = {
      id: newId("ap"),
      jobId: job.id,
      jobTitle: job.title,
      ...form,
      resumeName: resume?.name || "",
      resumeData: resume?.data || "",
      date: new Date().toISOString(),
      status: "New",
    };
    await save({ ...content, applications: [entry, ...content.applications] });
    setStatus("sent");
  };

  return (
    <div>
      <PageHero
        kicker={job.department}
        title={job.title}
        crumbs={[{ label: "Careers", to: "/careers" }, { label: job.title }]}
      />
      <section className="max-w-5xl mx-auto px-5 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <Reveal className="lg:col-span-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 mb-8 font-mono text-xs">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase size={13} /> {job.type}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> Apply by {job.deadline}</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">JOB DESCRIPTION</div>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mb-8">{job.description}</p>
          <div className="font-mono text-xs tracking-widest text-amber-400 mb-3">REQUIREMENTS</div>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
          <Link to="/careers" className="inline-flex items-center gap-2 text-slate-400 text-xs mt-10 hover:text-amber-400 transition-colors">
            <ArrowLeft size={13} /> Back to All Vacancies
          </Link>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-2">
          <div className="border border-white/10 bg-white/[0.02] rounded-md p-6">
            <div className="font-display text-white text-lg mb-5">Apply for this role</div>
            {status === "sent" ? (
              <div className="flex items-start gap-3 text-emerald-400 text-sm">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                Your application has been submitted. Our recruitment team will be in touch if your profile matches this role.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input
                  className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setStatus("idle"); }}
                />
                <input
                  type="email"
                  className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setStatus("idle"); }}
                />
                <input
                  className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
                <textarea
                  className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 h-24 focus:outline-none focus:border-amber-400"
                  placeholder="Cover letter / relevant experience"
                  value={form.coverLetter}
                  onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
                />
                <label className="flex items-center gap-2 border border-dashed border-white/20 rounded-sm px-4 py-3 text-xs text-slate-400 cursor-pointer hover:border-amber-400 transition-colors">
                  <UploadCloud size={15} />
                  {resume ? resume.name : "Upload resume (PDF, DOC — under 4MB)"}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleResume(e.target.files?.[0])} />
                </label>
                {resumeError && <div className="text-red-400 text-xs">{resumeError}</div>}
                <button
                  disabled={status === "sending"}
                  className="w-full bg-amber-400 text-slate-950 font-medium text-sm py-3 rounded-sm hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Submitting…" : "Submit Application"}
                </button>
                {status === "error" && <div className="text-red-400 text-xs">Please provide your name and email.</div>}
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
