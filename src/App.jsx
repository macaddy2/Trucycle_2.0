import React, { useState, useEffect } from 'react';
import { Icons, PageHead } from './components/shared';
import { AppShell } from './components/AppShell';
import { DashboardView } from './components/Dashboard';
import { ImpactView } from './components/Impact';
import { MapView, NearbyView, LeaderboardView } from './components/MapNearbyLeaderboard';
import { MobileFlow } from './components/MobileSpot';

function App() {
  const [route, setRoute] = useState(() => localStorage.getItem("tc2_route") || "dashboard");
  const [view, setView] = useState(() => localStorage.getItem("tc2_view") || "desktop");
  const [mobileScreen, setMobileScreen] = useState(() => localStorage.getItem("tc2_mscreen") || "home");
  const [spotId, setSpotId] = useState(() => localStorage.getItem("tc2_spotid") || "sp_001");

  useEffect(() => { localStorage.setItem("tc2_route", route); }, [route]);
  useEffect(() => { localStorage.setItem("tc2_view", view); }, [view]);
  useEffect(() => { localStorage.setItem("tc2_mscreen", mobileScreen); }, [mobileScreen]);
  useEffect(() => { localStorage.setItem("tc2_spotid", spotId); }, [spotId]);

  const openMobile = (screen, id) => {
    setMobileScreen(screen);
    if (id !== undefined) setSpotId(id);
  };
  const openSpotDetail = (id) => { openMobile("spot-detail", id); };

  let desktopContent;
  switch(route) {
    case "map": desktopContent = <MapView openSpotDetail={openSpotDetail} />; break;
    case "nearby": desktopContent = <NearbyView openSpotDetail={openSpotDetail} />; break;
    case "impact": desktopContent = <ImpactView />; break;
    case "leaderboard": desktopContent = <LeaderboardView />; break;
    case "spot":
      desktopContent = (
        <div>
          <PageHead title="Spot something" subtitle="Street Spot works best on your phone — use your camera to post what you see" />
          <div style={{ background: "var(--tc-mint-wash)", borderRadius: 16, padding: 40, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <Icons.Camera size={40} />
            <h3 style={{ margin: "10px 0 6px" }}>Open TruCycle on your phone</h3>
            <p style={{ fontSize: 14, color: "var(--tc-text-2)" }}>The mobile preview on the right shows the full 3-step Spot flow. Tap "Spot something" on that screen.</p>
            <button className="tc-pill-btn dark" onClick={() => openMobile("spot-capture")}>Start Spot flow in mobile preview →</button>
          </div>
        </div>
      );
      break;
    default: desktopContent = <DashboardView openMobile={openMobile} openSpotDetail={openSpotDetail} />;
  }

  const screenPresets = [
    { k: "home", l: "Home" },
    { k: "spot-capture", l: "Spot 1" },
    { k: "spot-location", l: "Spot 2" },
    { k: "spot-review", l: "Spot 3" },
    { k: "spot-success", l: "Posted" },
    { k: "map", l: "Map" },
    { k: "nearby-m", l: "Nearby" },
    { k: "spot-detail", l: "Detail" },
    { k: "claim-directions", l: "Route" },
    { k: "rescue-success", l: "Done" },
  ];

  return (
    <div className="proto-shell">
      <div className="proto-head">
        <div>
          <h1>TruCycle 2.0 · Street Spot &amp; Rescue</h1>
          <p>Phase 1 prototype · integrates with existing trucycle.co.uk shell · mobile flows in iOS frame</p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="proto-view-toggle">
            <button className={view === "split" ? "active" : ""} onClick={() => setView("split")}>Side-by-side</button>
            <button className={view === "desktop" ? "active" : ""} onClick={() => setView("desktop")}>Desktop only</button>
            <button className={view === "mobile" ? "active" : ""} onClick={() => setView("mobile")}>Mobile only</button>
          </div>
          <button className="tc-pill-btn ghost" style={{ background: "white" }} onClick={() => {
            localStorage.removeItem("tc2_route");
            localStorage.removeItem("tc2_mscreen");
            localStorage.removeItem("tc2_spotid");
            location.reload();
          }}>Reset</button>
        </div>
      </div>

      <div className={`proto-layout view-${view}`}>
        <div className="proto-desktop" data-screen-label="Desktop — trucycle.co.uk shell">
          <div className="proto-desktop-chrome">
            <div className="dot" style={{ background: "#FF5F57" }}/>
            <div className="dot" style={{ background: "#FEBC2E" }}/>
            <div className="dot" style={{ background: "#28C840" }}/>
            <div className="proto-url">trucycle.co.uk/{route === "dashboard" ? "dashboard" : route}</div>
          </div>
          <div style={{ height: "calc(100vh - 140px)", overflow: "auto" }}>
            <AppShell route={route} setRoute={setRoute} setMobileScreen={setMobileScreen}>
              {desktopContent}
            </AppShell>
          </div>
        </div>

        <div className="proto-mobile">
          <div className="proto-mobile-label">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tc-live)", display: "inline-block" }}/>
            MOBILE · iPhone 15
          </div>
          <MobileFlow screen={mobileScreen} setScreen={setMobileScreen} spotId={spotId} setSpotId={setSpotId}/>
          <div className="proto-screen-picker">
            {screenPresets.map(p => (
              <button key={p.k} className={mobileScreen === p.k ? "active" : ""} onClick={() => setMobileScreen(p.k)}>{p.l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
