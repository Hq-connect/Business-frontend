import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ServiceSection({ service, index = 0 }) {
  const reduce = useReducedMotion();
  const { Icon, title, headline, body, bullets, image, id } = service;
  const imageLeft = index % 2 === 0;

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  const ImagePane = () => (
    <motion.div {...fadeUp(0.1)} className="relative group">
      <Link to={`/services/${id}`} className="block">
        <div className="relative overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 aspect-[16/10]">
          <img
            src={image}
            alt={`HQ ${title}`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          {/* Hover arrow indicator — Sharp architectural badge */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-none bg-white/95 border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
            <ArrowRight size={15} strokeWidth={2} className="text-black -rotate-45" />
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const TextPane = () => (
    <div className="flex flex-col gap-5 max-w-lg">
      <motion.div {...fadeUp(0)} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-none border border-neutral-200 bg-neutral-100 flex items-center justify-center flex-shrink-0">
          <Icon size={16} strokeWidth={1.75} className="text-neutral-700" />
        </div>
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {title}
        </span>
      </motion.div>

      <motion.h2
        {...fadeUp(0.06)}
        className="text-2xl md:text-4xl font-normal tracking-tight text-neutral-900 leading-[1.12]"
      >
        {headline}
      </motion.h2>

      <motion.p
        {...fadeUp(0.12)}
        className="text-sm sm:text-base text-neutral-500 leading-relaxed"
      >
        {body}
      </motion.p>

      <motion.ul {...fadeUp(0.18)} className="flex flex-col gap-2 pt-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 bg-neutral-800 mt-2 flex-shrink-0" />
            <span className="text-sm text-neutral-600">{b}</span>
          </li>
        ))}
      </motion.ul>

      <motion.div {...fadeUp(0.24)}>
        <Link
          to={`/services/${id}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-black transition-colors duration-150 pt-2"
        >
          Learn more
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="group-hover:translate-x-1 transition-transform duration-150 text-black"
          />
        </Link>
      </motion.div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {imageLeft ? (
            <>
              <ImagePane />
              <TextPane />
            </>
          ) : (
            <>
              <TextPane />
              <ImagePane />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
