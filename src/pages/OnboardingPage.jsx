import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/mockup/Logo";
import Step1OrgDetails from "../components/onboarding/Step1OrgDetails";
import Step2OwnerCredentials from "../components/onboarding/Step2OwnerCredentials";
import OnboardingProgress from "../components/onboarding/OnboardingProgress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle2, Globe, Sparkles, ShieldCheck } from "lucide-react";
import { onboardTenant } from "@/service/service";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const onBackToHome = () => navigate("/");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
    ownerPassword: "",
    settings: {
      timezone: "UTC",
      language: "en",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  // Helper to convert tenant name to valid slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);
  };

  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    setFormData((prev) => {
      const nextSlug = autoSlug ? generateSlug(nameVal) : prev.slug;
      return {
        ...prev,
        name: nameVal,
        slug: nextSlug,
      };
    });
    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
    if (autoSlug && errors.slug) setErrors((prev) => ({ ...prev, slug: null }));
  };

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    const slugVal = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({ ...prev, slug: slugVal }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: null }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSettingsChange = (settingKey, value) => {
    setFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [settingKey]: value,
      },
    }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Tenant name is required";
    } else if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      errs.name = "Tenant name must be between 2 and 100 characters";
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!formData.slug.trim()) {
      errs.slug = "Tenant slug is required";
    } else if (formData.slug.length < 2 || formData.slug.length > 50) {
      errs.slug = "Slug must be between 2 and 50 characters";
    } else if (!slugRegex.test(formData.slug)) {
      errs.slug = "Slug can only contain lowercase letters, numbers and hyphens";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.ownerFirstName.trim()) {
      errs.ownerFirstName = "Owner first name is required";
    } else if (formData.ownerFirstName.trim().length < 2 || formData.ownerFirstName.trim().length > 50) {
      errs.ownerFirstName = "Owner first name must be between 2 and 50 characters";
    }

    if (formData.ownerLastName && formData.ownerLastName.trim().length > 50) {
      errs.ownerLastName = "Owner last name cannot exceed 50 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.ownerEmail.trim()) {
      errs.ownerEmail = "Owner email is required";
    } else if (!emailRegex.test(formData.ownerEmail.trim())) {
      errs.ownerEmail = "Please provide a valid owner email";
    }

    if (!formData.ownerPassword) {
      errs.ownerPassword = "Owner password is required";
    } else if (formData.ownerPassword.length < 8 || formData.ownerPassword.length > 128) {
      errs.ownerPassword = "Password must be between 8 and 128 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrev = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      handleNext();
      return;
    }

    if (!validateStep2()) return;

    setIsSubmitting(true);

    await onboardTenant(formData);
    const finalSlug = formData.slug;

    // Redirect to the newly created tenant workspace
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      window.location.href = `http://localhost:5174/?slug=${finalSlug}`;
    } else {
      window.location.href = `https://${finalSlug}.hqconnect.xyz`;
    }

    setFormData({
      name: "",
      slug: "",
      ownerFirstName: "",
      ownerLastName: "",
      ownerEmail: "",
      ownerPassword: "",
      settings: {
        timezone: "UTC",
        language: "en",
      },
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between relative overflow-hidden">

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column — Value proposition panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6 pt-2"
          >
            <div>
              <Badge variant="outline" className="mb-3 border-zinc-300 bg-white text-zinc-700 font-medium px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1.5 text-zinc-900 inline" />
                2-Step Organization Setup
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
                Deploy your HQ organization in seconds.
              </h1>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Set up your team's dedicated tenant, configure settings, and create owner credentials under your domain.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Custom Subdomain</p>
                  <p className="text-[11px] text-zinc-500">Dedicated workspace at your-slug.hqconnect.xyz</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">All 10 Modules Included</p>
                  <p className="text-[11px] text-zinc-500">Chat, Meetings, Docs, Tasks, AI Brain & more</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-none bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck size={12} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Enterprise Isolation</p>
                  <p className="text-[11px] text-zinc-500">Tenant-isolated storage and security</p>
                </div>
              </div>
            </div>

            {/* Live Subdomain Preview Card */}
            <div className="p-4 rounded-none border border-zinc-200 bg-white/90 shadow-sm space-y-1.5 mt-2">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Live URL Preview</span>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-800 bg-zinc-50 p-2.5 rounded-none border border-zinc-200 truncate">
                <Globe size={14} className="text-zinc-500 flex-shrink-0" />
                <span className="truncate">
                  https://<strong className="text-zinc-900 font-bold">{formData.slug || "your-slug"}</strong>.hqconnect.xyz
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column — 2-Part Onboarding Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <Card className="border-zinc-200 shadow-xl bg-white rounded-none overflow-hidden">
              <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
                <CardTitle className="text-xl font-bold text-zinc-900">Create Tenant Workspace</CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Step {currentStep} of 2 — {currentStep === 1 ? "Organization & Preferences" : "Owner & Account Credentials"}
                </CardDescription>
              </CardHeader>

              {/* Progress Bar */}
              <OnboardingProgress
                currentStep={currentStep}
                onStepClick={(step) => {
                  if (step === 1) setCurrentStep(1);
                  if (step === 2 && validateStep1()) setCurrentStep(2);
                }}
              />

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Step1OrgDetails
                        formData={formData}
                        errors={errors}
                        autoSlug={autoSlug}
                        onNameChange={handleNameChange}
                        onSlugChange={handleSlugChange}
                        onSettingsChange={handleSettingsChange}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Step2OwnerCredentials
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Navigation Buttons */}
                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/50 pt-4 pb-5">
                  <div>
                    {currentStep === 2 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className="h-10 px-4 text-xs font-semibold cursor-pointer border-zinc-300"
                      >
                        <ArrowLeft size={14} className="mr-1" />
                        Back
                      </Button>
                    ) : (
                      <span className="text-[11px] text-zinc-400">
                        Target URL: <strong className="text-zinc-700 font-mono">{formData.slug || "slug"}.hqconnect.xyz</strong>
                      </span>
                    )}
                  </div>

                  {currentStep === 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto h-11 px-7 bg-black text-white hover:bg-neutral-800 font-semibold text-sm rounded-none transition-all cursor-pointer"
                    >
                      Next Step
                      <ArrowRight size={14} className="ml-1.5" strokeWidth={2.5} />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-11 px-7 bg-black text-white hover:bg-neutral-800 font-semibold text-sm rounded-none transition-all shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Creating Workspace...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Launch Organization
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </span>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200/60 py-4 px-6 text-center text-xs text-zinc-400">
        &copy; {new Date().getFullYear()} HQ Connect Platform Inc. All rights reserved.
      </footer>
    </div>
  );
}
