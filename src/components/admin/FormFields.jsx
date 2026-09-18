import { useState } from "react";
import { X, Image as ImageIcon, Plus } from "lucide-react";
import { ICON_NAMES, Icon } from "../../lib/icons";

// Raw file accepted before compression (generous, since phone photos can be large).
const MAX_INPUT_BYTES = 12 * 1024 * 1024;
// Cap on the final compressed image actually stored in the content JSON.
// Keeping this small is what keeps the site's pages loading quickly, since
// every image on the site is embedded directly in the content payload.
const MAX_STORED_BYTES = 450 * 1024;
const MAX_DIMENSION = 1280; // longest side, in px

function estimateBytesFromDataUrl(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.round((base64.length * 3) / 4);
}

function resizeImage(file, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not decode image."));
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width >= height) {
            height = Math.round((height / width) * MAX_DIMENSION);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width / height) * MAX_DIMENSION);
            height = MAX_DIMENSION;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        const keepPng = file.type === "image/png" || file.type === "image/gif";
        resolve(canvas.toDataURL(keepPng ? "image/png" : "image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Downscales and compresses an uploaded image before it's stored as a data
// URL, so pages don't ship full-resolution camera photos to every visitor.
async function processImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_INPUT_BYTES) throw new Error("Image is too large — please use one under 12MB.");

  // Vector images are already tiny and shouldn't be rasterized.
  if (file.type === "image/svg+xml") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read file."));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  let dataUrl = await resizeImage(file, 0.82);
  if (estimateBytesFromDataUrl(dataUrl) > MAX_STORED_BYTES && file.type !== "image/png") {
    dataUrl = await resizeImage(file, 0.6);
  }
  if (estimateBytesFromDataUrl(dataUrl) > MAX_STORED_BYTES) {
    throw new Error("This image is still too large after compression — please use a simpler image or crop it smaller.");
  }
  return dataUrl;
}

function readImage(file, onDone, onError) {
  if (!file) return;
  onError("");
  processImage(file)
    .then(onDone)
    .catch((e) => onError(e.message || "Could not process image."));
}

export function FieldRenderer({ field, value, onChange }) {
  const [err, setErr] = useState("");

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className="w-full bg-transparent border border-white/15 rounded-sm px-3 py-2 text-sm text-white h-28 focus:outline-none focus:border-amber-400"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
      return (
        <select
          className="w-full bg-[#0a1220] border border-white/15 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          value={value || field.options?.[0] || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );
    case "icon":
      return (
        <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto border border-white/10 rounded-sm p-2 mrd-scrollbar">
          {ICON_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`w-8 h-8 rounded-sm flex items-center justify-center border ${value === name ? "bg-amber-400 border-amber-400 text-slate-950" : "border-white/10 text-slate-400 hover:border-amber-400/60"}`}
              title={name}
            >
              <Icon name={name} size={15} />
            </button>
          ))}
        </div>
      );
    case "number":
      return (
        <input
          type="number"
          className="w-full bg-transparent border border-white/15 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "date":
      return (
        <input
          type="date"
          className="w-full bg-transparent border border-white/15 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 [color-scheme:dark]"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="accent-amber-400" />
          {field.checkboxLabel || "Enabled"}
        </label>
      );
    case "multiselect": {
      const arr = Array.isArray(value) ? value : [];
      const toggle = (opt) => {
        onChange(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
      };
      return (
        <div className="flex flex-wrap gap-1.5">
          {field.options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              className={`text-xs font-mono px-2.5 py-1.5 rounded-sm border transition-colors ${
                arr.includes(o) ? "bg-amber-400 text-slate-950 border-amber-400" : "border-white/15 text-slate-400 hover:border-amber-400/60"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      );
    }
    case "tags": {
      const arr = Array.isArray(value) ? value : [];
      const [draft, setDraft] = useState("");
      const add = () => {
        const v = draft.trim();
        if (v && !arr.includes(v)) onChange([...arr, v]);
        setDraft("");
      };
      return (
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {arr.map((t) => (
              <span key={t} className="flex items-center gap-1 text-xs font-mono bg-white/5 border border-white/10 rounded-sm px-2 py-1 text-slate-300">
                {t}
                <button type="button" onClick={() => onChange(arr.filter((x) => x !== t))}><X size={11} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-transparent border border-white/15 rounded-sm px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-400"
              placeholder="Add and press Enter"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
            />
            <button type="button" onClick={add} className="border border-white/15 rounded-sm px-2.5 text-slate-300 hover:border-amber-400"><Plus size={14} /></button>
          </div>
        </div>
      );
    }
    case "image": {
      return (
        <div>
          <div className="flex items-center gap-3">
            {value ? (
              <img src={value} alt="" className={`w-16 h-16 object-cover border border-white/10 ${field.round ? "rounded-full" : "rounded-sm"}`} />
            ) : (
              <div className={`w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 ${field.round ? "rounded-full" : "rounded-sm"}`}>
                <ImageIcon size={20} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <input
                type="file"
                accept="image/*"
                className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-white/15 file:bg-white/5 file:text-slate-300 file:text-xs file:cursor-pointer"
                onChange={(e) => readImage(e.target.files?.[0], onChange, setErr)}
              />
              {value && <button type="button" onClick={() => onChange("")} className="text-xs text-red-400 text-left hover:underline">Remove image</button>}
              {err && <span className="text-xs text-red-400">{err}</span>}
            </div>
          </div>
        </div>
      );
    }
    case "multiimage": {
      const arr = Array.isArray(value) ? value : [];
      return (
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {arr.map((img, i) => (
              <div key={i} className="relative w-16 h-16">
                <img src={img} alt="" className="w-16 h-16 object-cover rounded-sm border border-white/10" />
                <button type="button" onClick={() => onChange(arr.filter((_, idx) => idx !== i))} className="absolute -top-1.5 -right-1.5 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-white/15 file:bg-white/5 file:text-slate-300 file:text-xs file:cursor-pointer"
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              if (files.length === 0) return;
              setErr("");
              const notImage = files.find((f) => !f.type.startsWith("image/"));
              if (notImage) return setErr("Please choose image files only.");
              const oversized = files.find((f) => f.size > MAX_INPUT_BYTES);
              if (oversized) return setErr("One or more images are too large — please use images under 12MB each.");
              try {
                const results = await Promise.all(files.map(processImage));
                onChange([...(Array.isArray(value) ? value : []), ...results]);
                e.target.value = "";
              } catch (err) {
                setErr(err.message || "Could not process one or more images.");
              }
            }}
          />
          {err && <span className="text-xs text-red-400 block mt-1">{err}</span>}
        </div>
      );
    }
    default:
      return (
        <input
          type={field.inputType || "text"}
          placeholder={field.placeholder}
          className="w-full bg-transparent border border-white/15 rounded-sm px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
