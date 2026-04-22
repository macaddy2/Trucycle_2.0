import React, { useState, useEffect } from 'react';
import { Icons, getItemArt, Stat } from './shared';
import { MHeader, MBottomNav } from './MobileHelpers';
import { spots } from '../data/data';

const MSpotDetail = ({ go, spotId }) => {
  const s = spots.find(x => x.id === spotId) || spots[0];
  const [showSafety, setShowSafety] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", position: "relative" }}>
      <div style={{ aspectRatio: "1/1", background: "var(--tc-mint-bg)", position: "relative" }}>
        {getItemArt(s.photo)}
        <button onClick={() => go("map")} style={{ position: "absolute", top: 54, left: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center", backdropFilter: "blur(8px)" }}>
          <Icons.ArrowLeft size={16}/>
        </button>
        <div style={{ position: "absolute", top: 54, right: 12, display: "flex", gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><Icons.Share size={16}/></button>
          <button style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><Icons.Flag size={16}/></button>
        </div>
        {s.isFlytipped && <span className="tc-chip flytip" style={{ position: "absolute", bottom: 12, left: 12 }}>Fly-tipped</span>}
      </div>

      <div style={{ padding: 18, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>{s.category}</h1>
            <div style={{ fontSize: 13, color: "var(--tc-text-3)", marginTop: 2 }}>{s.streetHint}</div>
            <div style={{ fontSize: 13, color: "var(--tc-text-3)" }}>{s.postcode}</div>
          </div>
          <span className={`tc-chip ${s.status}`} style={{ flexShrink: 0 }}>{s.status}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
          <Stat label="Distance" value={`${s.distanceKm} km`}/>
          <Stat label="Weight" value={`${s.weight} kg`}/>
          <Stat label="You earn" value={`${Math.round(s.points*0.4)} pts`}/>
        </div>

        <div style={{ marginTop: 14, padding: 12, background: "var(--tc-mint-wash)", borderRadius: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--tc-mint-ink)", letterSpacing: "0.08em" }}>CARBON SAVED</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--tc-ink)" }}>{Math.round(s.co2e)} kg CO2e</div>
          <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>Computed from TruCycle Carbon Methodology v1.0</div>
        </div>

        {s.notes && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--tc-text-2)", marginBottom: 4 }}>Spotter's notes</div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--tc-text)" }}>"{s.notes}"</p>
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--tc-mint-bg)", color: "var(--tc-mint-ink)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{s.spotter.initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Spotted by {s.spotter.firstName}</div>
            <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{s.postedAgo}</div>
          </div>
        </div>

        <div style={{ marginTop: 14, height: 120, borderRadius: 12, overflow: "hidden", background: "#F0F4EB", position: "relative" }}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <rect width="300" height="120" fill="#F0F4EB"/>
            <path d="M 0 60 Q 100 50, 300 70" stroke="#D9DED3" strokeWidth="5" fill="none"/>
          </svg>
          <div style={{ position: "absolute", left: "60%", top: "40%", transform: "translate(-50%, -100%)" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50% 50% 50% 0", background: s.status === "live" ? "var(--tc-live)" : "var(--tc-claimed)", transform: "rotate(-45deg)", border: "3px solid white" }}/>
          </div>
        </div>
      </div>

      {showSafety && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 10, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "white", borderRadius: "20px 20px 0 0", padding: "22px 20px 28px", width: "100%" }}>
            <div style={{ width: 40, height: 4, background: "var(--tc-line)", borderRadius: 2, margin: "0 auto 16px" }}/>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800 }}>Rescue safely</h3>
            <ul style={{ margin: "0 0 16px", padding: "0 0 0 18px", fontSize: 13, color: "var(--tc-text-2)", lineHeight: 1.6 }}>
              <li>Use gloves for hygiene</li>
              <li>Don't enter private property</li>
              <li>Avoid photographing people</li>
              <li>Report anything dangerous</li>
            </ul>
            <button onClick={() => { setShowSafety(false); go("claim-directions", s.id); }} className="tc-pill-btn block dark">I understand — claim spot</button>
          </div>
        </div>
      )}

      <div style={{ padding: 18, borderTop: "1px solid var(--tc-line)", display: "flex", gap: 10, background: "white" }}>
        <button className="tc-pill-btn ghost" style={{ padding: "14px" }}><Icons.Pin size={16}/></button>
        <button onClick={() => setShowSafety(true)} className="tc-pill-btn block dark" disabled={s.status !== "live"}>
          {s.status === "live" ? <><span>Rescue this</span> <Icons.ArrowRight size={14}/></> : s.status === "claimed" ? "Already claimed" : "Already rescued"}
        </button>
      </div>
    </div>
  );
};

