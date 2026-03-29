export default function ButterflyLogo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="40"
        cy="40"
        rx="38"
        ry="38"
        fill="none"
        stroke="url(#goldRing)"
        strokeWidth="1"
      />
      <path
        d="M40 40 C20 20, 5 28, 8 44 C11 58, 28 54, 40 40Z"
        fill="url(#wingL)"
        opacity="0.9"
      />
      <path
        d="M40 40 C60 20, 75 28, 72 44 C69 58, 52 54, 40 40Z"
        fill="url(#wingR)"
        opacity="0.9"
      />
      <path
        d="M40 40 C22 50, 14 62, 22 70 C30 76, 40 64, 40 40Z"
        fill="url(#wingBL)"
        opacity="0.8"
      />
      <path
        d="M40 40 C58 50, 66 62, 58 70 C50 76, 40 64, 40 40Z"
        fill="url(#wingBR)"
        opacity="0.8"
      />
      <ellipse cx="40" cy="42" rx="3.5" ry="8" fill="url(#goldBody)" />
      <circle cx="40" cy="40" r="3" fill="url(#gemGrad)" />
      <defs>
        <linearGradient id="goldRing" x1="0" y1="0" x2="80" y2="80">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="50%" stopColor="#F0D080" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="wingL" x1="8" y1="20" x2="40" y2="55">
          <stop offset="0%" stopColor="#9B2335" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="wingR" x1="72" y1="20" x2="40" y2="55">
          <stop offset="0%" stopColor="#2E6B3E" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="wingBL" x1="14" y1="55" x2="40" y2="76">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#9B2335" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wingBR" x1="66" y1="55" x2="40" y2="76">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#2E6B3E" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="goldBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0D080" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <radialGradient id="gemGrad">
          <stop offset="0%" stopColor="#FFF5CC" />
          <stop offset="100%" stopColor="#C9A84C" />
        </radialGradient>
      </defs>
    </svg>
  );
}
