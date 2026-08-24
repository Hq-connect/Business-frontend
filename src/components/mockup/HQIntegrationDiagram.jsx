/* eslint-disable react/no-unknown-property */
const LOGOS = {
  notion:
    "https://img.icons8.com/color/96/notion--v1.png",
  jira:
    "https://img.icons8.com/color/96/jira.png",
  teams:
    "https://img.icons8.com/color/96/microsoft-teams.png",
  meet:
    "https://img.icons8.com/color/96/google-meet.png",
  excalidraw:
    "https://excalidraw.com/apple-touch-icon.png",
  gemini:
    "https://img.icons8.com/color/96/google-gemini.png",
};

/** Reusable floating card with a real logo image */
const LogoCard = ({ x, y, logoUrl, label, dur = "4s", begin = "0s" }) => (
  <g transform={`translate(${x}, ${y})`}>
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,-8; 0,0"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />

      {/* Card background */}
      <rect
        x="0"
        y="0"
        width="80"
        height="80"
        rx="16"
        fill="#FFFFFF"
        stroke="#E4E4E7"
        strokeWidth="1"
        filter="url(#card-shadow)"
      />

      {/* Real logo via CDN */}
      <image
        href={logoUrl}
        x="16"
        y="16"
        width="48"
        height="48"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Label */}
      <text
        x="40"
        y="105"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="#71717A"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  </g>
);