const MClaimDirections = ({ go, spotId }) => {
  const s = spots.find(x => x.id === spotId) || spots[0];
  const [remain, setRemain] = useState(7200);
  useEffect(() => {
    const id = setInterval(() => setRemain(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remain / 3600);
  const m = Math.floor((remain % 3600) / 60);
  const sec = remain % 60;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "var(--tc-ink)", color: "white", padding: "54px 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icons.Timer size={18}/>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Claim expires in</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
              {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")}
            </div>
          </div>
        </div>
        <button onClick={() => go("spot-detail", spotId)} style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", padding: 6 }}>Cancel</button>
      </div>

      <div style={{ flex: 1, position: "relative", background: "#F0F4EB" }}>
        <svg viewBox="0 0 360 500" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <rect width="360" height="500" fill="#F0F4EB"/>
          <path d="M 0 180 Q 150 150, 360 200" stroke="#D9DED3" strokeWidth="6" fill="none"/>
          <path d="M 120 0 Q 140 200, 100 500" stroke="#D9DED3" strokeWidth="6" fill="none"/>
          <path d="M 0 340 Q 200 320, 360 360" stroke="#D9DED3" strokeWidth="6" fill="none"/>
          <path d="M 180 420 Q 160 340, 200 250 T 240 120" stroke="#4A6BC9" strokeWidth="4" fill="none" strokeDasharray="8 6" strokeLinecap="round"/>
          <ellipse cx="80" cy="100" rx="30" ry="18" fill="#D6E9C3" opacity="0.6"/>
        </svg>
        <div style={{ position: "absolute", left: "50%", bottom: 80, transform: "translate(-50%, 50%)", width: 18, height: 18, borderRadius: "50%", background: "#4A6BC9", border: "3px solid white", boxShadow: "0 0 0 12px rgba(74,107,201,0.2)" }}/>
        <div style={{ position: "absolute", left: "67%", top: 120, transform: "translate(-50%, -100%)" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50% 50% 50% 0", background: "var(--tc-claimed)", transform: "rotate(-45deg)", border: "3px solid white", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }}/>
        </div>
        <div style={{ position: "absolute", top: 14, left: 18, right: 18, background: "white", padding: 12, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>Walking · 8 min · 650 m</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{s.streetHint}</div>
          <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>{s.postcode}</div>
        </div>
      </div>

      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10, background: "white", borderTop: "1px solid var(--tc-line)" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="tc-pill-btn ghost" style={{ flex: 1, justifyContent: "center" }}>Google Maps</button>
          <button className="tc-pill-btn ghost" style={{ flex: 1, justifyContent: "center" }}>Apple Maps</button>
          <button className="tc-pill-btn ghost" style={{ flex: 1, justifyContent: "center" }}>Citymapper</button>
        </div>
        <button onClick={() => go("claim-confirm", spotId)} className="tc-pill-btn block dark">
          <Icons.Check size={14}/> I've arrived — confirm pickup
        </button>
      </div>
    </div>
  );
};

const MClaimConfirm = ({ go, spotId }) => {
  const [captured, setCaptured] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <MHeader title="Confirm rescue" onBack={() => go("claim-directions", spotId)}/>
      <div style={{ padding: 18, flex: 1 }}>
        <p style={{ fontSize: 14, color: "var(--tc-text-2)", margin: "0 0 14px" }}>Take a photo of the item in your hands or transport. This prevents fraud and unlocks your points.</p>
        <div style={{ aspectRatio: "1/1", borderRadius: 14, overflow: "hidden", background: captured ? "var(--tc-mint-bg)" : "#1A1F1A", display: "grid", placeItems: "center", position: "relative" }}>
          {captured ? getItemArt("armchair") : (
            <button onClick={() => setCaptured(true)} style={{ width: 72, height: 72, borderRadius: "50%", background: "white", border: "4px solid rgba(255,255,255,0.4)" }}/>
          )}
          {captured && <button onClick={() => setCaptured(false)} style={{ position: "absolute", top: 10, right: 10, padding: "6px 12px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: 999, fontSize: 12 }}>Retake</button>}
        </div>
        <label style={{ marginTop: 14, display: "flex", alignItems: "flex-start", gap: 10, padding: 12, background: "var(--tc-line-2)", borderRadius: 10 }}>
          <input type="checkbox" defaultChecked style={{ marginTop: 3 }}/>
          <span style={{ fontSize: 13, color: "var(--tc-text-2)" }}>I have collected this item and will rehome or reuse it. I won't resend to landfill.</span>
        </label>
      </div>
      <div style={{ padding: 18, borderTop: "1px solid var(--tc-line)" }}>
        <button onClick={() => go("rescue-success", spotId)} className="tc-pill-btn block dark" disabled={!captured}>Confirm rescue <Icons.Check size={14}/></button>
      </div>
    </div>
  );
};

const MRescueSuccess = ({ go, spotId }) => {
  const s = spots.find(x => x.id === spotId) || spots[0];
  const pts = Math.round(s.points * 0.4);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #E8F5DC 0%, #F4FAEE 100%)", position: "relative", overflow: "hidden", paddingTop: 47 }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[...Array(30)].map((_, i) => {
          const x = (i * 31) % 100, y = 5 + (i * 19) % 80;
          const colors = ["#B8E5A0", "#98D37A", "#E8A23B", "#4A6BC9"];
          return <rect key={i} x={`${x}%`} y={`${y}%`} width="6" height="3" fill={colors[i%4]} transform={`rotate(${(i*37)%360} ${x*3.5} ${y*5})`}/>;
        })}
      </svg>
      <div style={{ flex: 1 }}/>
      <div style={{ position: "relative", padding: "0 32px", textAlign: "center" }}>
        <div style={{ width: 86, height: 86, borderRadius: "50%", background: "var(--tc-mint)", margin: "0 auto 18px", display: "grid", placeItems: "center", boxShadow: "0 10px 30px rgba(152,211,122,0.5)" }}>
          <Icons.Check size={44} strokeWidth={3}/>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--tc-mint-ink)" }}>RESCUE COMPLETE</div>
        <h2 style={{ margin: "6px 0 4px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          +{pts} points
        </h2>
        <div style={{ fontSize: 15, color: "var(--tc-text-2)" }}>{Math.round(s.co2e)} kg CO2e saved from landfill</div>
        <div style={{ marginTop: 18, padding: 14, background: "white", borderRadius: 14, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", background: "var(--tc-mint-bg)" }}>{getItemArt(s.photo)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{s.category}</div>
            <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{s.spotter.firstName} has been notified</div>
          </div>
          <Icons.Check size={18}/>
        </div>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ position: "relative", padding: "0 18px 30px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="tc-pill-btn block dark"><Icons.Share size={14}/> Share this rescue</button>
        <button onClick={() => go("home")} className="tc-pill-btn block ghost" style={{ background: "white" }}>Back to home</button>
      </div>
    </div>
  );
};

const MMap = ({ go }) => {
  const visible = spots.filter(s => s.status !== "rescued");
  const bbox = { minLat: 51.520, maxLat: 51.575, minLng: -0.045, maxLng: 0.055 };
  const project = (lat, lng) => ({
    x: ((lng - bbox.minLng) / (bbox.maxLng - bbox.minLng)) * 100,
    y: (1 - (lat - bbox.minLat) / (bbox.maxLat - bbox.minLat)) * 100,
  });
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MHeader title="Map" onBack={() => go("home")}/>
      <div style={{ flex: 1, position: "relative", background: "#F0F4EB" }}>
        <svg viewBox="0 0 360 500" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <rect width="360" height="500" fill="#F0F4EB"/>
          <path d="M 0 400 C 100 380, 200 420, 360 390" fill="#C8DCE8" opacity="0.8"/>
          <path d="M 0 260 Q 180 240, 360 270" stroke="#D9DED3" strokeWidth="5" fill="none"/>
          <path d="M 150 0 Q 160 200, 140 500" stroke="#D9DED3" strokeWidth="5" fill="none"/>
          <ellipse cx="130" cy="140" rx="45" ry="28" fill="#D6E9C3" opacity="0.6"/>
        </svg>
        {visible.map(s => {
          const p = project(s.lat, s.lng);
          const color = s.status === "live" ? "var(--tc-live)" : "var(--tc-claimed)";
          return (
            <button key={s.id} onClick={() => go("spot-detail", s.id)} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
              transform: "translate(-50%, -100%)",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: color, border: "2.5px solid white", boxShadow: "0 3px 8px rgba(0,0,0,.2)", display: "grid", placeItems: "center" }}>
                <span style={{ transform: "rotate(45deg)", color: "white", fontSize: 9, fontWeight: 700 }}>{s.points}</span>
              </div>
            </button>
          );
        })}
        <div style={{ position: "absolute", left: "50%", top: "60%", transform: "translate(-50%, -50%)", width: 16, height: 16, borderRadius: "50%", background: "#4A6BC9", border: "3px solid white", boxShadow: "0 0 0 10px rgba(74,107,201,0.2)" }}/>
        <div style={{ position: "absolute", top: 14, left: 18, right: 18, display: "flex", gap: 6, background: "white", padding: 4, borderRadius: 999, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          {["All","Live","Fly-tip"].map((l, i) => (
            <button key={l} style={{ flex: 1, padding: "8px 0", borderRadius: 999, fontSize: 12, fontWeight: 600, background: i === 0 ? "var(--tc-ink)" : "transparent", color: i === 0 ? "white" : "var(--tc-text-2)" }}>{l}</button>
          ))}
        </div>
      </div>
      <MBottomNav active="map" go={go}/>
    </div>
  );
};

const MNearby = ({ go }) => {
  const list = [...spots].filter(s => s.status !== "rescued").sort((a,b) => a.distanceKm - b.distanceKm);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <MHeader title="Nearby" onBack={() => go("home")}/>
      <div style={{ padding: "0 18px 14px" }}>
        <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>E15 · within 5km · {list.length} spots</div>
      </div>
      <div style={{ padding: "0 18px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map(s => (
          <button key={s.id} onClick={() => go("spot-detail", s.id)} style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: 10, background: "white", border: "1px solid var(--tc-line)", borderRadius: 12, padding: 8, textAlign: "left" }}>
            <div style={{ width: 90, height: 72, borderRadius: 8, overflow: "hidden", background: "var(--tc-mint-bg)" }}>{getItemArt(s.photo)}</div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.category}</div>
              <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{s.postcode} · {s.postedAgo}</div>
              <div style={{ fontSize: 11, color: "var(--tc-mint-ink)", fontWeight: 600 }}>{Math.round(s.co2e)} kg CO2e</div>
            </div>
            <div style={{ alignSelf: "center", textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{s.distanceKm}km</div>
              <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>{s.points} pts</div>
            </div>
          </button>
        ))}
      </div>
      <MBottomNav active="nearby-m" go={go}/>
    </div>
  );
};

export { MSpotDetail, MClaimDirections, MClaimConfirm, MRescueSuccess, MMap, MNearby };
