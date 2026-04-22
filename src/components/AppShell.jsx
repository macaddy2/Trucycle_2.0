import React from 'react';
import { Icons, TCWordmark } from './shared';
import { currentUser } from '../data/data';

const AppShell = ({ route, setRoute, setMobileScreen, children, hideSidebarBadge }) => {
  const navGroups = [
    {
      items: [
        { key: "dashboard", label: "Dashboard", icon: Icons.Home },
        { key: "spot",      label: "Spot",              icon: Icons.Camera, isNew: true },
        { key: "map",       label: "Map",               icon: Icons.Map, isNew: true },
        { key: "nearby",    label: "Nearby",            icon: Icons.Compass, isNew: true },
        { key: "impact",    label: "My Impact",         icon: Icons.Leaf, isNew: true },
        { key: "leaderboard", label: "Leaderboard",     icon: Icons.Trophy, isNew: true },
      ],
    },
    {
      items: [
        { key: "browse",    label: "Browse Items",      icon: Icons.Inbox },
        { key: "selected",  label: "My Selected Items", icon: Icons.People },
        { key: "messages",  label: "Messages",          icon: Icons.Inbox },
      ],
    },
    {
      items: [
        { key: "notifications", label: "Notifications", icon: Icons.Bell },
        { key: "settings",      label: "Settings",      icon: Icons.Settings },
        { key: "support",       label: "Support & FAQs", icon: Icons.Help },
      ],
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "248px 1fr", minHeight: "100%", background: "#F7F8F5" }}>
      <aside style={{
        background: "var(--tc-sidebar)", color: "white",
        borderRadius: "0 18px 18px 0",
        padding: "22px 14px 18px",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "0 6px 22px" }}>
          <TCWordmark size={30} color="white" />
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
          {navGroups.map((grp, gi) => (
            <div key={gi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {grp.items.map(item => {
                const active = route === item.key;
                const IconComp = item.icon;
                return (
                  <button key={item.key} onClick={() => { setRoute(item.key); setMobileScreen && setMobileScreen(item.key === "spot" ? "spot-capture" : null); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 12px", borderRadius: 10,
                      color: active ? "white" : "#B8BEB9",
                      background: active ? "var(--tc-sidebar-active)" : "transparent",
                      fontSize: 14, fontWeight: active ? 600 : 500,
                      textAlign: "left", width: "100%",
                      transition: "background .15s, color .15s",
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--tc-sidebar-hover)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <IconComp size={18} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.isNew && !hideSidebarBadge && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                        color: "#3B6B1E", background: "var(--tc-mint)",
                        padding: "2px 6px", borderRadius: 4,
                      }}>2.0</span>
                    )}
                  </button>
                );
              })}
              {gi < navGroups.length - 1 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "10px 6px 4px" }}/>
              )}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 12, padding: 4, background: "#1E2521", borderRadius: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {["Spotter", "Collector", "Donor"].map((r, i) => (
            <button key={r} style={{
              padding: "8px 4px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: i === 0 ? "var(--tc-mint)" : "transparent",
              color: i === 0 ? "#0A0D0A" : "#B8BEB9",
            }}>{r}</button>
          ))}
        </div>
      </aside>

      <main style={{ background: "white", minHeight: "100vh" }}>
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          gap: 14, padding: "18px 32px", borderBottom: "1px solid var(--tc-line-2)",
        }}>
          <button style={{ width: 40, height: 40, borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--tc-text-2)" }}>
            <Icons.Bell size={20}/>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--tc-mint)", color: "#0A0D0A",
              display: "grid", placeItems: "center",
              fontWeight: 700, fontSize: 13,
            }}>{currentUser.initials}</div>
            <Icons.ArrowRight size={14} />
          </div>
        </header>

        <div style={{ padding: "24px 32px 64px" }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export { AppShell };
