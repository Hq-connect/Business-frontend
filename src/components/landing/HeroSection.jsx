import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6 pt-20 pb-32 gap-6">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
            <span className="w-1.5 h-1.5 bg-emerald-500" />
            All-in-one workspace for modern teams
          </span>
        </motion.div>

        {/* Headline — Vitraga style: font-normal, very large */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-gray-900 leading-[1.08] max-w-4xl"
        >
          One product for your{" "}
          <span className="text-gray-400">entire work stack.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto"
        >
          HQ is a single workspace with messaging, video, docs, tasks, files,
          calendar, search, AI, analytics, and admin — all built in natively.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            to="/onboard"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 rounded-none cursor-pointer"
          >
            Start for free
          </Link>
          <Link
            to="#"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            See all features
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
