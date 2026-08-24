import { motion, useReducedMotion } from "motion/react";
import Logo from "../mockup/Logo";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Product", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Pricing", hasDropdown: false },
  { label: "Enterprise", hasDropdown: false },
];

export default function Navbar({ onNavigateOnboard }) {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col">

      {/* ── Announcement bar ───── dark, confident ── */}
      <div className="w-full bg-[#09090B] text-zinc-300 text-xs font-medium text-center py-2 px-4 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-zinc-500">New</span>
        <span className="text-zinc-400">HQ AI Workspace is now live in beta.</span>
        <button
          onClick={onNavigateOnboard}
          className="inline-flex items-center gap-1 text-white font-semibold hover:text-zinc-300 transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          Read announcement
          <ArrowRight size={10} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Main navbar ─────────────────────────── */}
      <motion.header
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className={`transition-all duration-200 ${
          scrolled
            ? "bg-[#FAF9F7]/95 backdrop-blur-md border-b border-zinc-200 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-[#FAF9F7] border-b border-zinc-200"
        }`}
      >
        <div className="max-w-7xl mx-auto h-[56px] px-6 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#" className="flex-shrink-0 h-9 w-auto flex items-center" aria-label="HQ Connect home">
            <Logo />
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, hasDropdown }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-0.5 px-3.5 h-9 rounded-lg text-[13.5px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-150"
              >
                {label}
                {hasDropdown && (
                  <ChevronDown size={12} strokeWidth={2} className="opacity-40 mt-px" />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onNavigateOnboard}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#09090B] text-white text-[13.5px] font-semibold hover:bg-[#18181B] active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              Get started
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
