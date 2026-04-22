import React from 'react';

const Icon = ({ d, size = 20, strokeWidth = 1.8, fill = "none", children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {d && <path d={d} />}
    {children}
  </svg>
);

export const Icons = {
  Camera: (p) => <Icon {...p}><path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/></Icon>,
  Pin: (p) => <Icon {...p}><path d="M12 22s7-7.6 7-12a7 7 0 1 0-14 0c0 4.4 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></Icon>,
  Plus: (p) => <Icon {...p} d="M12 5v14M5 12h14" />,
  Map: (p) => <Icon {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></Icon>,
  Home: (p) => <Icon {...p} d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  Leaf: (p) => <Icon {...p}><path d="M20 4s-2 10-9 13c-5 2-8-2-8-2s1-9 8-12c4-2 9 1 9 1z"/><path d="M3 21c4-6 9-10 17-17"/></Icon>,
  Trophy: (p) => <Icon {...p}><path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M18 6h3a3 3 0 0 1-3 3M6 6H3a3 3 0 0 0 3 3M10 14h4v3h2l1 3H7l1-3h2z"/></Icon>,
  Bell: (p) => <Icon {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>,
  Inbox: (p) => <Icon {...p}><path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 13h6l1 2h4l1-2h6"/></Icon>,
  People: (p) => <Icon {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 19c0-2 2-4 4-4s2.5 1 2.5 2"/></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>,
  Help: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.5c-.8.4-1 1-1 2M12 17h.01"/></Icon>,
  ArrowRight: (p) => <Icon {...p} d="M5 12h14m-5-5 5 5-5 5" />,
  ArrowLeft: (p) => <Icon {...p} d="M19 12H5m5-5-5 5 5 5" />,
  Check: (p) => <Icon {...p} d="M4 12l5 5 11-11" />,
  Close: (p) => <Icon {...p} d="M6 6l12 12M18 6 6 18" />,
  Upload: (p) => <Icon {...p}><path d="M12 15V4m-4 4 4-4 4 4"/><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/></Icon>,
  Flag: (p) => <Icon {...p} d="M4 21V4h13l-2 5 2 5H4" />,
  Share: (p) => <Icon {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 11 16 7M8.5 13 16 17"/></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-6 2 2-6z"/></Icon>,
  Sparkle: (p) => <Icon {...p} d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2 2m8 8 2 2M18 6l-2 2M8 16l-2 2" />,
  Timer: (p) => <Icon {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></Icon>,
  Weight: (p) => <Icon {...p}><path d="M5 8h14l1 12H4z"/><path d="M9 8a3 3 0 1 1 6 0"/></Icon>,
  Trend: (p) => <Icon {...p} d="M4 17 10 11 14 15 20 8M14 8h6v6" />,
  Medal: (p) => <Icon {...p}><circle cx="12" cy="15" r="5"/><path d="M8 3h8l-2 6h-4zM12 13v4M10 15h4"/></Icon>,
  Zap: (p) => <Icon {...p} d="M13 3 4 14h7l-1 7 9-11h-7z" fill="currentColor" strokeWidth={0} />,
  Target: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" /></Icon>,
  Recycle: (p) => <Icon {...p}><path d="m7 19-3-3 3-3M4 16h8M17 5l3 3-3 3M20 8h-8M8 7l3-4 4 3M9 4 7 7 5 3"/></Icon>,
};

export const ItemArt = {
  armchair: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#E8F5DC"/>
      <rect x="50" y="70" width="100" height="55" rx="6" fill="#8AB368"/>
      <rect x="38" y="60" width="20" height="70" rx="6" fill="#6F9550"/>
      <rect x="142" y="60" width="20" height="70" rx="6" fill="#6F9550"/>
      <rect x="55" y="50" width="90" height="28" rx="8" fill="#A5CB82"/>
      <rect x="60" y="125" width="8" height="12" fill="#3B6B1E"/>
      <rect x="132" y="125" width="8" height="12" fill="#3B6B1E"/>
      <path d="M60 90h80M60 100h80" stroke="#5E8343" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  bookshelf: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#F0E8D4"/>
      <rect x="60" y="20" width="80" height="120" fill="#B8946A" stroke="#8B6B4A" strokeWidth="2"/>
      <line x1="60" y1="50" x2="140" y2="50" stroke="#8B6B4A" strokeWidth="2"/>
      <line x1="60" y1="80" x2="140" y2="80" stroke="#8B6B4A" strokeWidth="2"/>
      <line x1="60" y1="110" x2="140" y2="110" stroke="#8B6B4A" strokeWidth="2"/>
      <rect x="68" y="28" width="6" height="18" fill="#D94F4F"/>
      <rect x="76" y="25" width="6" height="21" fill="#3B6B1E"/>
      <rect x="84" y="28" width="6" height="18" fill="#E8A23B"/>
      <rect x="92" y="23" width="6" height="23" fill="#4A6BC9"/>
      <rect x="100" y="26" width="6" height="20" fill="#8B4A9C"/>
      <rect x="68" y="58" width="6" height="18" fill="#3B6B1E"/>
      <rect x="76" y="60" width="6" height="16" fill="#D94F4F"/>
      <rect x="84" y="55" width="6" height="21" fill="#4A6BC9"/>
      <rect x="92" y="58" width="6" height="18" fill="#E8A23B"/>
      <rect x="68" y="88" width="28" height="18" fill="#6F9550"/>
      <rect x="100" y="85" width="6" height="21" fill="#D94F4F"/>
      <rect x="108" y="90" width="6" height="16" fill="#4A6BC9"/>
    </svg>
  ),
  fridge: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#E8EEF5"/>
      <rect x="70" y="15" width="60" height="125" rx="4" fill="#F0F3ED" stroke="#7A857C" strokeWidth="2"/>
      <line x1="70" y1="65" x2="130" y2="65" stroke="#7A857C" strokeWidth="2"/>
      <rect x="75" y="30" width="4" height="20" fill="#7A857C"/>
      <rect x="75" y="75" width="4" height="50" fill="#7A857C"/>
      <circle cx="100" cy="45" r="2" fill="#22A957"/>
    </svg>
  ),
  dining: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#F0E8D4"/>
      <rect x="30" y="60" width="140" height="12" fill="#B8946A"/>
      <rect x="40" y="72" width="6" height="60" fill="#8B6B4A"/>
      <rect x="154" y="72" width="6" height="60" fill="#8B6B4A"/>
      <rect x="97" y="72" width="6" height="60" fill="#8B6B4A"/>
    </svg>
  ),
  drawers: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#F0E8D4"/>
      <rect x="55" y="25" width="90" height="115" fill="#B8946A" stroke="#8B6B4A" strokeWidth="2"/>
      <rect x="60" y="32" width="80" height="22" fill="#A8825A"/>
      <rect x="60" y="58" width="80" height="22" fill="#A8825A"/>
      <rect x="60" y="84" width="80" height="22" fill="#A8825A"/>
      <rect x="60" y="110" width="80" height="22" fill="#A8825A"/>
      <circle cx="100" cy="43" r="2" fill="#3B2A1A"/>
      <circle cx="100" cy="69" r="2" fill="#3B2A1A"/>
      <circle cx="100" cy="95" r="2" fill="#3B2A1A"/>
      <circle cx="100" cy="121" r="2" fill="#3B2A1A"/>
    </svg>
  ),
  chair: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#E8F5DC"/>
      <rect x="75" y="35" width="50" height="50" rx="4" fill="#2A332D"/>
      <rect x="70" y="80" width="60" height="12" rx="2" fill="#2A332D"/>
      <rect x="95" y="92" width="10" height="25" fill="#7A857C"/>
      <path d="M100 117L80 135M100 117L120 135M100 117L75 130M100 117L125 130M100 117L100 135" stroke="#2A332D" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="80" cy="135" r="3" fill="#2A332D"/>
      <circle cx="120" cy="135" r="3" fill="#2A332D"/>
      <circle cx="75" cy="130" r="3" fill="#2A332D"/>
      <circle cx="125" cy="130" r="3" fill="#2A332D"/>
      <circle cx="100" cy="135" r="3" fill="#2A332D"/>
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#E8EEF5"/>
      <ellipse cx="100" cy="60" rx="65" ry="8" fill="#B8E5A0" opacity="0.6"/>
      <rect x="35" y="55" width="130" height="6" fill="#7A857C"/>
      <rect x="45" y="61" width="4" height="65" fill="#2A332D"/>
      <rect x="151" y="61" width="4" height="65" fill="#2A332D"/>
    </svg>
  ),
  microwave: (
    <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="150" fill="#E8EEF5"/>
      <rect x="40" y="40" width="120" height="70" rx="4" fill="#2A332D"/>
      <rect x="48" y="48" width="80" height="54" rx="2" fill="#3A4A3D"/>
      <rect x="135" y="50" width="20" height="6" fill="#B8E5A0"/>
      <rect x="135" y="60" width="20" height="4" fill="#7A857C"/>
      <rect x="135" y="68" width="20" height="4" fill="#7A857C"/>
      <rect x="135" y="76" width="20" height="4" fill="#7A857C"/>
      <circle cx="145" cy="92" r="5" fill="#B8E5A0"/>
    </svg>
  ),
};

export const getItemArt = (photo) => ItemArt[photo] || ItemArt.armchair;

export const TCLogo = ({ size = 32 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", overflow: "hidden",
    flexShrink: 0, background: "#B8E5A0",
  }}>
    <img
      src={`${import.meta.env.BASE_URL}assets/logo_mark_official.jpg`}
      alt="TruCycle"
      style={{
        width: "160%", height: "160%",
        marginLeft: "-30%", marginTop: "-30%",
        display: "block",
      }}
    />
  </div>
);

export const TCWordmark = ({ size = 32, color = "var(--tc-ink)" }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32 }}>
    <TCLogo size={size} />
    <span style={{
      fontSize: size * 0.78, fontWeight: 800, letterSpacing: "-0.02em",
      color, lineHeight: 1, fontFamily: "inherit",
    }}>TruCycle</span>
  </div>
);

export const PageHead = ({ title, subtitle }) => (
  <div>
    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--tc-ink)" }}>{title}</h1>
    {subtitle && <p style={{ margin: "4px 0 20px", fontSize: 14, color: "var(--tc-text-3)" }}>{subtitle}</p>}
  </div>
);

export const Stat = ({ label, value }) => (
  <div style={{ background: "var(--tc-line-2)", borderRadius: 10, padding: "8px 10px" }}>
    <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--tc-ink)" }}>{value}</div>
  </div>
);
