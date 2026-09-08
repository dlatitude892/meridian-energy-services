// Demo-grade authentication for a static, serverless-blob-backed site.
// There is no real backend session store here — this gates the UI and is
// suitable for a small internal team, not for protecting sensitive data.
// (See README for notes on upgrading to real auth if this ever needs to
// hold non-public information.)

export const ADMIN_PASSWORD = "meridian2026admin";

const ADMIN_KEY = "meridian-admin-session";
const STAFF_KEY = "meridian-staff-session";

export function isAdminAuthed() {
  try {
    return sessionStorage.getItem(ADMIN_KEY) === "true";
  } catch {
    return false;
  }
}
export function setAdminAuthed(v) {
  try {
    if (v) sessionStorage.setItem(ADMIN_KEY, "true");
    else sessionStorage.removeItem(ADMIN_KEY);
  } catch {
    /* ignore */
  }
}

export function getStaffSession() {
  try {
    const raw = sessionStorage.getItem(STAFF_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function setStaffSession(staffMember) {
  try {
    if (staffMember) sessionStorage.setItem(STAFF_KEY, JSON.stringify(staffMember));
    else sessionStorage.removeItem(STAFF_KEY);
  } catch {
    /* ignore */
  }
}

export function findStaff(content, email, code) {
  const e = (email || "").trim().toLowerCase();
  return (content.staff || []).find(
    (s) => s.active && s.email.trim().toLowerCase() === e && s.code === code
  );
}
