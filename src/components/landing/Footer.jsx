import { Link } from "react-router-dom";
import Logo from "../mockup/Logo";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-neutral-200 pt-20 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section: Brand Info + Minimal Columns (Matches user screenshot) */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-20 sm:pb-28">
          {/* Left: Brand Identity */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="h-8 w-auto flex items-center" aria-label="HQ Connect home">
              <Logo />
            </Link>
            <div className="text-sm text-neutral-500 font-normal leading-relaxed space-y-1">
              <p>Copyright © {new Date().getFullYear()} HQ Connect Labs</p>
              <p>All rights reserved</p>
            </div>
          </div>

          {/* Right: Navigation Link Columns */}
          <div className="grid grid-cols-2 gap-16 sm:gap-24 text-sm">
            {/* Column 1: Main Links */}
            <div className="flex flex-col gap-3.5">
              <Link
                to="/#features"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                About
              </Link>
              <Link
                to="/#features"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                Services
              </Link>
              <Link
                to="/#features"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                Work
              </Link>
              <Link
                to="/#features"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                Careers
              </Link>
              <Link
                to="/onboard"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                Contact
              </Link>
            </div>

            {/* Column 2: Social / Community */}
            <div className="flex flex-col gap-3.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-black transition-colors duration-150"
              >
                Twitter / X
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Monumental Brand Watermark ── */}
      <div className="w-full select-none pointer-events-none overflow-hidden flex justify-center items-end leading-none pb-4 sm:pb-8 pt-4">
        <h2 className="font-extrabold uppercase tracking-tighter text-[14vw] sm:text-[15vw] xl:text-[16vw] leading-[0.8] whitespace-nowrap bg-gradient-to-b from-neutral-300 via-neutral-200/70 to-neutral-100/20 bg-clip-text text-transparent translate-y-0">
          HQ CONNECT
        </h2>
      </div>
    </footer>
  );
}
