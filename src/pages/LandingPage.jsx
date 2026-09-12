import ParticleBackground from "../components/landing/ParticleBackground";
import HeroSection from "../components/landing/HeroSection";
import IntegrationStrip from "../components/landing/IntegrationStrip";
import ServiceSection from "../components/landing/ServiceSection";
import FeatureGrid from "../components/landing/FeatureGrid";
import CTASection from "../components/landing/CTASection";
import SERVICES from "../data/services";

/* Show the top 4 most compelling services on the landing page */
const FEATURED_SERVICES = SERVICES.filter((s) =>
  ["communication", "docs", "tasks", "ai"].includes(s.id)
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      {/* ── Top Hero + Integration Experience with Interactive Particle Background ── */}
      <div className="relative overflow-hidden bg-white">
        <ParticleBackground />
        <div className="relative z-10">
          <HeroSection />
          <IntegrationStrip />
        </div>
        {/* Subtle bottom fade transition into standard white sections */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      </div>

      {/* ── Remaining sections stay standard clean white ── */}
      <FeatureGrid />

      {FEATURED_SERVICES.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          index={i}
        />
      ))}

      <CTASection />
    </div>
  );
}
