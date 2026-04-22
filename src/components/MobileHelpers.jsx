import React from 'react';
import { Icons } from './shared';

export const MHeader = ({ title, onBack, right }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "56px 18px 14px" }}>
    {onBack && (
      <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--tc-line-2)", display: "grid", placeItems: "center" }}>
        <Icons.ArrowLeft size={16}/>
      </button>
    )}
    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, flex: 1 }}>{title}</h2>
    {right}
  </div>
);

export const MBottomNav = ({ active, go }) => {
  const items = [
    { k: "home", l: "Home", i: Icons.Home },
    { k: "map", l: "Map", i: Icons.Map },
    { k: "spot-capture", l: "Spot", i: Icons.Camera, cta: true },
    { k: "nearby-m", l: "Nearby", i: Icons.Compass },
    { k: "impact-m", l: "Impact", i: Icons.Leaf },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--tc-line)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", padding: "6px 8px 10px", background: "white" }}>
      {items.map(it => {
        const Ic = it.i;
        const isActive = active === it.k;
        if (it.cta) return (
          <button key={it.k} onClick={() => go(it.k)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--tc-mint)", display: "grid", placeItems: "center", marginTop: -14, boxShadow: "0 4px 12px rgba(152,211,122,0.5)" }}>
              <Ic size={22}/>
            </div>
            <span style={{ fontSize: 10, color: "var(--tc-text-2)", fontWeight: 600 }}>{it.l}</span>
          </button>
        );
        return (
          <button key={it.k} onClick={() => go(it.k)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", color: isActive ? "var(--tc-ink)" : "var(--tc-text-3)" }}>
            <Ic size={20}/>
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{it.l}</span>
          </button>
        );
      })}
    </div>
  );
};

export const MCTABtn = ({ primary, icon, label, sub, onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 14, padding: 14,
    background: primary ? "var(--tc-mint)" : "white",
    border: `1px solid ${primary ? "var(--tc-mint-deep)" : "var(--tc-line)"}`,
    borderRadius: 14, textAlign: "left", width: "100%",
  }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: primary ? "rgba(10,13,10,0.1)" : "var(--tc-mint-bg)", color: primary ? "var(--tc-ink)" : "var(--tc-mint-ink)", display: "grid", placeItems: "center" }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 12, color: primary ? "rgba(10,13,10,0.7)" : "var(--tc-text-3)" }}>{sub}</div>
    </div>
    <Icons.ArrowRight size={16}/>
  </button>
);

export const MMini = ({ label, value }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--tc-ink)" }}>{value}</div>
    <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>{label}</div>
  </div>
);

export const MField = ({ label, hint, children }) => (
  <div>
    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--tc-text-2)", display: "block", marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);
