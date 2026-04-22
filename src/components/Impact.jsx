import React from 'react';
import { Icons, PageHead } from './shared';
import { currentUser, ledger } from '../data/data';

const ImpactView = () => {
  const tiers = [
    { name: "Bronze",   threshold: 100 },
    { name: "Silver",   threshold: 500 },
    { name: "Gold",     threshold: 2000 },
    { name: "Platinum", threshold: 10000 },
  ];
  const currentTierIdx = tiers.findIndex(t => currentUser.totalPoints < t.threshold);
  const currentTier = tiers[Math.max(0, currentTierIdx - 1)] || tiers[tiers.length - 1];
  const nextTier = tiers[currentTierIdx] || null;
  const progress = nextTier ? ((currentUser.totalPoints - (currentTier?.threshold || 0)) / (nextTier.threshold - (currentTier?.threshold || 0))) * 100 : 100;

  return (
    <div>
      <PageHead title="My Impact" subtitle="Your personal rescue record and carbon ledger" />

      <div style={{
        background: "linear-gradient(135deg, #121816 0%, #2A332D 100%)",
        borderRadius: 20, padding: "28px 32px", color: "white", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,229,160,0.2) 0%, transparent 70%)" }}/>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 24, position: "relative" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--tc-mint)", letterSpacing: "0.1em", marginBottom: 8 }}>YOUR LIFETIME IMPACT</div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {currentUser.totalCo2eKg} <span style={{ fontSize: 24, fontWeight: 600, opacity: 0.7 }}>kg CO2e</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              Enough to offset a return flight from London to Rome 🛫
            </div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginBottom: 8 }}>POINTS</div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>{currentUser.totalPoints.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
              {nextTier ? `${nextTier.threshold - currentUser.totalPoints} to ${nextTier.name}` : "Max tier reached"}
            </div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginBottom: 8 }}>STREAK</div>
            <div style={{ fontSize: 36, fontWeight: 800, display: "flex", alignItems: "baseline", gap: 6 }}>
              {currentUser.streakWeeks}<span style={{ fontSize: 18, opacity: 0.7, fontWeight: 600 }}>weeks</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>+5% on every rescue</div>
          </div>
        </div>

        {nextTier && (
          <div style={{ marginTop: 22, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>
              <span>{currentTier?.name || "Start"}</span>
              <span>{nextTier.name}</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--tc-mint)", borderRadius: 4, transition: "width .5s" }}/>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 18 }}>
        <StatTile label="Spots posted" value={currentUser.spotsPosted} icon={<Icons.Camera/>} />
        <StatTile label="Rescues completed" value={currentUser.rescuesCompleted} icon={<Icons.Recycle/>} />
        <StatTile label="Rank in E15" value={`#${currentUser.postcodeRank}`} icon={<Icons.Trophy/>} />
        <StatTile label="Tier" value={currentTier?.name || "Bronze"} icon={<Icons.Medal/>} />
      </div>

      <div className="tc-card" style={{ marginTop: 18, padding: 0 }}>
        <div style={{ padding: "18px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Carbon ledger</h3>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--tc-text-3)" }}>Every point transaction, immutable and auditable</p>
          </div>
          <button className="tc-pill-btn ghost">Export CSV</button>
        </div>
        {ledger.map(l => (
          <div key={l.id} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto auto",
            alignItems: "center", gap: 14,
            padding: "14px 20px",
            borderTop: "1px solid var(--tc-line-2)",
          }}>
            <LedgerIcon type={l.type} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tc-ink)" }}>{l.label}</div>
              <div style={{ fontSize: 12, color: "var(--tc-text-3)", marginTop: 2 }}>
                {l.at} · {l.postcode} · <span className="tc-chip neutral" style={{ fontSize: 10, padding: "2px 6px" }}>{l.multiplier}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>CO2e</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--tc-text-2)" }}>{l.co2e > 0 ? `${l.co2e} kg` : "—"}</div>
            </div>
            <div style={{ textAlign: "right", minWidth: 60 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: l.points > 0 ? "var(--tc-live)" : "var(--tc-text-3)" }}>
                {l.points > 0 ? `+${l.points}` : l.points}
              </div>
              <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatTile = ({ label, value, icon }) => (
  <div className="tc-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
    <div className="tc-stat-disc">{icon}</div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--tc-ink)", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>{label}</div>
    </div>
  </div>
);

const LedgerIcon = ({ type }) => {
  const map = {
    rescue_confirmed: { bg: "#E6F7EC", fg: "var(--tc-live)", icon: <Icons.Check size={16}/> },
    spot_rescued_bonus: { bg: "var(--tc-mint-bg)", fg: "var(--tc-mint-ink)", icon: <Icons.Sparkle size={16}/> },
    spot_posted: { bg: "var(--tc-mint-bg)", fg: "var(--tc-mint-ink)", icon: <Icons.Camera size={16}/> },
    streak_bonus: { bg: "#FFF4E0", fg: "var(--tc-claimed)", icon: <Icons.Zap size={16}/> },
    first_time_bonus: { bg: "#FFF4E0", fg: "var(--tc-claimed)", icon: <Icons.Medal size={16}/> },
  };
  const m = map[type] || map.spot_posted;
  return (
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: m.bg, color: m.fg, display: "grid", placeItems: "center" }}>
      {m.icon}
    </div>
  );
};

export { ImpactView, StatTile };
