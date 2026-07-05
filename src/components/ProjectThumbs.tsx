export function MarinaThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="marina-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e40af" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#marina-bg)" />
      {/* Water waves */}
      <path d="M0 200 Q60 180 120 200 T240 200 T360 200 T480 200 V280 H0Z" fill="rgba(255,255,255,0.08)" />
      <path d="M0 220 Q60 200 120 220 T240 220 T360 220 T480 220 V280 H0Z" fill="rgba(255,255,255,0.06)" />
      {/* Dock lines */}
      <rect x="80" y="120" width="4" height="80" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="160" y="100" width="4" height="100" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="240" y="110" width="4" height="90" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="320" y="95" width="4" height="105" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="400" y="115" width="4" height="85" rx="2" fill="rgba(255,255,255,0.25)" />
      {/* Horizontal dock */}
      <rect x="60" y="195" width="370" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      {/* Boat shapes */}
      <path d="M120 170 L140 170 L145 185 L115 185Z" fill="rgba(255,255,255,0.35)" />
      <line x1="130" y1="155" x2="130" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <path d="M280 160 L310 160 L316 180 L274 180Z" fill="rgba(255,255,255,0.35)" />
      <line x1="295" y1="140" x2="295" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Grid dots */}
      <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="80" cy="40" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="120" cy="40" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}

export function DocuSignThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="docu-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#065f46" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#docu-bg)" />
      {/* Document */}
      <rect x="160" y="40" width="160" height="200" rx="8" fill="rgba(255,255,255,0.15)" />
      <rect x="160" y="40" width="160" height="200" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Document lines */}
      <rect x="185" y="75" width="100" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="185" y="95" width="80" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="185" y="115" width="110" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="185" y="135" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      {/* Signature line */}
      <line x1="185" y1="195" x2="295" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Signature curve */}
      <path d="M195 190 Q210 170 225 188 Q235 198 250 180 Q260 170 275 185" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Checkmark */}
      <circle cx="370" cy="70" r="24" fill="rgba(255,255,255,0.2)" />
      <path d="M358 70 L367 79 L382 62" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Key icon */}
      <circle cx="110" cy="200" r="14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
      <line x1="124" y1="200" x2="148" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="140" y1="200" x2="140" y2="210" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    </svg>
  );
}

export function PowerBIThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pbi-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b21b6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#pbi-bg)" />
      {/* Dashboard frame */}
      <rect x="60" y="35" width="360" height="210" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* Bar chart */}
      <rect x="100" y="170" width="28" height="50" rx="4" fill="rgba(255,255,255,0.35)" />
      <rect x="140" y="140" width="28" height="80" rx="4" fill="rgba(255,255,255,0.45)" />
      <rect x="180" y="110" width="28" height="110" rx="4" fill="rgba(255,255,255,0.55)" />
      <rect x="220" y="130" width="28" height="90" rx="4" fill="rgba(255,255,255,0.4)" />
      <rect x="260" y="90" width="28" height="130" rx="4" fill="rgba(255,255,255,0.6)" />
      {/* Line chart overlay */}
      <path d="M114 160 L154 125 L194 95 L234 115 L274 75" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="114" cy="160" r="4" fill="white" fillOpacity="0.8" />
      <circle cx="154" cy="125" r="4" fill="white" fillOpacity="0.8" />
      <circle cx="194" cy="95" r="4" fill="white" fillOpacity="0.8" />
      <circle cx="234" cy="115" r="4" fill="white" fillOpacity="0.8" />
      <circle cx="274" cy="75" r="4" fill="white" fillOpacity="0.8" />
      {/* KPI cards */}
      <rect x="320" y="70" width="80" height="40" rx="6" fill="rgba(255,255,255,0.12)" />
      <rect x="320" y="125" width="80" height="40" rx="6" fill="rgba(255,255,255,0.12)" />
      <rect x="320" y="180" width="80" height="40" rx="6" fill="rgba(255,255,255,0.12)" />
      <rect x="335" y="82" width="40" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="335" y="93" width="50" height="8" rx="3" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

