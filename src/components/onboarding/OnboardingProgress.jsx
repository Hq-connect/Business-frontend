import { Check } from "lucide-react";

export default function OnboardingProgress({ currentStep, onStepClick }) {
  const steps = [
    { number: 1, label: "Organization & Settings" },
    { number: 2, label: "Owner & Security" },
  ];

  return (
    <div className="flex items-center justify-between gap-4 px-6 pt-5 pb-2 border-b border-zinc-100">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onStepClick(step.number)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                isCompleted
                  ? "bg-zinc-900 text-white"
                  : isActive
                  ? "bg-zinc-900 text-white ring-4 ring-zinc-100"
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : step.number}
            </button>

            <div className="flex flex-col">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-zinc-900" : "text-zinc-400"}`}>
                Step {step.number}
              </span>
              <span className={`text-xs font-medium ${isActive ? "text-zinc-900" : "text-zinc-400"}`}>
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex-1 h-px bg-zinc-200 mx-2 hidden sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}
