import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, ExternalLink } from "lucide-react";
import { Logo } from "../components/Logo";
import { Icon } from "../lib/icons";
import { useContent } from "../lib/ContentContext";
import { getStaffSession, setStaffSession } from "../lib/auth";
import { COLLECTIONS } from "../lib/collections";
import { CrudSection } from "../components/admin/CrudSection";

const STAFF_SECTIONS = ["news", "projects", "employees", "gallery"];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const { content, save, loaded } = useContent();
  const [staff, setStaff] = useState(null);
  const [tab, setTab] = useState(null);

  useEffect(() => {
    const s = getStaffSession();
    if (!s) {
      navigate("/staff/login");
      return;
    }
    setStaff(s);
  }, [navigate]);

  const allowed = STAFF_SECTIONS.filter((k) => staff?.permissions?.[k]);

  useEffect(() => {
    if (allowed.length > 0 && !tab) setTab(allowed[0]);
  }, [allowed, tab]);

  if (!staff || !loaded) {
    return <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-amber-400 font-mono text-sm">Loading…</div>;
  }

  const logout = () => {
    setStaffSession(null);
    navigate("/");
  };

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

      <div className="max-w-[1400px] mx-auto px-5 py-8">
        <h1 className="font-display text-2xl text-white mb-1">Staff Portal</h1>
        <p className="text-sm text-slate-500 mb-8">
          Signed in as <span className="text-amber-400">{staff.name}</span> · {staff.department}. Changes you make here go live immediately, according to your permissions below.
        </p>

        {allowed.length === 0 ? (
          <p className="text-sm text-slate-500">Your account doesn't have any content permissions enabled yet — ask an administrator to grant access.</p>
        ) : (
          <>
            <div className="flex gap-2 mb-7 border-b border-white/10 overflow-x-auto">
              {allowed.map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
                    tab === key ? "border-amber-400 text-white" : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Icon name={COLLECTIONS[key].icon} size={14} /> {COLLECTIONS[key].label}
                </button>
              ))}
            </div>
            {tab && <CrudSection config={COLLECTIONS[tab]} content={content} save={save} />}
          </>
        )}
      </div>
    </div>
  );
}
