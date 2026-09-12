import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SERVICES from "../data/services";

const ease = [0.16, 1, 0.3, 1];

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const reduce = useReducedMotion();
  const service = SERVICES.find((s) => s.id === serviceId);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [serviceId]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const currentIndex = SERVICES.findIndex((s) => s.id === serviceId);
  const prevService = currentIndex > 0 ? SERVICES[currentIndex - 1] : null;
  const nextService = currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : null;

  const { Icon, title, headline, detailBody, features, image, replaces } = service;

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  const fadeInView = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-8">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-sm text-gray-300">/</span>
            <span className="text-sm text-gray-600">{title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none border border-neutral-200 bg-neutral-100 flex items-center justify-center">
                  <Icon size={20} strokeWidth={1.75} className="text-neutral-700" />
                </div>
                <div>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    {title}
                  </span>
                  {replaces && (
                    <p className="text-xs text-neutral-400">Replaces {replaces}</p>
                  )}
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp(0.1)}
                className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.1]"
              >
                {headline}
              </motion.h1>

              <motion.div {...fadeUp(0.15)} className="flex flex-col gap-4">
                {detailBody.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base text-neutral-500 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="pt-4">
                <Link
                  to="/onboard"
                  className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 rounded-none cursor-pointer"
                >
                  Start for free
                </Link>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 aspect-[4/3]"
            >
              <img
                src={image}
                alt={`HQ ${title}`}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 md:py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInView(0)} className="max-w-2xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-normal tracking-tight text-gray-900 mb-4">
              Everything you need for{" "}
              <span className="text-gray-400">{title.toLowerCase()}</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              Built natively into HQ, not bolted on as an afterthought.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeInView(i * 0.05)}
                className="flex flex-col gap-3"
              >
                <h3 className="text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeInView(0)}
            className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900 mb-4"
          >
            Ready to try {title}?
          </motion.h2>
          <motion.p
            {...fadeInView(0.05)}
            className="text-base text-gray-500 mb-8 leading-relaxed"
          >
            Get started with HQ today. All 10 modules included in every plan.
          </motion.p>
          <motion.div
            {...fadeInView(0.1)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/onboard"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 rounded-none cursor-pointer"
            >
              Start for free
            </Link>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              View all features
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {prevService ? (
              <Link
                to={`/services/${prevService.id}`}
                className="group flex items-center gap-4 py-8 sm:pr-8 hover:bg-gray-50/50 transition-colors"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  className="text-gray-400 group-hover:-translate-x-1 transition-transform duration-200"
                />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Previous
                  </p>
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {prevService.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                to={`/services/${nextService.id}`}
                className="group flex items-center justify-end gap-4 py-8 sm:pl-8 hover:bg-gray-50/50 transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Next
                  </p>
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {nextService.title}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="text-gray-400 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
