import React, { useState } from 'react';
import { Icons, TCWordmark, getItemArt } from './shared';
import { IOSDevice } from '../frames/IOSFrame';
import { currentUser, spots, categories } from '../data/data';
import { MHeader, MBottomNav, MCTABtn, MMini, MField } from './MobileHelpers';
import { MSpotDetail, MClaimDirections, MClaimConfirm, MRescueSuccess, MMap, MNearby } from './MobileRescue';

const MobileFlow = ({ screen, setScreen, spotId, setSpotId }) => {
  const go = (k, id) => { setScreen(k); if (id !== undefined) setSpotId(id); };

  let Content, statusBarDark = false;
  switch (screen) {
    case "spot-capture": Content = <MSpotCapture go={go} />; statusBarDark = true; break;
    case "spot-location": Content = <MSpotLocation go={go} />; break;
    case "spot-review": Content = <MSpotReview go={go} />; break;
    case "spot-success": Content = <MSpotSuccess go={go} />; break;
    case "map": Content = <MMap go={go} />; break;
    case "nearby-m": Content = <MNearby go={go} />; break;
    case "spot-detail": Content = <MSpotDetail go={go} spotId={spotId} />; break;
    case "claim-directions": Content = <MClaimDirections go={go} spotId={spotId} />; break;
    case "claim-confirm": Content = <MClaimConfirm go={go} spotId={spotId} />; break;
    case "rescue-success": Content = <MRescueSuccess go={go} spotId={spotId} />; break;
    default: Content = <MHome go={go} />;
  }

  return (
    <IOSDevice dark={statusBarDark}>
      <div style={{ width: "100%", height: "100%", background: "white", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {Content}
      </div>
    </IOSDevice>
  );
};

const MHome = ({ go }) => {
  const live = spots.filter(s => s.status === "live");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <div style={{ padding: "56px 18px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <TCWordmark size={24}/>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--tc-mint)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{currentUser.initials}</div>
      </div>
      <div style={{ padding: "8px 18px 0" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Hey {currentUser.firstName},<br/>what will you<br/><span style={{ color: "#8AB368" }}>rescue today?</span>
        </div>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        <MCTABtn primary icon={<Icons.Camera size={20}/>} label="Spot something" sub="Post what you see on the street" onClick={() => go("spot-capture")}/>
        <MCTABtn icon={<Icons.Pin size={20}/>} label="Rescue something" sub={`${live.length} live nearby`} onClick={() => go("map")}/>
        <MCTABtn icon={<Icons.Plus size={20}/>} label="List an item" sub="Something from home"/>
      </div>
      <div style={{ margin: "0 18px 16px", padding: 14, background: "var(--tc-mint-wash)", borderRadius: 14, display: "flex", justifyContent: "space-between" }}>
        <MMini label="Points" value={currentUser.totalPoints}/>
        <MMini label="CO2e" value={`${currentUser.totalCo2eKg}kg`}/>
        <MMini label="Streak" value={`${currentUser.streakWeeks}w`}/>
        <MMini label="Rank E15" value={`#${currentUser.postcodeRank}`}/>
      </div>
      <div style={{ padding: "0 18px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <span>Live near you</span>
          <button onClick={() => go("nearby-m")} style={{ fontSize: 12, color: "var(--tc-mint-ink)", fontWeight: 600 }}>See all →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {live.slice(0, 3).map(s => (
            <button key={s.id} onClick={() => go("spot-detail", s.id)} style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 10, padding: 8, background: "white", border: "1px solid var(--tc-line)", borderRadius: 12, textAlign: "left" }}>
              <div style={{ width: 72, height: 60, borderRadius: 8, overflow: "hidden", background: "var(--tc-mint-bg)" }}>{getItemArt(s.photo)}</div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.category}</div>
                <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{s.distanceKm}km · {s.postedAgo}</div>
              </div>
              <div style={{ alignSelf: "center", fontSize: 11, fontWeight: 700, color: "var(--tc-mint-ink)" }}>{s.points}pts</div>
            </button>
          ))}
        </div>
      </div>
      <MBottomNav active="home" go={go}/>
    </div>
  );
};

const MSpotCapture = ({ go }) => {
  const [captured, setCaptured] = useState(false);
  return (
    <div style={{ flex: 1, background: "#0A0D0A", color: "white", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1a241a 0%, #0A0D0A 70%), radial-gradient(ellipse at 30% 40%, rgba(184,229,160,0.15), transparent 60%)", opacity: 0.9 }}/>
      {captured ? (
        <div style={{ position: "absolute", inset: 0, padding: 20, paddingTop: 60 }}>
          <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", background: "#B8E5A0" }}>
            {getItemArt("armchair")}
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: "80px 40px 180px", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 16, pointerEvents: "none" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position: "absolute",
              [i<2?"top":"bottom"]: -2, [i%2?"right":"left"]: -2,
              width: 24, height: 24,
              borderTop: i<2 ? "3px solid white" : "none",
              borderBottom: i>=2 ? "3px solid white" : "none",
              borderLeft: i%2===0 ? "3px solid white" : "none",
              borderRight: i%2===1 ? "3px solid white" : "none",
              borderRadius: i===0?"12px 0 0 0":i===1?"0 12px 0 0":i===2?"0 0 0 12px":"0 0 12px 0",
            }}/>
          ))}
        </div>
      )}

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", padding: "54px 18px 14px", zIndex: 2 }}>
        <button onClick={() => go("home")} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.4)", color: "white", display: "grid", placeItems: "center" }}>
          <Icons.Close size={18}/>
        </button>
        <button style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.4)", color: "white", display: "grid", placeItems: "center" }}>
          <Icons.Upload size={18}/>
        </button>
      </div>

      <div style={{ flex: 1 }}/>

      {!captured && (
        <div style={{ position: "relative", textAlign: "center", padding: "0 30px", zIndex: 2 }}>
          <div style={{ display: "inline-block", padding: "8px 14px", background: "rgba(0,0,0,0.5)", borderRadius: 999, fontSize: 12, marginBottom: 100 }}>
            <Icons.Pin size={12}/> E15 · GPS locked
          </div>
        </div>
      )}

      <div style={{ position: "relative", padding: "16px 24px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
        <div style={{ width: 44 }}/>
        {captured ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setCaptured(false)} style={{ padding: "12px 22px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 13, fontWeight: 600 }}>Retake</button>
            <button onClick={() => go("spot-location")} style={{ padding: "12px 22px", borderRadius: 999, background: "var(--tc-mint)", color: "var(--tc-ink)", fontSize: 13, fontWeight: 700 }}>Use photo →</button>
          </div>
        ) : (
          <button onClick={() => setCaptured(true)} style={{ width: 72, height: 72, borderRadius: "50%", background: "white", border: "4px solid rgba(255,255,255,0.4)", outline: "4px solid white", outlineOffset: "-12px" }}/>
        )}
        <div style={{ width: 44 }}/>
      </div>
    </div>
  );
};

const MSpotLocation = ({ go }) => {
  const [category, setCategory] = useState("armchair");
  const [flytipped, setFlytipped] = useState(false);
  const cat = categories.find(c => c.slug === category);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <MHeader title="Confirm details" onBack={() => go("spot-capture")}/>

      <div style={{ margin: "0 18px 14px", height: 140, borderRadius: 14, overflow: "hidden", position: "relative", background: "#F0F4EB" }}>
        <svg viewBox="0 0 300 140" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <rect width="300" height="140" fill="#F0F4EB"/>
          <path d="M 0 80 Q 100 70, 180 85 T 300 80" stroke="#D9DED3" strokeWidth="5" fill="none"/>
          <path d="M 140 0 Q 150 70, 130 140" stroke="#D9DED3" strokeWidth="5" fill="none"/>
          <ellipse cx="90" cy="40" rx="30" ry="18" fill="#D6E9C3" opacity="0.6"/>
        </svg>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50% 50% 50% 0", background: "var(--tc-mint-ink)", transform: "rotate(-45deg)", border: "3px solid white", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }}/>
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "white", padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          E15 1AA · Leyton High Rd
        </div>
        <div style={{ position: "absolute", top: 8, right: 8, background: "white", padding: "4px 8px", borderRadius: 6, fontSize: 10, color: "var(--tc-text-2)" }}>
          drag pin to adjust
        </div>
      </div>

      <div style={{ padding: "0 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <MField label="Item category">
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--tc-line)", fontSize: 14, background: "white" }}>
            {categories.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
          <div style={{ fontSize: 11, color: "var(--tc-text-3)", marginTop: 4 }}>{cat.group}</div>
        </MField>

        <MField label="Estimated weight">
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "1px solid var(--tc-line)", borderRadius: 10 }}>
            <input type="number" defaultValue={cat.weight} style={{ flex: 1, border: "none", outline: "none", fontSize: 14 }}/>
            <span style={{ fontSize: 12, color: "var(--tc-text-3)" }}>kg</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--tc-text-3)", marginTop: 4 }}>Auto-filled from category · tap to override</div>
        </MField>

        <button onClick={() => setFlytipped(!flytipped)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: flytipped ? "#FFECE8" : "var(--tc-line-2)", border: `1px solid ${flytipped ? "var(--tc-flytip)" : "var(--tc-line)"}`, borderRadius: 10 }}>
          <div style={{ width: 36, height: 20, borderRadius: 999, background: flytipped ? "var(--tc-flytip)" : "#CCD1C9", position: "relative", transition: "background .2s" }}>
            <div style={{ position: "absolute", top: 2, left: flytipped ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left .2s" }}/>
          </div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Fly-tipped item</div>
            <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>We'll share diversion data with the council</div>
          </div>
        </button>

        <MField label="Notes (optional)" hint="Max 280 chars">
          <textarea placeholder="Condition, size, any warnings…" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--tc-line)", fontSize: 13, fontFamily: "inherit", minHeight: 70, resize: "none" }}/>
        </MField>
      </div>

      <div style={{ padding: 18, marginTop: "auto" }}>
        <button onClick={() => go("spot-review")} className="tc-pill-btn block dark">Continue <Icons.ArrowRight size={14}/></button>
      </div>
    </div>
  );
};

