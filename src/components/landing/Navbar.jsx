import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Logo from "../mockup/Logo";
import { ArrowRight, Menu, X } from "lucide-react";
import SERVICES from "../../data/services";

const smoothEase = [0.16, 1, 0.3, 1];

/* ── Plus to X Rotator (Instant, crisp CSS rotation without frame delays) ── */
function PlusIcon({ isOpen }) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 ml-1 text-neutral-800 transition-transform duration-200 ease-out origin-center select-none pointer-events-none"
      style={{
        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
      }}
      aria-hidden="true"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const reduce = useReducedMotion();
  const location = useLocation();
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Smooth scroll detector
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback((name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <>
      {/* ── Fixed Header Wrapper ─────────────────────────── */}
      <header
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "pt-2 sm:pt-3" : "pt-4 md:pt-6"
        }`}
      >
        <nav
          className={`pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between rounded-none ${
            scrolled
              ? "max-w-4xl mx-4 px-6 py-2.5 bg-white/90 backdrop-blur-md border border-neutral-200 shadow-md shadow-neutral-900/5 gap-6"
              : "max-w-7xl mx-auto px-6 py-2 bg-transparent border border-transparent shadow-none"
          }`}
          style={{ WebkitBackdropFilter: scrolled ? "blur(16px)" : "none" }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeDropdown}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="HQ Connect home"
          >
            <div className="h-8 flex items-center transition-transform duration-200 group-hover:opacity-80">
              <Logo />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Features Dropdown Button */}
            <button
              onClick={() => toggleDropdown("Features")}
              className={`inline-flex items-center px-3.5 py-1.5 text-[15px] font-medium transition-colors duration-150 cursor-pointer rounded-none ${
                activeDropdown === "Features"
                  ? "text-black font-semibold"
                  : "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
              }`}
            >
              <span>Features</span>
              <PlusIcon isOpen={activeDropdown === "Features"} />
            </button>

            {/* Solutions Dropdown Button */}
            <button
              onClick={() => toggleDropdown("Solutions")}
              className={`inline-flex items-center px-3.5 py-1.5 text-[15px] font-medium transition-colors duration-150 cursor-pointer rounded-none ${
                activeDropdown === "Solutions"
                  ? "text-black font-semibold"
                  : "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
              }`}
            >
              <span>Solutions</span>
              <PlusIcon isOpen={activeDropdown === "Solutions"} />
            </button>

            {/* Direct Links */}
            <a
              href="/#features"
              onClick={closeDropdown}
              className="px-3.5 py-1.5 text-[15px] font-medium text-neutral-600 hover:text-black hover:bg-neutral-100/70 transition-colors duration-150 rounded-none"
            >
              Overview
            </a>
            <a
              href="/#pricing"
              onClick={closeDropdown}
              className="px-3.5 py-1.5 text-[15px] font-medium text-neutral-600 hover:text-black hover:bg-neutral-100/70 transition-colors duration-150 rounded-none"
            >
              Pricing
            </a>
          </div>

          {/* Right Action: Pure Black Sharp Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/onboard"
              onClick={closeDropdown}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 rounded-none shadow-sm cursor-pointer"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-1.5 text-neutral-800 hover:text-black rounded-none focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ── Dropdown Overlay (Backdrop Blur) ────────────────── */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDropdown}
            className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* ── Dropdown Mega Menus (Sharp Edges, Black Accent) ─── */}
      <AnimatePresence>
        {activeDropdown === "Features" && (
          <motion.div
            key="features-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: smoothEase }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-5xl bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-2xl rounded-none overflow-hidden"
          >
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              {/* Left Column: SOLUTIONS */}
              <div className="w-full md:w-5/12 p-6 sm:p-8 bg-neutral-50/70 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-6">
                    Solutions
                  </p>

                  <div className="space-y-6">
                    <Link
                      to="/services/communication"
                      onClick={closeDropdown}
                      className="group block"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-neutral-900 group-hover:text-black transition-colors duration-150">
                          Unified Collaboration
                        </h4>
                        <ArrowRight
                          size={15}
                          className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-150"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed group-hover:text-neutral-700">
                        Persistent team channels, direct messaging, HD video huddles, and shared docs in one continuous flow.
                      </p>
                    </Link>

                    <Link
                      to="/services/taskmanagement"
                      onClick={closeDropdown}
                      className="group block"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-neutral-900 group-hover:text-black transition-colors duration-150">
                          Operations & Execution
                        </h4>
                        <ArrowRight
                          size={15}
                          className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-150"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed group-hover:text-neutral-700">
                        Agile Kanban boards, real-time file sharing, and team calendars keeping your projects on track.
                      </p>
                    </Link>

                    <Link
                      to="/services/aiassistant"
                      onClick={closeDropdown}
                      className="group block"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-neutral-900 group-hover:text-black transition-colors duration-150">
                          AI Intelligence & Control
                        </h4>
                        <ArrowRight
                          size={15}
                          className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-150"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed group-hover:text-neutral-700">
                        Deep global search, contextual AI assistant, team analytics, and enterprise admin safeguards.
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200 mt-6">
                  <span className="text-xs text-neutral-500">
                    HQ is <strong>one single product</strong> — all capabilities built-in natively.
                  </span>
                </div>
              </div>

              {/* Right Column: SERVICES / ALL FEATURES */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-5">
                    Features
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {SERVICES.map((s) => {
                      const Icon = s.Icon;
                      return (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          onClick={closeDropdown}
                          className="group flex items-center gap-3 p-2.5 rounded-none hover:bg-neutral-100 transition-colors duration-150"
                        >
                          <div className="w-8 h-8 rounded-none bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center flex-shrink-0 transition-colors duration-150 text-neutral-700 group-hover:text-black">
                            <Icon size={16} strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-800 group-hover:text-black transition-colors duration-150 truncate">
                              {s.title}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200 mt-6">
                  <a
                    href="/#features"
                    onClick={closeDropdown}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-none bg-neutral-100 hover:bg-neutral-200 text-sm font-medium text-neutral-900 transition-colors duration-150"
                  >
                    <span>View all features</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Solutions Mega Menu (Sharp Edges, Black Accent) ── */}
        {activeDropdown === "Solutions" && (
          <motion.div
            key="solutions-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: smoothEase }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-5xl bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-2xl rounded-none p-6 sm:p-8 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Tailored for every stage
              </p>
              <span className="text-xs text-neutral-400">One product fits all workflows</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Startups */}
              <div className="group rounded-none border border-neutral-200 bg-neutral-50/50 p-5 hover:bg-neutral-100/60 transition-all duration-150">
                <span className="inline-block px-2.5 py-1 rounded-none text-[11px] font-medium bg-neutral-200/80 text-neutral-800 border border-neutral-300/60 mb-3">
                  For Startups
                </span>
                <h4 className="text-base font-semibold text-neutral-900 group-hover:text-black transition-colors duration-150">
                  Zero setup overhead
                </h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed group-hover:text-neutral-700">
                  Avoid paying thousands across Slack, Zoom, Notion, and Asana. Launch your entire workspace in 2 minutes.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-medium text-neutral-800 group-hover:text-black">
                  <span>Explore starter kit</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Fast Growth Teams */}
              <div className="group rounded-none border border-neutral-200 bg-neutral-50/50 p-5 hover:bg-neutral-100/60 transition-all duration-150">
                <span className="inline-block px-2.5 py-1 rounded-none text-[11px] font-medium bg-neutral-200/80 text-neutral-800 border border-neutral-300/60 mb-3">
                  For Scale-ups
                </span>
                <h4 className="text-base font-semibold text-neutral-900 group-hover:text-black transition-colors duration-150">
                  Cross-functional alignment
                </h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed group-hover:text-neutral-700">
                  Keep marketing, engineering, and sales in perfect sync without switching tabs or context loss.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-medium text-neutral-800 group-hover:text-black">
                  <span>Scale your team</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Remote Organizations */}
              <div className="group rounded-none border border-neutral-200 bg-neutral-50/50 p-5 hover:bg-neutral-100/60 transition-all duration-150">
                <span className="inline-block px-2.5 py-1 rounded-none text-[11px] font-medium bg-neutral-200/80 text-neutral-800 border border-neutral-300/60 mb-3">
                  For Remote Teams
                </span>
                <h4 className="text-base font-semibold text-neutral-900 group-hover:text-black transition-colors duration-150">
                  Async-first culture
                </h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed group-hover:text-neutral-700">
                  Persistent discussion threads, auto-transcribed video meetings, and live collaborative docs.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-medium text-neutral-800 group-hover:text-black">
                  <span>Remote best practices</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
              <Link
                to="/onboard"
                onClick={closeDropdown}
                className="inline-flex items-center gap-1.5 font-medium text-neutral-900 hover:text-black hover:underline"
              >
                <span>Start using HQ for free</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Navigation Drawer (Sharp Edges) ─────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: smoothEase }}
            className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-none shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {/* Features section toggle */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded((prev) =>
                      prev === "features" ? null : "features"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-base font-semibold text-neutral-900 rounded-none"
                >
                  <span>Features</span>
                  <PlusIcon isOpen={mobileExpanded === "features"} />
                </button>
                {mobileExpanded === "features" && (
                  <div className="pl-3 pt-2 grid grid-cols-1 gap-2">
                    {SERVICES.map((s) => {
                      const Icon = s.Icon;
                      return (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 text-sm text-neutral-600 hover:text-black rounded-none"
                        >
                          <Icon size={15} />
                          <span>{s.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Solutions section toggle */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded((prev) =>
                      prev === "solutions" ? null : "solutions"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-base font-semibold text-neutral-900 rounded-none"
                >
                  <span>Solutions</span>
                  <PlusIcon isOpen={mobileExpanded === "solutions"} />
                </button>
                {mobileExpanded === "solutions" && (
                  <div className="pl-3 pt-2 flex flex-col gap-2">
                    <span className="text-sm text-neutral-600">Startups</span>
                    <span className="text-sm text-neutral-600">Scale-ups</span>
                    <span className="text-sm text-neutral-600">Remote Teams</span>
                  </div>
                )}
              </div>

              <a
                href="/#features"
                onClick={() => setMobileOpen(false)}
                className="py-2 text-base font-semibold text-neutral-900 rounded-none"
              >
                Overview
              </a>
              <a
                href="/#pricing"
                onClick={() => setMobileOpen(false)}
                className="py-2 text-base font-semibold text-neutral-900 rounded-none"
              >
                Pricing
              </a>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  to="/onboard"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-neutral-800 rounded-none shadow-sm"
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
