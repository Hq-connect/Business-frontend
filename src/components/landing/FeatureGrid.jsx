import { motion, useReducedMotion } from "motion/react";
import {
  Terminal, Zap, Route, Cloud,
  ShieldCheck, HeartHandshake, BadgeCheck, Scaling,
} from "lucide-react";

const FEATURES = [
  {
    icon: Terminal,
    title: "All-in-One Platform",
    desc: "Messaging, video, docs, tasks, files, calendar, search, AI, analytics, and admin — every feature your team needs, built natively into one product.",
  },
  {
    icon: Zap,
    title: "Zero Context Switching",
    desc: "Every module talks to every other module natively. No integrations to configure, no data silos, no broken workflows.",
  },
  {
    icon: Route,
    title: "Built for Speed",
    desc: "Optimized for performance from day one. Sub-second load times, real-time sync across all modules, and instant search across your entire workspace.",
  },
  {
    icon: Cloud,
    title: "Enterprise Infrastructure",
    desc: "Auto-scaling, load-balanced, monitored 24/7. Your workspace stays online and fast, even under heavy traffic.",
  },
  {
    icon: ShieldCheck,
    title: "Security First",
    desc: "SOC 2 compliant, end-to-end encryption, SAML/OIDC SSO, and comprehensive audit logs baked into every build.",
  },
  {
    icon: HeartHandshake,
    title: "Effortless Migration",
    desc: "One-click import from Slack, Notion, Jira, and more. We handle the migration so your team can start working immediately.",
  },
  {
    icon: BadgeCheck,
    title: "Uncompromising Quality",
    desc: "Built by engineers who use their own product daily. Rigorous testing, weekly improvements, and zero tolerance for bugs.",
  },
  {
    icon: Scaling,
    title: "Scales With You",
    desc: "From 5-person startups to 5,000-person enterprises. Every plan includes all modules — no feature gating, no per-seat surprises.",
  },
];

export default function FeatureGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl lg:text-5xl font-normal tracking-tight text-gray-900 leading-tight">
            Why teams choose{" "}
            <span className="text-gray-400">HQ</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-500 mt-4 leading-relaxed max-w-2xl">
            HQ is built to solve the fragmentation problem. One product that
            does everything, so your team can focus on the work that matters.
          </p>
        </div>

        {/* Feature grid — Vitraga 4-col with left-border hover accent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const isTopRow = i < 4;
            return (
              <motion.div
                key={feature.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col py-10 px-8 border-gray-200 transition-colors
                  lg:border-r last:lg:border-r-0
                  ${isTopRow ? "lg:border-b" : ""}
                  ${i % 4 === 0 ? "lg:border-l" : ""}
                `}
              >
                {/* Hover gradient — Vitraga style */}
                <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />

                {/* Icon */}
                <div className="mb-4 relative z-10 text-gray-500">
                  <feature.icon size={22} strokeWidth={1.75} />
                </div>

                {/* Title with left accent bar */}
                <div className="relative z-10 text-base font-medium mb-2">
                  <div className="absolute left-[-2rem] inset-y-0 h-6 w-1 rounded-none bg-neutral-200 group-hover:bg-black group-hover:h-8 transition-all duration-200 origin-center" />
                  <span className="group-hover:translate-x-1 transition duration-200 inline-block text-gray-800 group-hover:text-black">
                    {feature.title}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
