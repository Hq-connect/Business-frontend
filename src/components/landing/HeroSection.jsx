import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import HQIntegrationDiagram from "../mockup/HQIntegrationDiagram";
import { ArrowRight, Play } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

/* Module chips shown below CTAs — inspired by edworking's feature row */
const MODULES = [
  "Chat", "Meetings", "Docs", "Tasks", "Files",
  "Calendar", "Search", "AI Brain", "Analytics", "Org Mgmt",
];

/* Word-by-word stagger for headline */
const words1 = ["Your", "entire", "work", "stack."];
const words2 = ["One", "workspace."];

const wordVariant = {
  hidden:  { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, delay: 0.05 + i * 0.08, ease },
  }),
};

export default function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const diagramY       = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const diagramOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const fadeUp = (delay = 0) => reduce ? {} : {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center pt-[108px] pb-0 overflow-hidden bg-[#FAF9F7]"
    >
      {/* ── Subtle line grid ─────────────────── */}
      <div className="absolute inset-0 bg-line-grid pointer-events-none opacity-100" />

      {/* ── Text block ──────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[860px] mx-auto px-6 pt-16 gap-7">

        {/* Eyebrow — tight, confident */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 text-xs font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            10 modules. One login. Zero tab switching.
          </span>
        </motion.div>

        {/* Headline — word-stagger on first load */}
        <h1 className="text-[3.25rem] sm:text-[4rem] md:text-[5rem] font-extrabold leading-[1.03] tracking-[-0.04em] text-zinc-900">
          {reduce ? (
            <>Your entire work stack.<br /><span className="text-zinc-400">One workspace.</span></>
          ) : (
            <>
              <span className="block">
                {words1.map((w, i) => (
                  <motion.span key={w} custom={i} variants={wordVariant} initial="hidden" animate="visible"
                    className="inline-block mr-[0.22em]">{w}</motion.span>
                ))}
              </span>
              <span className="text-zinc-400 block">
                {words2.map((w, i) => (
                  <motion.span key={w} custom={words1.length + i} variants={wordVariant} initial="hidden" animate="visible"
                    className="inline-block mr-[0.22em]">{w}</motion.span>
                ))}
              </span>
            </>
          )}
        </h1>

        {/* Subtext */}
        <motion.p {...fadeUp(0.48)} className="text-[1.0625rem] text-zinc-500 max-w-[50ch] leading-relaxed">
          HQ replaces Slack, Notion, Zoom, Jira, and Dropbox with one unified platform
          where everything talks to everything else. Less cost. More output.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.56)} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#09090B] text-white text-sm font-semibold hover:bg-[#18181B] active:scale-[0.98] transition-all duration-150 shadow-md shadow-zinc-900/20"
          >
            Start for free
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-200 bg-white text-zinc-700 text-sm font-medium hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] transition-all duration-150"
          >
            <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center">
              <Play size={10} strokeWidth={3} className="text-zinc-700 ml-0.5" />
            </span>
            Watch 2-min demo
          </a>
        </motion.div>

        {/* Trust line — edworking-style */}
        <motion.p {...fadeUp(0.64)} className="text-xs text-zinc-400 font-medium tracking-wide">
          One login&nbsp;&nbsp;·&nbsp;&nbsp;Ten modules&nbsp;&nbsp;·&nbsp;&nbsp;Zero context switching
        </motion.p>

        {/* Module chip strip */}
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {MODULES.map((mod) => (
            <span
              key={mod}
              className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white text-zinc-500 text-[11px] font-medium shadow-sm"
            >
              {mod}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Direct Integration Diagram (No Browser Chrome) ── */}
      <div
        className="relative z-10 w-full max-w-[1000px] mx-auto px-4 sm:px-8 mt-6"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 0%" }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease }}
          style={reduce ? {} : { y: diagramY, opacity: diagramOpacity }}
          className="relative w-full aspect-[16/8]"
        >
          {/* Direct SVG Diagram */}
          <HQIntegrationDiagram />

          {/* Floating status badges */}
          <div className="absolute top-2 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-xs font-medium text-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All 10 modules active
          </div>
          <div className="absolute top-2 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#09090B] border border-zinc-800 shadow-sm text-xs font-medium text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Real-time native sync
          </div>
        </motion.div>

        {/* Fade to bg */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF9F7] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
