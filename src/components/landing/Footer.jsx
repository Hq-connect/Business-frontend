import Logo from "../mockup/Logo";

const NAV = {
  Product:  ["Communication", "Meetings", "File Sharing", "Docs", "Calendar", "Tasks", "Search", "AI Workspace", "Analytics", "Org Management"],
  Solutions:["Startups", "SMEs", "Remote Teams", "Enterprise", "Agencies"],
  Company:  ["About", "Blog", "Careers", "Press", "Contact"],
  Legal:    ["Privacy", "Terms", "Security"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="h-8 w-auto flex items-center">
              <Logo />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-[22ch]">
              One workspace for every tool your team needs.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-zinc-400">All systems operational</span>
            </div>
          </div>

          {Object.entries(NAV).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold text-zinc-900 tracking-widest uppercase">{group}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-zinc-400 hover:text-zinc-900 transition-colors duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} HQ Connect. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">
            Made for teams that actually want to get work done.
          </p>
        </div>
      </div>
    </footer>
  );
}
