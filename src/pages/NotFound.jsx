import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <div className="font-display font-semibold text-amber-400 text-6xl mb-4">404</div>
      <h1 className="font-display text-2xl text-white mb-3">Page not found</h1>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-medium text-sm px-6 py-3 rounded-sm hover:bg-amber-300 transition-colors">
        Back to Home <ArrowRight size={16} />
      </Link>
    </div>
  );
}
