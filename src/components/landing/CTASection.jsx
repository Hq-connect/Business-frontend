import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "10", label: "modules built in" },
  { value: "1", label: "flat subscription" },
  { value: "0", label: "per-seat charges" },
];

export default function CTASection({ onNavigateOnboard }) {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 bg-[#FAF9F7] border-t border-zinc-200">
      <div className="max-w-5xl mx-auto px-6">

        {/* Stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-4 mb-16 max-w-xl mx-auto text-center"
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold text-zinc-900 tracking-tight">{s.value}</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dark card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden bg-[#09090B] border border-zinc-800"
        >
          {/* Subtle dot grid on dark */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.04em] text-white mb-5 max-w-[14ch] mx-auto leading-[1.06]">
              Stop paying for 10 tools. Start using one.
            </h2>
            <p className="text-zinc-400 text-[15px] max-w-[46ch] mx-auto mb-10 leading-relaxed">
              HQ gives your team messaging, meetings, docs, tasks, files, calendar, search, AI, analytics, and org management in one place. Cancel the rest.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onNavigateOnboard}
                className="inline-flex items-center gap-2 h-11 px-7 rounded-xl bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-black/30 cursor-pointer"
              >
                Get Started Free
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
              <button
                onClick={onNavigateOnboard}
                className="inline-flex items-center h-11 px-6 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                Talk to sales
              </button>
            </div>

            <p className="mt-8 text-zinc-600 text-xs">
              Free 14-day trial&nbsp;&nbsp;·&nbsp;&nbsp;No credit card required&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
