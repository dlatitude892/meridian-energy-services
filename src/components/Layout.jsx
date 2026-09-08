import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useContent } from "../lib/ContentContext";

export function Layout() {
  const { content, error } = useContent();
  return (
    <div className="bg-[#05070a] font-sans min-h-screen">
      {error && (
        <div className="fixed top-0 inset-x-0 z-[70] bg-red-600 text-white text-xs font-mono text-center py-2 px-4">
          {error}
        </div>
      )}
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer content={content} />
    </div>
  );
}