const MSpotReview = ({ go }) => {
  const points = 86;
  const co2e = 86;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <MHeader title="Ready to post" onBack={() => go("spot-location")}/>
      <div style={{ padding: 18 }}>
        <div style={{ aspectRatio: "4/3", borderRadius: 14, overflow: "hidden", background: "var(--tc-mint-bg)" }}>
          {getItemArt("armchair")}
        </div>
        <div style={{ marginTop: 16 }}>
          <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 800 }}>Armchair</h3>
          <div style={{ fontSize: 13, color: "var(--tc-text-3)" }}>25 kg · E15 1AA · Leyton High Rd</div>
        </div>

        <div style={{ marginTop: 18, padding: 18, background: "linear-gradient(135deg, var(--tc-mint-wash) 0%, var(--tc-mint-bg) 100%)", borderRadius: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--tc-mint-ink)" }}>YOU'RE ABOUT TO SAVE</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: "var(--tc-ink)" }}>{co2e}</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--tc-text-2)" }}>kg CO2e</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--tc-text-2)", marginTop: 4 }}>from London landfill</div>

          <div style={{ height: 1, background: "rgba(59,107,30,0.15)", margin: "14px 0" }}/>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>Now</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--tc-mint-ink)" }}>+{Math.round(points*0.3)} pts</div>
              <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>spot posted (30%)</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>If rescued</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--tc-mint-ink)" }}>+{Math.round(points*0.7)} pts</div>
              <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>bonus (70%)</div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 11, color: "var(--tc-text-3)", textAlign: "center", margin: "16px 0 0" }}>
          By posting, you confirm this item was in a public space.
        </p>
      </div>

      <div style={{ padding: 18, marginTop: "auto" }}>
        <button onClick={() => go("spot-success")} className="tc-pill-btn block dark">Post spot <Icons.Check size={14}/></button>
      </div>
    </div>
  );
};

