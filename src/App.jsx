import React, { useState, useEffect } from 'react';
import { Icons, PageHead } from './components/shared';
import { AppShell } from './components/AppShell';
import { DashboardView } from './components/Dashboard';
import { ImpactView } from './components/Impact';
import { MapView, NearbyView, LeaderboardView } from './components/MapNearbyLeaderboard';
import { MobileFlow } from './components/MobileSpot';

const MOBILE_QUERY = '(max-width: 767px)';

const routeToMobileScreen = (route) => {
  switch (route) {
    case "spot": return "spot-capture";
    case "dashboard": return "home";
    case "nearby": return "nearby-m";
    case "map": return "map";
    default: return route;
  }
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isMobile;
};

function App() {
  const isMobile = useIsMobile();
  const [route, setRoute] = useState(() => localStorage.getItem("tc2_route") || "dashboard");
  const [mobileScreen, setMobileScreen] = useState(() => localStorage.getItem("tc2_mscreen") || "home");
  const [spotId, setSpotId] = useState(() => localStorage.getItem("tc2_spotid") || "sp_001");

  useEffect(() => { localStorage.setItem("tc2_route", route); }, [route]);
  useEffect(() => { localStorage.setItem("tc2_mscreen", mobileScreen); }, [mobileScreen]);
  useEffect(() => { localStorage.setItem("tc2_spotid", spotId); }, [spotId]);

  const setRouteSynced = (next) => {
    setRoute(next);
    setMobileScreen(routeToMobileScreen(next));
  };

  const openMobile = (screen, id) => {
    setMobileScreen(screen);
    if (id !== undefined) setSpotId(id);
  };
  const openSpotDetail = (id) => { openMobile("spot-detail", id); };

  if (isMobile) {
    return (
      <MobileFlow
        screen={mobileScreen}
        setScreen={setMobileScreen}
        spotId={spotId}
        setSpotId={setSpotId}
      />
    );
  }

  let desktopContent;
  switch (route) {
    case "map": desktopContent = <MapView openSpotDetail={openSpotDetail} />; break;
    case "nearby": desktopContent = <NearbyView openSpotDetail={openSpotDetail} />; break;
    case "impact": desktopContent = <ImpactView />; break;
    case "leaderboard": desktopContent = <LeaderboardView />; break;
    case "spot":
      desktopContent = (
        <div>
          <PageHead title="Spot something" subtitle="Street Spot is optimised for your phone — open TruCycle on mobile to post what you see" />
          <div style={{ background: "var(--tc-mint-wash)", borderRadius: 16, padding: 40, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <Icons.Camera size={40} />
            <h3 style={{ margin: "10px 0 6px" }}>Open TruCycle on your phone</h3>
            <p style={{ fontSize: 14, color: "var(--tc-text-2)" }}>Use your camera to capture items on the street and post them in a few taps.</p>
          </div>
        </div>
      );
      break;
    default: desktopContent = <DashboardView openMobile={openMobile} openSpotDetail={openSpotDetail} />;
  }

  return (
    <AppShell route={route} setRoute={setRouteSynced} setMobileScreen={setMobileScreen}>
      {desktopContent}
    </AppShell>
  );
}

export default App;
