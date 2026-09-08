import { useState, useEffect, useCallback } from "react";
import { DEFAULT_CONTENT } from "./defaultContent";

const API_BASE = "/api";

export function useSiteContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/content`);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        // Merge over defaults so newly-added collections always exist even
        // against an older saved blob.
        setContent({ ...DEFAULT_CONTENT, ...data });
      } catch {
        setError(
          "Couldn't reach the content API. If you're developing locally, run 'netlify dev' instead of 'npm run dev' so the /api functions are available."
        );
      }
      setLoaded(true);
    })();
  }, []);

  const save = useCallback(async (next) => {
    setContent(next);
    try {
      const res = await fetch(`${API_BASE}/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error("Save failed");
      setError("");
    } catch {
      setError(
        "Couldn't save — if you're developing locally, run 'netlify dev' so the /api functions are available."
      );
    }
  }, []);

  return { content, save, loaded, error };
}

export function newId(prefix) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function slugify(str) {
  return (str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
