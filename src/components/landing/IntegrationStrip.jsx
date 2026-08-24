const REPLACED_TOOLS = [
  { name: "Slack",    src: "https://img.icons8.com/color/96/slack-new.png" },
  { name: "Notion",   src: "https://img.icons8.com/color/96/notion--v1.png" },
  { name: "Zoom",     src: "https://img.icons8.com/color/96/zoom.png" },
  { name: "Jira",     jira: true },
  { name: "Figma",    src: "https://img.icons8.com/color/96/figma--v1.png" },
  { name: "Dropbox",  src: "https://img.icons8.com/color/96/dropbox.png" },
  { name: "G. Drive", src: "https://img.icons8.com/color/96/google-drive--v1.png" },
  { name: "ChatGPT",  src: "https://img.icons8.com/color/96/chatgpt.png" },
  { name: "Teams",    src: "https://img.icons8.com/color/96/microsoft-teams.png" },
];

const JiraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36" height="36" aria-label="Jira">
    <path d="M0 12C0 5.373 5.373 0 12 0h24C42.627 0 48 5.373 48 12v24c0 6.627-5.373 12-12 12H12C5.373 48 0 42.627 0 36V12z" fill="#1868DB"/>
    <path d="M17.948 31.047h-2.705C11.164 31.047 8.238 28.548 8.238 24.89h14.542c.754 0 1.241.535 1.241 1.294V40.818c-3.636 0-6.074-2.945-6.074-7.049v-2.722zM25.13 23.775h-2.704c-4.079 0-7.005-2.454-7.005-6.113h14.543c.754 0 1.241.49 1.241 1.248v15.635c-3.636 0-6.075-2.945-6.075-7.05v-2.72zm7.228-7.228h-2.705c-4.079 0-7.005-2.499-7.005-6.157H37.19c.754 0 1.242.535 1.242 1.249V26.273c-3.636 0-6.074-2.945-6.074-7.05v-2.676z" fill="#fff"/>
  </svg>
);

const ToolItem = ({ tool }) => (
  <div className="flex-shrink-0 flex flex-col items-center gap-1.5 px-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-90 transition-all duration-300 cursor-default select-none">
    {tool.jira
      ? <JiraIcon />
      : <img src={tool.src} alt={tool.name} width={36} height={36} className="w-9 h-9 object-contain" loading="lazy" />
    }
    <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">{tool.name}</span>
  </div>
);

export default function IntegrationStrip() {
  const all = [...REPLACED_TOOLS, ...REPLACED_TOOLS, ...REPLACED_TOOLS, ...REPLACED_TOOLS];

  return (
    <section className="bg-white border-y border-zinc-200 py-20">
      {/* Editorial headline — edworking style */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
          Your team does not have a productivity problem.
          <br />
          <span className="text-zinc-400">It has a tab problem.</span>
        </p>
        <p className="text-sm text-zinc-400 max-w-[52ch] mx-auto leading-relaxed">
          The average team runs work across five or more paid tools. None of them talk to each other.
          HQ builds all of this natively — so everything does.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {all.map((tool, i) => <ToolItem key={i} tool={tool} />)}
        </div>
      </div>
    </section>
  );
}