const MSpotSuccess = ({ go }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #E8F5DC 0%, #F4FAEE 100%)", position: "relative", overflow: "hidden", paddingTop: 47 }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {[...Array(24)].map((_, i) => {
        const x = (i * 37) % 100;
        const y = 15 + (i * 23) % 60;
        const colors = ["#B8E5A0", "#98D37A", "#E8A23B", "#4A6BC9", "#D94F4F"];
        const c = colors[i % colors.length];
        const r = (i * 47) % 360;
        return <rect key={i} x={`${x}%`} y={`${y}%`} width="8" height="3" fill={c} transform={`rotate(${r} ${x*3} ${y*5})`}/>;
      })}
    </svg>
    <div style={{ flex: 1 }}/>
    <div style={{ position: "relative", padding: "0 32px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--tc-mint)", margin: "0 auto 20px", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(152,211,122,0.5)" }}>
        <Icons.Check size={40} strokeWidth={3}/>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--tc-mint-ink)" }}>SPOT POSTED</div>
      <h2 style={{ margin: "6px 0 8px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        You just earned<br/><span style={{ color: "var(--tc-mint-ink)" }}>+26 points</span>
      </h2>
      <p style={{ fontSize: 13, color: "var(--tc-text-2)", maxWidth: 260, margin: "0 auto" }}>
        Armchair is now live in E15. Another 60 points are waiting once someone rescues it.
      </p>
    </div>
    <div style={{ flex: 1 }}/>
    <div style={{ position: "relative", padding: "0 18px 30px", display: "flex", flexDirection: "column", gap: 10 }}>
      <button className="tc-pill-btn block dark"><Icons.Share size={14}/> Share this rescue</button>
      <button onClick={() => go("spot-capture")} className="tc-pill-btn block ghost" style={{ background: "white" }}>Spot another</button>
      <button onClick={() => go("map")} style={{ fontSize: 13, fontWeight: 600, color: "var(--tc-mint-ink)", padding: 10 }}>View on the map →</button>
    </div>
  </div>
);

export { MobileFlow, MHome };
