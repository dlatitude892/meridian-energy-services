import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { EmployeeCard } from "../components/Cards";
import { useContent } from "../lib/ContentContext";
import { EMPLOYEE_DEPARTMENTS } from "../lib/defaultContent";

export default function People() {
  const { content } = useContent();
  const [dept, setDept] = useState("All");
  const people = content.employees.filter((e) => dept === "All" || e.department === dept);

  return (
    <div>
      <PageHero
        kicker="THE MERIDIAN TEAM"
        title="Our People"
        subtitle="Executive leadership, engineers, offshore and field personnel, and project teams working across every region we serve."
        crumbs={[{ label: "Our People" }]}
      />
      <section className="max-w-7xl mx-auto px-5 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...EMPLOYEE_DEPARTMENTS].map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors ${
                dept === d ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {people.length === 0 ? (
          <p className="text-sm text-slate-500">No profiles in this department yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {people.map((p, i) => (
              <EmployeeCard key={p.id} person={p} delay={i * 40} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
