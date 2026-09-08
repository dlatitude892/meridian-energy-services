import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { EditModal } from "./EditModal";
import { Icon } from "../../lib/icons";
import { newId } from "../../lib/useSiteContent";

export function CrudSection({ config, content, save }) {
  const [editing, setEditing] = useState(null);
  const list = content[config.key] || [];

  const openNew = () => setEditing({ ...config.empty });
  const openEdit = (item) => setEditing(item);

  const onSave = (item) => {
    let next = item;
    if (config.beforeSave) next = config.beforeSave(next);
    const isNew = !list.some((x) => x.id === next.id);
    const withId = { ...next, id: next.id || newId(config.idPrefix) };
    const updated = isNew ? [withId, ...list] : list.map((x) => (x.id === withId.id ? withId : x));
    save({ ...content, [config.key]: updated });
    setEditing(null);
  };

  const onDelete = (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    save({ ...content, [config.key]: list.filter((x) => x.id !== id) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={openNew} className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-medium text-sm px-4 py-2 rounded-sm hover:bg-amber-300">
          <Plus size={15} /> Add {config.label.replace(/s$/, "")}
        </button>
        <span className="text-xs font-mono text-slate-500">{list.length} TOTAL</span>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-slate-500">No {config.label.toLowerCase()} yet — add the first one.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {list.map((item) => {
            const imgField = config.fields.find((f) => f.type === "image");
            const img = imgField ? item[imgField.key] : null;
            return (
              <div key={item.id} className="bg-white/[0.02] border border-white/10 rounded-md p-4 flex items-start justify-between gap-4">
                <div className="flex gap-3 min-w-0">
                  {imgField ? (
                    img ? (
                      <img src={img} alt="" className={`w-11 h-11 object-cover shrink-0 border border-white/10 ${imgField.round ? "rounded-full" : "rounded-sm"}`} />
                    ) : (
                      <div className={`w-11 h-11 bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 shrink-0 ${imgField.round ? "rounded-full" : "rounded-sm"}`}>
                        <Icon name={config.icon} size={16} />
                      </div>
                    )
                  ) : (
                    <div className="w-11 h-11 rounded-sm bg-amber-400/10 flex items-center justify-center shrink-0">
                      <Icon name={config.icon} size={16} className="text-amber-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-display text-sm text-white truncate">{item[config.titleField] || "Untitled"}</div>
                    <div className="text-xs text-amber-400/80 font-mono mt-0.5 truncate">
                      {Array.isArray(item[config.subtitleField]) ? item[config.subtitleField].join(", ") : item[config.subtitleField]}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(item)} className="text-slate-500 hover:text-amber-400"><Pencil size={15} /></button>
                  <button onClick={() => onDelete(item.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={15} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <EditModal
          title={editing.id ? `Edit ${config.label.replace(/s$/, "")}` : `Add ${config.label.replace(/s$/, "")}`}
          fields={config.fields}
          initial={editing}
          onSave={onSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}
