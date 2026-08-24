/* eslint-disable react/no-unknown-property */
const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="25 15 255 60"
      className="w-auto h-full max-h-9 overflow-visible"
    >
      {/* Equalizer Audio Frequency Animated Bars - Slower, fluid pulse */}
      <g transform="translate(30, 25)">
        {/* Bar 1 (Left) */}
        <rect
          x="0"
          y="10"
          width="12"
          height="30"
          rx="6"
          fill="#A1A1AA"
        >
          <animate
            attributeName="height"
            values="30; 16; 38; 22; 30"
            dur="2.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
          <animate
            attributeName="y"
            values="10; 24; 2; 18; 10"
            dur="2.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </rect>

        {/* Bar 2 (Center - Primary Dark) */}
        <rect
          x="18"
          y="0"
          width="12"
          height="40"
          rx="6"
          fill="#09090B"
        >
          <animate
            attributeName="height"
            values="40; 20; 44; 28; 40"
            dur="2.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
          <animate
            attributeName="y"
            values="0; 20; -4; 12; 0"
            dur="2.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </rect>

        {/* Bar 3 (Right) */}
        <rect
          x="36"
          y="15"
          width="12"
          height="25"
          rx="6"
          fill="#3F3F46"
        >
          <animate
            attributeName="height"
            values="25; 38; 14; 32; 25"
            dur="3.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
          <animate
            attributeName="y"
            values="15; 2; 26; 8; 15"
            dur="3.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </rect>
      </g>

      {/* Typography */}
      <text
        x="90"
        y="60"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="46"
        fontWeight="800"
        fill="#09090B"
        letterSpacing="-2"
      >
        hq
      </text>

      <text
        x="145"
        y="60"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="600"
        fill="#71717A"
        letterSpacing="3"
      >
        CONNECT
      </text>
    </svg>
  );
};

export default Logo;