const HQIntegrationDiagram = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width="100%"
      height="100%"
      style={{ backgroundColor: "transparent" }}
    >
      <defs>
        {/* Drop Shadow for Cards */}
        <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#09090B"
            floodOpacity="0.08"
          />
        </filter>

        {/* Central Hub Glow */}
        <filter id="hub-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="16"
            floodColor="#09090B"
            floodOpacity="0.15"
          />
        </filter>

        <linearGradient id="zinc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
      </defs>

      {/* ==================== CONNECTION LINES ==================== */}

      <g fill="none" strokeWidth="3" strokeLinecap="round">
        {/* STATIC BACKGROUND TRACKS */}
        <path d="M 180 140 C 250 140, 250 300, 290 300" stroke="#E4E4E7" />
        <path d="M 180 460 C 250 460, 250 300, 290 300" stroke="#E4E4E7" />
        <path d="M 620 140 C 550 140, 550 300, 510 300" stroke="#E4E4E7" />
        <path d="M 620 460 C 550 460, 550 300, 510 300" stroke="#E4E4E7" />
        <path d="M 400 120 L 400 240" stroke="#E4E4E7" />
        <path d="M 400 480 L 400 360" stroke="#E4E4E7" />

        {/* ANIMATED DATA STREAMS */}
        <g stroke="#09090B" strokeDasharray="10, 12">
          <path d="M 180 140 C 250 140, 250 300, 290 300">
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          </path>

          <path d="M 180 460 C 250 460, 250 300, 290 300">
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          </path>

          <path d="M 620 140 C 550 140, 550 300, 510 300">
            <animate attributeName="stroke-dashoffset" from="0" to="22" dur="1s" repeatCount="indefinite" />
          </path>

          <path d="M 620 460 C 550 460, 550 300, 510 300">
            <animate attributeName="stroke-dashoffset" from="0" to="22" dur="1s" repeatCount="indefinite" />
          </path>

          <path d="M 400 120 L 400 240" stroke="#18181B" strokeWidth="4">
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          </path>

          <path d="M 400 480 L 400 360">
            <animate attributeName="stroke-dashoffset" from="0" to="22" dur="1s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* ==================== EXTERNAL TOOL NODES ==================== */}

      {/* 1. Notion — top-left */}
      <LogoCard x={100} y={100} logoUrl={LOGOS.notion} label="Notion" dur="4s" begin="0s" />

      {/* 2. Jira — top-right */}
      <g transform="translate(620, 100)">
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-8; 0,0"
            dur="4.2s"
            begin="1s"
            repeatCount="indefinite"
          />
          {/* Card bg */}
          <rect x="0" y="0" width="80" height="80" rx="16" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" filter="url(#card-shadow)" />
          {/* Jira icon */}
          <g transform="translate(16, 16)">
            <path
              d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V36C48 42.6274 42.6274 48 36 48H12C5.37258 48 0 42.6274 0 36V12Z"
              fill="#1868DB"
            />
            <path
              d="M17.9475 31.0469H15.2429C11.1638 31.0469 8.23755 28.5484 8.23755 24.8899H22.7804C23.5341 24.8899 24.0218 25.4252 24.0218 26.1837V40.8178C20.3861 40.8178 17.9475 37.8731 17.9475 33.7684V31.0469ZM25.1303 23.7745H22.4257C18.3466 23.7745 15.4203 21.3206 15.4203 17.6621H29.9631C30.7168 17.6621 31.2489 18.1528 31.2489 18.9113V33.5454C27.6132 33.5454 25.1303 30.6007 25.1303 26.496V23.7745ZM32.3573 16.5467H29.6527C25.5736 16.5467 22.6473 14.0482 22.6473 10.3896H37.1902C37.9439 10.3896 38.4316 10.925 38.4316 11.6389V26.273C34.7959 26.273 32.3573 23.3283 32.3573 19.2236V16.5467Z"
              fill="#FFFFFF"
            />
          </g>
          <text x="40" y="105" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#71717A" textAnchor="middle">
            Jira
          </text>
        </g>
      </g>

      {/* 3. Microsoft Teams — bottom-left */}
      <LogoCard x={100} y={420} logoUrl={LOGOS.teams} label="Teams" dur="3.8s" begin="0.5s" />

      {/* 4. Google Meet — bottom-right */}
      <LogoCard x={620} y={420} logoUrl={LOGOS.meet} label="Google Meet" dur="4.5s" begin="1.5s" />

      {/* 5. Excalidraw — bottom-center */}
      <LogoCard x={360} y={480} logoUrl={LOGOS.excalidraw} label="Excalidraw" dur="4s" begin="0.8s" />

      {/* 6. Gemini AI — top-center */}
      <g transform="translate(360, 40)">
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-8; 0,0"
            dur="3.5s"
            begin="0.2s"
            repeatCount="indefinite"
          />
          {/* Card bg */}
          <rect x="0" y="0" width="80" height="80" rx="16" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" filter="url(#card-shadow)" />
          <defs>
            <linearGradient id="gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="50%" stopColor="#3F3F46" />
              <stop offset="100%" stopColor="#71717A" />
            </linearGradient>
          </defs>
          <g transform="translate(40, 40)">
            <path d="M0,-28 C5,-14 5,-5 0,0 C-5,-5 -5,-14 0,-28Z" fill="url(#gem-g)" />
            <path d="M0,28 C5,14 5,5 0,0 C-5,5 -5,14 0,28Z" fill="url(#gem-g)" />
            <path d="M-28,0 C-14,5 -5,5 0,0 C-5,-5 -14,-5 -28,0Z" fill="url(#gem-g)" />
            <path d="M28,0 C14,5 5,5 0,0 C5,-5 14,-5 28,0Z" fill="url(#gem-g)" />
          </g>
          <text x="40" y="105" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#71717A" textAnchor="middle">
            AI Workflows
          </text>
        </g>
      </g>

      {/* ==================== CENTRAL HUB (HQ) ==================== */}

      <g transform="translate(290, 240)">
        <g>
          {/* Background Pulse Ring */}
          <rect
            x="0"
            y="0"
            width="220"
            height="120"
            rx="24"
            fill="none"
            stroke="#09090B"
            strokeWidth="4"
            filter="url(#hub-glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3; 0.9; 0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Main Plate */}
          <rect
            x="0"
            y="0"
            width="220"
            height="120"
            rx="24"
            fill="#FFFFFF"
            stroke="#E4E4E7"
            strokeWidth="2"
            filter="url(#card-shadow)"
          />

          {/* HQ Logo in Zinc palette */}
          <g transform="translate(35, 30)">
            <rect x="0" y="10" width="12" height="30" rx="6" fill="#A1A1AA" />
            <rect x="18" y="0" width="12" height="40" rx="6" fill="#09090B" opacity="0.9" />
            <rect x="36" y="15" width="12" height="25" rx="6" fill="#3F3F46" />

            <text
              x="65"
              y="42"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="46"
              fontWeight="800"
              fill="#09090B"
              letterSpacing="-2"
            >
              hq
            </text>
          </g>

          {/* Synced badge */}
          <rect x="70" y="90" width="80" height="24" rx="12" fill="#09090B" />
          <text
            x="110"
            y="106"
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="700"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="1"
          >
            SYNCED
          </text>
        </g>
      </g>
    </svg>
  );
};

export default HQIntegrationDiagram;