import { useState } from "react";
import { X, Save } from "lucide-react";
import { FieldRenderer } from "./FormFields";

export function EditModal({ title, fields, initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[80] px-5">
      <div className="bg-[#0a1220] border border-white/10 rounded-md p-7 w-full max-w-lg relative max-h-[88vh] overflow-y-auto mrd-scrollbar">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={18} /></button>
        <h2 className="font-display text-xl text-white mb-6">{title}</h2>
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">{f.label}</label>
              <FieldRenderer field={f} value={form[f.key]} onChange={(v) => set(f.key, v)} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-7">
          <button onClick={() => onSave(form)} className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-medium text-sm px-4 py-2.5 rounded-sm hover:bg-amber-300">
            <Save size={14} /> Save
          </button>
          <button onClick={onCancel} className="text-sm px-4 py-2.5 text-slate-400 hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}
