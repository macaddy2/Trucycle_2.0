import React from 'react';
import { Icons, getItemArt, PageHead } from './shared';
import { currentUser, spots } from '../data/data';

const DashboardView = ({ openMobile, openSpotDetail }) => {
  const liveSpots = spots.filter(s => s.status === "live");
  const recentRescued = spots.filter(s => s.status === "rescued");
  const tickerItems = [...recentRescued, ...spots.slice(0, 6)].slice(0, 8);

  const tiles = [
    { label: "Items Collected", value: currentUser.rescuesCompleted, icon: <Icons.Recycle/>, accent: "mint" },
    { label: "Exchanged",       value: currentUser.spotsPosted, icon: <Icons.Share/>, accent: "mint" },
    { label: "CO2 Saved",       value: `${currentUser.totalCo2eKg}kg`, icon: <Icons.Leaf/>, accent: "mint" },
    { label: "Rewards Earned",  value: `PTS ${currentUser.totalPoints.toLocaleString()}`, icon: <Icons.Medal/>, accent: "mint" },
  ];

  return (
    <div>
      <PageHead title="Welcome back!" subtitle="Track your impact and manage your listings" />

      <div style={{
        marginTop: 8,
        background: "linear-gradient(135deg, #F4FAEE 0%, #E8F5DC 100%)",
        borderRadius: 20, padding: "28px 28px 24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            color: "#3B6B1E", background: "white",
            padding: "4px 8px", borderRadius: 4,
          }}>NEW IN 2.0</span>
          <span style={{ fontSize: 13, color: "var(--tc-text-2)" }}>Street Spot &amp; Rescue is live in your area</span>
        </div>
        <h2 style={{ margin: "4px 0 4px", fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--tc-ink)" }}>
          Spot. Rescue. <span style={{ color: "#8AB368" }}>Rehome.</span>
        </h2>
        <p style={{ margin: "0 0 20px", fontSize: 15, color: "var(--tc-text-2)", maxWidth: 580 }}>
          See something reusable on your walk home? Snap it, post it, and a neighbour will rescue it. No vans. No fees. No landfill.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <CTACard icon={<Icons.Camera size={22}/>} label="Spot something" sub="Post what you see on the street" primary onClick={() => openMobile && openMobile("spot-capture")}/>
          <CTACard icon={<Icons.Pin size={22}/>} label="Rescue something" sub={`${liveSpots.length} live spots nearby`} onClick={() => openMobile && openMobile("map")}/>
          <CTACard icon={<Icons.Plus size={22}/>} label="List something" sub="Item from your own home" />
        </div>

        <div style={{
          marginTop: 20, padding: "10px 14px", background: "white",
          borderRadius: 12, border: "1px solid var(--tc-line-2)",
          display: "flex", alignItems: "center", gap: 12,
          overflow: "hidden", position: "relative",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            color: "var(--tc-live)", flexShrink: 0,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tc-live)", animation: "tcPulse 2s infinite" }}/>
            LIVE
          </span>
          <div style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", maskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)" }}>
            <div style={{ display: "inline-flex", gap: 28, animation: "tcTickerScroll 40s linear infinite" }}>
              {[...tickerItems, ...tickerItems].map((s, i) => (
                <span key={i} style={{ fontSize: 13, color: "var(--tc-text-2)" }}>
                  <b style={{ color: "var(--tc-text)" }}>Just rescued:</b> {s.category.toLowerCase()} in {s.postcode.split(" ")[0]} — {Math.round(s.co2e)} kg saved
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 18 }}>
        {tiles.map((t, i) => (
          <div key={i} className="tc-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div className="tc-stat-disc">{t.icon}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "var(--tc-ink)", lineHeight: 1.1 }}>{t.value}</span>
              <span style={{ fontSize: 12, color: "var(--tc-text-3)" }}>{t.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 22, background: "white", borderRadius: 16, border: "1px solid var(--tc-line)" }}>
        <div style={{ padding: "18px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Live spots near you</h3>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--tc-text-3)" }}>Within 5km of E15 · updated just now</p>
          </div>
          <button className="tc-pill-btn ghost" onClick={() => openMobile && openMobile("map")}>View on map <Icons.ArrowRight size={14}/></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, padding: "4px 20px 20px" }}>
          {liveSpots.slice(0, 4).map(s => (
            <SpotMiniCard key={s.id} spot={s} onClick={() => openSpotDetail && openSpotDetail(s.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CTACard = ({ icon, label, sub, primary, onClick }) => (
  <button onClick={onClick} style={{
    background: primary ? "var(--tc-mint)" : "white",
    border: `1px solid ${primary ? "var(--tc-mint-deep)" : "var(--tc-line)"}`,
    borderRadius: 14, padding: "16px 18px",
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
    textAlign: "left", transition: "transform .15s, box-shadow .15s",
  }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
     onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
    <div style={{
      width: 38, height: 38, borderRadius: 10,
      background: primary ? "rgba(10,13,10,0.1)" : "var(--tc-mint-bg)",
      color: primary ? "var(--tc-ink)" : "var(--tc-mint-ink)",
      display: "grid", placeItems: "center",
    }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--tc-ink)" }}>{label}</div>
    <div style={{ fontSize: 12, color: primary ? "rgba(10,13,10,0.7)" : "var(--tc-text-3)" }}>{sub}</div>
  </button>
);

const SpotMiniCard = ({ spot, onClick }) => (
  <button onClick={onClick} style={{ display: "flex", flexDirection: "column", textAlign: "left", background: "white", border: "1px solid var(--tc-line)", borderRadius: 12, overflow: "hidden", transition: "border-color .15s" }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--tc-mint-deep)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--tc-line)"}>
    <div style={{ aspectRatio: "4/3", background: "var(--tc-mint-bg)", position: "relative" }}>
      {getItemArt(spot.photo)}
      {spot.isFlytipped && <span className="tc-chip flytip" style={{ position: "absolute", top: 8, left: 8 }}>Fly-tipped</span>}
      <span className={`tc-chip ${spot.status}`} style={{ position: "absolute", top: 8, right: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}/>
        {spot.status}
      </span>
    </div>
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tc-ink)" }}>{spot.category}</div>
      <div style={{ fontSize: 12, color: "var(--tc-text-3)", marginTop: 2 }}>{spot.postcode} · {spot.distanceKm} km · {spot.postedAgo}</div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--tc-mint-ink)", fontWeight: 600 }}>{Math.round(spot.co2e)} kg CO2e</span>
        <span style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{spot.points} pts</span>
      </div>
    </div>
  </button>
);

export { DashboardView, SpotMiniCard, CTACard };