export function MobileAppThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mob-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e7490" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#mob-bg)" />
      {/* Phone frame */}
      <rect x="185" y="20" width="110" height="240" rx="18" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <rect x="193" y="38" width="94" height="200" rx="4" fill="rgba(255,255,255,0.1)" />
      {/* Status bar */}
      <rect x="220" y="26" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
      {/* App content - map area */}
      <rect x="200" y="50" width="80" height="60" rx="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="230" cy="75" r="8" fill="rgba(255,255,255,0.25)" />
      <path d="M230 67 L230 75 M226 71 L234 71" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* List items */}
      <rect x="200" y="120" width="80" height="14" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="200" y="140" width="80" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="200" y="160" width="80" height="14" rx="4" fill="rgba(255,255,255,0.1)" />
      {/* Bottom nav */}
      <rect x="200" y="210" width="80" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
      <circle cx="218" cy="221" r="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="240" cy="221" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="262" cy="221" r="4" fill="rgba(255,255,255,0.3)" />
      {/* Floating elements */}
      <rect x="70" y="80" width="90" height="55" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="85" y="95" width="50" height="5" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="85" y="108" width="35" height="8" rx="3" fill="rgba(255,255,255,0.3)" />
      <rect x="320" y="120" width="90" height="55" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="335" y="135" width="50" height="5" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="335" y="148" width="35" height="8" rx="3" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

export function WebPlatformThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="web-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#166534" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#web-bg)" />
      {/* Browser window */}
      <rect x="50" y="30" width="380" height="220" rx="10" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      {/* Title bar */}
      <rect x="50" y="30" width="380" height="30" rx="10" fill="rgba(255,255,255,0.1)" />
      <circle cx="72" cy="45" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="90" cy="45" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="108" cy="45" r="5" fill="rgba(255,255,255,0.25)" />
      <rect x="150" y="39" width="160" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      {/* Sidebar */}
      <rect x="50" y="60" width="90" height="190" fill="rgba(255,255,255,0.05)" />
      <rect x="65" y="80" width="55" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="65" y="100" width="45" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="65" y="120" width="50" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="65" y="140" width="40" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
      {/* Content cards */}
      <rect x="160" y="75" width="120" height="75" rx="8" fill="rgba(255,255,255,0.12)" />
      <rect x="295" y="75" width="120" height="75" rx="8" fill="rgba(255,255,255,0.12)" />
      <rect x="160" y="165" width="120" height="75" rx="8" fill="rgba(255,255,255,0.12)" />
      <rect x="295" y="165" width="120" height="75" rx="8" fill="rgba(255,255,255,0.12)" />
      {/* Card content */}
      <rect x="175" y="90" width="60" height="5" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="175" y="102" width="90" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="175" y="114" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="175" y="130" width="40" height="10" rx="5" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

export function BookStoreThumbnail() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="book-bg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9d174d" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="480" height="280" fill="url(#book-bg)" />
      {/* Bookshelf rows */}
      <rect x="60" y="200" width="360" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="60" y="130" width="360" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      {/* Books row 1 */}
      <rect x="80" y="140" width="22" height="58" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="108" y="148" width="18" height="50" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="132" y="142" width="25" height="56" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="163" y="150" width="16" height="48" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="185" y="138" width="28" height="60" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="220" y="145" width="20" height="53" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="248" y="140" width="24" height="58" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="280" y="152" width="18" height="46" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="305" y="143" width="22" height="55" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="335" y="148" width="20" height="50" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="362" y="138" width="26" height="60" rx="2" fill="rgba(255,255,255,0.35)" />
      {/* Open book */}
      <path d="M190 60 Q240 80 240 100 L240 100 Q240 80 290 60Z" fill="rgba(255,255,255,0.3)" />
      <path d="M190 60 Q240 80 240 100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
      <path d="M290 60 Q240 80 240 100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
      {/* Page lines */}
      <line x1="205" y1="72" x2="235" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="208" y1="80" x2="236" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="255" y1="85" x2="280" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="252" y1="90" x2="278" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Shopping cart */}
      <circle cx="390" cy="50" r="20" fill="rgba(255,255,255,0.15)" />
      <path d="M382 48 L386 48 L390 56 L398 56" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="391" cy="61" r="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="397" cy="61" r="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export const projectThumbnails = [
  MarinaThumbnail,
  DocuSignThumbnail,
  PowerBIThumbnail,
  MobileAppThumbnail,
  WebPlatformThumbnail,
  BookStoreThumbnail,
];
