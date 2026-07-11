import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Icon = {
  target: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3 2 8.5 12 14l10-5.5L12 3Z" />
      <path d="m2 15.5 10 5.5 10-5.5" />
      <path d="m2 12 10 5.5L22 12" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  zap: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  ),
  code: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
      <path d="m14 4-4 16" />
    </svg>
  ),
  server: (p: IconProps) => (
    <svg {...base(p)}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  smartphone: (p: IconProps) => (
    <svg {...base(p)}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </svg>
  ),
  cloud: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.5-1.5A4 4 0 0 0 6 19h11.5Z" />
    </svg>
  ),
  sparkles: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.3 6.3 2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2" />
    </svg>
  ),
  palette: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.5-1-2 0-3 .5-.5 1.5-.5 2.5-.5A5 5 0 0 0 21 11c0-4.4-4-8-9-8Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="16.5" cy="10.5" r="1" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  pen: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  ),
  rocket: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.8-2.2 0-3s-2.2-.8-3 0Z" />
      <path d="M9 12a11 11 0 0 1 8-9c1.5 3.5 1 7-2 10-1.4 1.4-3.5 2.5-5 3l-4-4c.5-1.5 1.6-3.6 3-5Z" />
      <circle cx="14.5" cy="8.5" r="1.2" />
    </svg>
  ),
  trend: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="m3 17 6-6 4 4 7-7" />
      <path d="M17 8h4v4" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
  quote: (p: IconProps) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="M7 7c-2.2 0-4 1.8-4 4s1.8 4 4 4c0 2-1 3-3 4 4 0 7-3 7-8 0-4-1.8-8-4-8Zm10 0c-2.2 0-4 1.8-4 4s1.8 4 4 4c0 2-1 3-3 4 4 0 7-3 7-8 0-4-1.8-8-4-8Z" />
    </svg>
  ),
  star: (p: IconProps) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="m12 2 2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 20.4 7.4 13l-5-4.3 6.6-.6L12 2Z" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.75 2.6 4.75 6V21H18v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H10V9Z" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  twitter: (p: IconProps) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="M18.9 3H22l-7.1 8.1L23 21h-6.6l-5.1-6.7L5.5 21H2.4l7.6-8.7L1.6 3h6.7l4.6 6.1L18.9 3Zm-1.2 16h1.8L7.3 4.8H5.4L17.7 19Z" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  mapPin: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
