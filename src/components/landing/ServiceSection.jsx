import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function ServiceSection({ service, imageLeft = true, index = 0 }) {
  const reduce = useReducedMotion();
  const { Icon, title, headline, body, bullets, image, replaces } = service;
  const isEven = index % 2 === 0;

  const slide = (fromLeft) =>
    reduce ? {} : {
      initial: { opacity: 0, x: fromLeft ? -40 : 40 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.22 },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    };

  const fadeUp = (delay = 0) =>
    reduce ? {} : {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.22 },
      transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
    };

  const ImagePane = () => (
    <motion.div {...slide(imageLeft)} className="relative group">
      <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-card-lg">
        <div className="flex items-center gap-1.5 px-4 h-9 border-b border-zinc-100 bg-zinc-50">
          <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <span className="w-2 h-2 rounded-full bg-[#FDBC2C]" />
          <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          <div className="ml-2.5 flex-1 h-4 max-w-[160px] rounded bg-zinc-200/60 flex items-center px-2">
            <span className="text-[9px] font-mono text-zinc-400 truncate">
              hq.io/{title.toLowerCase().replace(/\s/g, "-")}
            </span>
          </div>
        </div>
        <img
          src={image}
          alt={`HQ ${title} feature`}
          className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </motion.div>
  );

  const TextPane = () => (
    <div className="flex flex-col gap-5 max-w-[480px]">
      <motion.div {...fadeUp(0.04)} className="flex items-center gap-2.5 flex-wrap">
        <div className="w-9 h-9 rounded-lg border border-zinc-200 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
          <Icon size={18} strokeWidth={1.75} className="text-zinc-600" />
        </div>
        <span className="text-[12px] font-semibold text-zinc-500 uppercase tracking-widest">{title}</span>
        {replaces && (
          <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400 text-[10px] font-medium border border-zinc-200">
            replaces {replaces}
          </span>
        )}
      </motion.div>

      <motion.h2
        {...fadeUp(0.1)}
        className="text-[2rem] md:text-[2.4rem] font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900"
      >
        {headline}
      </motion.h2>

      <motion.p {...fadeUp(0.16)} className="text-[15px] text-zinc-500 leading-relaxed">
        {body}
      </motion.p>

      <motion.div {...fadeUp(0.22)} className="flex flex-col gap-2.5 pt-1">
        {bullets.map((b, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.28 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-2.5"
          >
            <CheckCircle2 size={15} strokeWidth={2} className="text-zinc-700 mt-0.5 flex-shrink-0" />
            <span className="text-[13.5px] text-zinc-600">{b}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className={`py-20 md:py-28 ${isEven ? "bg-[#FAF9F7]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="h-px bg-zinc-200" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {imageLeft ? <><ImagePane /><TextPane /></> : <><TextPane /><ImagePane /></>}
        </div>
      </div>
    </section>
  );
}
