import { createContext, useContext } from "react";
import { useSiteContent } from "./useSiteContent";

const Ctx = createContext(null);

export function ContentProvider({ children }) {
  const state = useSiteContent();
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useContent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
