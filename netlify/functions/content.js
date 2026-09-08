import { getStore } from "@netlify/blobs";
import seedContent from "./seed-content.js";

// NOTE: this function uses Netlify Functions v2 syntax (a default export
// taking standard Request/Response objects) rather than the older v1 style
// (`export const handler = async (event) => {...}`). This matters for
// Netlify Blobs specifically: v1-style functions have a known issue in
// production where the Blobs environment (siteID/token) is not reliably
// auto-injected even when getStore() is called inside the handler, causing
// a "MissingBlobsEnvironmentError". v2 functions get it consistently.

const BLOB_KEY = "content";
const STORE_NAME = "meridian-energy-content";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  const store = getStore(STORE_NAME);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "GET") {
    try {
      let data = await store.get(BLOB_KEY, { type: "json" });
      if (!data) {
        // First run in this site: seed from the bundled starter content.
        data = seedContent;
        await store.setJSON(BLOB_KEY, data);
      }
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to read content", detail: String((err && err.message) || err) }),
        { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }
  }

  if (req.method === "PUT") {
    try {
      const next = await req.json().catch(() => null);
      if (!next || typeof next !== "object") {
        return new Response(JSON.stringify({ error: "Invalid content payload" }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }
      await store.setJSON(BLOB_KEY, next);
      return new Response(JSON.stringify(next), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to save content", detail: String((err && err.message) || err) }),
        { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405, headers });
};
