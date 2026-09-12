const LOGOS = [
  { name: "Slack", src: "https://img.icons8.com/color/96/slack-new.png" },
  { name: "Notion", src: "https://img.icons8.com/color/96/notion--v1.png" },
  { name: "Zoom", src: "https://img.icons8.com/color/96/zoom.png" },
  { name: "Figma", src: "https://img.icons8.com/color/96/figma--v1.png" },
  { name: "Dropbox", src: "https://img.icons8.com/color/96/dropbox.png" },
  { name: "Google Drive", src: "https://img.icons8.com/color/96/google-drive--v1.png" },
  { name: "ChatGPT", src: "https://img.icons8.com/color/96/chatgpt.png" },
  { name: "Teams", src: "https://img.icons8.com/color/96/microsoft-teams.png" },
];

export default function IntegrationStrip() {
  return (
    <section className="py-20 md:py-32 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-gray-900 leading-tight">
          Trusted by teams who moved to{" "}
          <span className="text-gray-400">one workspace</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          From early-stage startups to enterprise — ambitious teams use HQ as
          their single platform for communication, collaboration, and management.
        </p>
      </div>

      {/* Logo grid — static, clean, Vitraga-style */}
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 max-w-4xl mx-auto px-6">
        {LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-all duration-300 cursor-default select-none"
          >
            <img
              src={logo.src}
              alt={logo.name}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
            <span className="text-xs font-medium text-gray-400">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
