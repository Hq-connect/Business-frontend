import {
  MessageCircle, Video, Upload, FileText, Calendar,
  CheckSquare, Search, Sparkles, BarChart2, Users,
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ServiceSection from "../components/landing/ServiceSection";
import IntegrationStrip from "../components/landing/IntegrationStrip";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

/* ─────────────────────────────────────────
   10 HQ-native features.
   HQ is NOT an integration hub - it PROVIDES
   all these capabilities natively.
───────────────────────────────────────── */
const SERVICES = [
  {
    id: "communication",
    title: "Communication",
    headline: "The messaging platform your team deserves",
    body: "HQ has built-in channels, threads, and direct messaging. Everything your team needs to communicate clearly, right inside the same workspace where docs, tasks, and files live.",
    bullets: [
      "Persistent channels organized by team, project, or topic",
      "Threaded replies that keep the main feed clean",
      "Voice huddles, rich media, and inline emoji reactions",
    ],
    image: "/hq-chat.png",
    replaces: "Slack",
    Icon: MessageCircle,
  },
  {
    id: "meetings",
    title: "Meetings",
    headline: "Video calls that start where your work already is",
    body: "Launch HD video calls from any channel, document, or task in HQ. No Zoom links, no app-switching. Meet in context, record automatically, and get AI summaries the moment the call ends.",
    bullets: [
      "HD video, screen share, and recording built in",
      "AI-generated meeting summaries with action items",
      "One-click calls from messages, docs, and tasks",
    ],
    image: "/hq-meetings.png",
    replaces: "Zoom / Teams",
    Icon: Video,
  },
  {
    id: "filesharing",
    title: "File Sharing",
    headline: "Your files, where your actual work lives",
    body: "Upload, preview, and collaborate on files right inside HQ - alongside the conversations and tasks they belong to. No more digging through shared drives or emailing attachments.",
    bullets: [
      "Version history on every file with one-click restore",
      "In-browser preview for 50+ file formats",
      "Granular permissions per file, folder, or workspace",
    ],
    image: "https://picsum.photos/seed/hq-file-storage-browser/1200/800",
    replaces: "Dropbox / Drive",
    Icon: Upload,
  },
  {
    id: "docs",
    title: "Collaborative Docs",
    headline: "The doc editor your whole team will actually use",
    body: "HQ's built-in document editor lets your team write, edit, and publish together in real time. Link tasks, embed decisions, and build a knowledge base that stays connected to the work itself.",
    bullets: [
      "Real-time multiplayer editing with presence cursors",
      "Embed tasks, diagrams, and code blocks inline",
      "Publish as internal wiki or external knowledge base",
    ],
    image: "/hq-docs.png",
    replaces: "Notion / Confluence",
    Icon: FileText,
  },
  {
    id: "calendar",
    title: "Calendar",
    headline: "A calendar that sees your full workload",
    body: "HQ's calendar is aware of your tasks, deadlines, and teammates' schedules. Smart scheduling finds the right time across time zones - no back-and-forth emails required.",
    bullets: [
      "Unified view: meetings, tasks, and deadlines together",
      "Smart availability across time zones and teams",
      "Meeting room and resource booking, built in",
    ],
    image: "https://picsum.photos/seed/hq-team-calendar-schedule/1200/800",
    replaces: "Google Calendar",
    Icon: Calendar,
  },
  {
    id: "tasks",
    title: "Task Management",
    headline: "Track work. Not spreadsheets.",
    body: "Create, assign, and prioritize work right where the conversations happen. Board, list, and timeline views let every team work the way they think - without adopting a new tool.",
    bullets: [
      "Board, list, and timeline views in one click",
      "Subtasks, dependencies, and smart due-date tracking",
      "Workflow automation to move work without manual effort",
    ],
    image: "/hq-tasks.png",
    replaces: "Jira / Asana",
    Icon: CheckSquare,
  },
  {
    id: "search",
    title: "Enterprise Search",
    headline: "Find anything across your entire workspace",
    body: "One search bar reaches every message, doc, file, task, and meeting decision inside HQ. No more asking teammates where something is stored or remembering which app it was in.",
    bullets: [
      "Instant search across all 10 HQ modules at once",
      "Filter by type, person, project, or date range",
      "Saved searches with real-time result updates",
    ],
    image: "/hq-search.png",
    replaces: null,
    Icon: Search,
  },
  {
    id: "ai",
    title: "AI Workspace",
    headline: "An AI that knows your business, not just the internet",
    body: "HQ's built-in AI is trained on your actual work - docs, meeting notes, task history, and decisions. Ask real questions. Get answers that are actually grounded in what your team knows.",
    bullets: [
      "Draft and rewrite any document or message in seconds",
      "Summarize long threads and past meetings with one click",
      "Answers grounded in your team's own knowledge base",
    ],
    image: "/hq-ai.png",
    replaces: "ChatGPT subscriptions",
    Icon: Sparkles,
  },
  {
    id: "analytics",
    title: "Analytics",
    headline: "See where work flows and where it stalls",
    body: "Dashboards built from real work data inside HQ - not surveys or time-tracking. Managers spot blockers before they become problems. Leadership gets the visibility they need without asking for it.",
    bullets: [
      "Live team activity and communication health",
      "Project velocity and on-time delivery rates",
      "Export-ready reports for leadership reviews",
    ],
    image: "/hq-analytics.png",
    replaces: null,
    Icon: BarChart2,
  },
  {
    id: "org",
    title: "Organization Management",
    headline: "Enterprise control, without the enterprise headache",
    body: "Manage every team, role, and permission from one admin panel inside HQ. SSO, audit logs, and compliance tools are built in - not bolted on as expensive add-ons.",
    bullets: [
      "SAML/OIDC single sign-on with any identity provider",
      "Role-based access control down to the channel level",
      "Compliance audit logs and full data export",
    ],
    image: "https://picsum.photos/seed/hq-admin-org-chart/1200/800",
    replaces: null,
    Icon: Users,
  },
];

export default function LandingPage({ onNavigateOnboard }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <Navbar onNavigateOnboard={onNavigateOnboard} />
      <HeroSection onNavigateOnboard={onNavigateOnboard} />
      <IntegrationStrip />

      {SERVICES.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          imageLeft={i % 2 === 0}
          index={i}
        />
      ))}

      <CTASection onNavigateOnboard={onNavigateOnboard} />
      <Footer />
    </div>
  );
}
