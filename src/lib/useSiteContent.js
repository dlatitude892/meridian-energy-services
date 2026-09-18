import { useState, useEffect, useCallback } from "react";
import { DEFAULT_CONTENT } from "./defaultContent";

const API_BASE = "/api";
const FETCH_RETRIES = 3;
const RETRY_DELAY_MS = [800, 1800]; // delay before retry #2 and #3

const DEV_ERROR =
  "Couldn't reach the content API. If you're developing locally, run 'netlify dev' instead of 'npm run dev' so the /api functions are available.";
const PROD_ERROR = "We couldn't load the latest page content — showing a cached version instead. Try refreshing the page.";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchContentWithRetry() {
  let lastErr;
  for (let attempt = 0; attempt < FETCH_RETRIES; attempt++) {
    if (attempt > 0) await wait(RETRY_DELAY_MS[attempt - 1] || 2000);
    try {
      const res = await fetch(`${API_BASE}/content`);
      if (!res.ok) throw new Error("Request failed");
      return await res.json();
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

export function useSiteContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // A weak or intermittent connection (common on mobile) can cause a
        // single fetch of the full content payload to fail outright rather
        // than just being slow — retry a couple of times before giving up
        // and falling back to the bundled default content.
        const data = await fetchContentWithRetry();
        // Merge over defaults so newly-added collections always exist even
        // against an older saved blob.
        setContent({ ...DEFAULT_CONTENT, ...data });
      } catch {
        setError(import.meta.env.DEV ? DEV_ERROR : PROD_ERROR);
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
        import.meta.env.DEV
          ? "Couldn't save — if you're developing locally, run 'netlify dev' so the /api functions are available."
          : "Couldn't save your changes — check your connection and try again."
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
