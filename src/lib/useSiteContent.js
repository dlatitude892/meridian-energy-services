import { useState, useEffect, useCallback } from "react";
import { DEFAULT_CONTENT } from "./defaultContent";

const API_BASE = "/api";
// The whole site's content — including every uploaded image, embedded as
// base64 — is fetched in one request. On a slow/weak mobile connection that
// payload can simply take longer than a short retry loop allows, so instead
// of retrying fast and giving up, each attempt gets a generous timeout and
// attempts are spaced further apart.
const FETCH_RETRIES = 4;
const FETCH_TIMEOUT_MS = 20000; // let one attempt run up to 20s before giving up on it
const RETRY_DELAY_MS = [1000, 2500, 5000]; // delay before retry #2, #3, #4
const CACHE_KEY = "meridian_content_cache_v1";

const DEV_ERROR =
  "Couldn't reach the content API. If you're developing locally, run 'netlify dev' instead of 'npm run dev' so the /api functions are available.";
const PROD_ERROR = "We couldn't load the latest page content — showing a cached version instead. Try refreshing the page.";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    // Safari private browsing, storage disabled, corrupted entry, etc. —
    // just behave as if there's no cache.
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or storage unavailable — non-fatal, just skip caching.
  }
}

async function fetchContentOnce() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}/content`, { signal: controller.signal });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchContentWithRetry() {
  let lastErr;
  for (let attempt = 0; attempt < FETCH_RETRIES; attempt++) {
    if (attempt > 0) await wait(RETRY_DELAY_MS[attempt - 1] || 5000);
    try {
      return await fetchContentOnce();
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

export function useSiteContent() {
  // If this device has successfully loaded the site before, show that real
  // content immediately instead of the generic bundled placeholder while a
  // fresh copy loads in the background — this is what makes a slow/weak
  // connection a non-issue after the very first successful visit.
  const cached = readCache();
  const [content, setContent] = useState(cached ? { ...DEFAULT_CONTENT, ...cached } : DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // A weak or intermittent connection (common on mobile) can cause a
        // fetch of the full content payload to be slow or fail outright —
        // retry with generous per-attempt timeouts before giving up.
        const data = await fetchContentWithRetry();
        // Merge over defaults so newly-added collections always exist even
        // against an older saved blob.
        setContent({ ...DEFAULT_CONTENT, ...data });
        writeCache(data);
        setError("");
      } catch {
        // If we already have a real cached copy on screen, a failed
        // background refresh isn't worth alarming the visitor about — the
        // site is still showing their actual content, just not brand new.
        if (!cached) setError(import.meta.env.DEV ? DEV_ERROR : PROD_ERROR);
      }
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      writeCache(next);
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
