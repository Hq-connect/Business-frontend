import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.08] mb-6"
        >
          Everything your team needs.{" "}
          <span className="text-gray-400">One product.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Messaging, video, docs, tasks, files, calendar, search, AI, analytics,
          and admin — all built into a single workspace. No integrations needed.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/onboard"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 rounded-none cursor-pointer"
          >
            Get started free
          </Link>
          <Link
            to="#"
            className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Talk to sales
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-sm text-gray-400"
        >
          Free 14-day trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
