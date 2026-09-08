import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { ADMIN_PASSWORD, setAdminAuthed } from "../lib/auth";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      navigate("/admin");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link to="/"><Logo light /></Link>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-md p-8">
          <div className="flex items-center gap-2 text-amber-400 mb-1.5"><Lock size={15} /><span className="font-mono text-xs tracking-widest">ADMIN ACCESS</span></div>
          <h1 className="font-display text-xl text-white mb-6">Administrator Login</h1>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(""); }}
              placeholder="Password"
              className="w-full bg-transparent border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
            {error && <div className="text-red-400 text-xs">{error}</div>}
            <button className="w-full bg-amber-400 text-slate-950 font-medium text-sm py-2.5 rounded-sm hover:bg-amber-300 transition-colors">Enter Dashboard</button>
          </form>
          <Link to="/staff/login" className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 mt-6">
            <LinkIcon size={11} /> Staff login instead
          </Link>
        </div>
      </div>
    </div>
  );
}
