import React, { useState } from 'react';
import { Icons, getItemArt, PageHead, Stat } from './shared';
import { spots, leaderboard, topSpotters, currentUser } from '../data/data';

const MapView = ({ openSpotDetail }) => {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(spots[0].id);

  const filtered = spots.filter(s => {
    if (filter === "live") return s.status === "live";
    if (filter === "flytip") return s.isFlytipped;
    if (filter === "all") return s.status !== "rescued";
    return true;
  });

  const bbox = { minLat: 51.520, maxLat: 51.575, minLng: -0.045, maxLng: 0.055 };
  const project = (lat, lng) => ({
    x: ((lng - bbox.minLng) / (bbox.maxLng - bbox.minLng)) * 100,
    y: (1 - (lat - bbox.minLat) / (bbox.maxLat - bbox.minLat)) * 100,
  });

  const selected = spots.find(s => s.id === selectedId);

  return (
    <div>
      <PageHead title="Map" subtitle="Live spots across East London · tap a pin to rescue" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18, height: "calc(100vh - 180px)" }}>
        <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid var(--tc-line)", background: "#EEF2EA" }}>
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDE4D4" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="#F0F4EB"/>
            <rect width="1000" height="600" fill="url(#grid)"/>
            <path d="M 0 440 C 150 420, 280 480, 420 430 S 620 380, 780 410 S 920 460, 1000 440 L 1000 600 L 0 600 Z" fill="#C8DCE8" opacity="0.8"/>
            <path d="M 0 440 C 150 420, 280 480, 420 430 S 620 380, 780 410 S 920 460, 1000 440" fill="none" stroke="#9FBACC" strokeWidth="1"/>
            <ellipse cx="380" cy="180" rx="70" ry="45" fill="#D6E9C3" opacity="0.6"/>
            <ellipse cx="720" cy="220" rx="55" ry="38" fill="#D6E9C3" opacity="0.6"/>
            <ellipse cx="180" cy="300" rx="50" ry="32" fill="#D6E9C3" opacity="0.6"/>
            <path d="M 0 280 Q 300 260, 500 290 T 1000 300" fill="none" stroke="#D9DED3" strokeWidth="6"/>
            <path d="M 420 0 Q 430 180, 400 360 T 380 600" fill="none" stroke="#D9DED3" strokeWidth="6"/>
            <path d="M 0 180 Q 300 200, 620 170 T 1000 190" fill="none" stroke="#E3E7DD" strokeWidth="4"/>
            <path d="M 700 0 Q 690 200, 720 400 T 740 600" fill="none" stroke="#E3E7DD" strokeWidth="4"/>
            <text x="380" y="200" fill="#5E6B5F" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.45">E15</text>
            <text x="720" y="240" fill="#5E6B5F" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.45">E6</text>
            <text x="180" y="320" fill="#5E6B5F" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.45">E3</text>
            <text x="560" y="180" fill="#5E6B5F" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.45">E13</text>
          </svg>

          {filtered.map(s => {
            const pos = project(s.lat, s.lng);
            const isSel = s.id === selectedId;
            const color = s.status === "live" ? "var(--tc-live)" : s.status === "claimed" ? "var(--tc-claimed)" : "var(--tc-rescued)";
            return (
              <button key={s.id} onClick={() => setSelectedId(s.id)} style={{
                position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
                transform: `translate(-50%, -100%) scale(${isSel ? 1.15 : 1})`,
                transition: "transform .15s", zIndex: isSel ? 10 : 1,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50% 50% 50% 0",
                  transform: "rotate(-45deg)",
                  background: color, border: "2px solid white",
                  boxShadow: "0 3px 8px rgba(0,0,0,.2)",
                  display: "grid", placeItems: "center",
                }}>
                  <div style={{ transform: "rotate(45deg)", color: "white", fontSize: 10 }}>
                    {s.isFlytipped ? "⚠" : s.points}
                  </div>
                </div>
              </button>
            );
          })}

          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: 16, height: 16, borderRadius: "50%",
            background: "#4A6BC9", border: "3px solid white",
            boxShadow: "0 0 0 10px rgba(74,107,201,0.2), 0 3px 8px rgba(0,0,0,.2)",
          }}/>

          <div style={{
            position: "absolute", top: 16, left: 16,
            display: "flex", gap: 6, background: "white",
            padding: 4, borderRadius: 999, boxShadow: "var(--tc-shadow-md)",
          }}>
            {[["all","All"],["live","Live"],["flytip","Fly-tipped"]].map(([k,l]) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: filter === k ? "var(--tc-ink)" : "transparent",
                color: filter === k ? "white" : "var(--tc-text-2)",
              }}>{l}</button>
            ))}
          </div>

          <button className="tc-pill-btn" style={{ position: "absolute", bottom: 16, right: 16, background: "white", color: "var(--tc-ink)", boxShadow: "var(--tc-shadow-md)" }}>
            <Icons.Target size={16}/> Centre on me
          </button>

          <div style={{
            position: "absolute", bottom: 16, left: 16, background: "white",
            padding: "10px 14px", borderRadius: 12, boxShadow: "var(--tc-shadow-md)",
            display: "flex", gap: 14, fontSize: 12,
          }}>
            {[["Live", "var(--tc-live)"], ["Claimed", "var(--tc-claimed)"], ["Rescued", "var(--tc-rescued)"]].map(([l, c]) => (
              <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>
                {l}
              </span>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="tc-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/3", background: "var(--tc-mint-bg)", position: "relative" }}>
                {getItemArt(selected.photo)}
                {selected.isFlytipped && <span className="tc-chip flytip" style={{ position: "absolute", top: 10, left: 10 }}>Fly-tipped</span>}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{selected.category}</h3>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--tc-text-3)" }}>{selected.streetHint} · {selected.postcode}</p>
                  </div>
                  <span className={`tc-chip ${selected.status}`}>{selected.status}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "14px 0" }}>
                  <Stat label="Weight" value={`${selected.weight} kg`} />
                  <Stat label="CO2e" value={`${Math.round(selected.co2e)} kg`} />
                  <Stat label="Distance" value={`${selected.distanceKm} km`} />
                </div>

                {selected.notes && (
                  <p style={{ fontSize: 13, color: "var(--tc-text-2)", background: "var(--tc-mint-wash)", padding: 10, borderRadius: 10, margin: "0 0 12px" }}>
                    "{selected.notes}"
                  </p>
                )}

                <div style={{ fontSize: 12, color: "var(--tc-text-3)", marginBottom: 12 }}>
                  Spotted by <b style={{ color: "var(--tc-text)" }}>{selected.spotter.firstName}</b> · {selected.postedAgo}
                </div>

                <button className="tc-pill-btn block dark" onClick={() => openSpotDetail && openSpotDetail(selected.id)}>
                  Rescue this <Icons.ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NearbyView = ({ openSpotDetail }) => {
  const nearby = [...spots].filter(s => s.status !== "rescued").sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div>
      <PageHead title="Nearby" subtitle="Spots within 5km of E15, sorted by walking distance" />

      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <button className="tc-pill-btn ghost"><Icons.Target size={14}/> E15 · 5km</button>
        <button className="tc-pill-btn ghost">All categories</button>
        <button className="tc-pill-btn ghost">All statuses</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, color: "var(--tc-text-3)", alignSelf: "center" }}>{nearby.length} results</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {nearby.map(s => (
          <button key={s.id} onClick={() => openSpotDetail && openSpotDetail(s.id)} style={{
            display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 16,
            background: "white", border: "1px solid var(--tc-line)",
            borderRadius: 14, padding: 10, textAlign: "left",
            transition: "border-color .15s, transform .15s",
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tc-mint-deep)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tc-line)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: 120, height: 90, borderRadius: 10, overflow: "hidden", background: "var(--tc-mint-bg)" }}>
              {getItemArt(s.photo)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--tc-ink)" }}>{s.category}</span>
                <span className={`tc-chip ${s.status}`} style={{ fontSize: 10, padding: "3px 8px" }}>{s.status}</span>
                {s.isFlytipped && <span className="tc-chip flytip" style={{ fontSize: 10, padding: "3px 8px" }}>fly-tipped</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>
                {s.streetHint} · {s.postcode}
              </div>
              <div style={{ fontSize: 12, color: "var(--tc-text-3)" }}>
                Spotted by <b style={{ color: "var(--tc-text-2)" }}>{s.spotter.firstName}</b> · {s.postedAgo}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: 4, paddingRight: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--tc-ink)" }}>{s.distanceKm} km</div>
              <div style={{ fontSize: 12, color: "var(--tc-mint-ink)", fontWeight: 600 }}>{Math.round(s.co2e)} kg CO2e</div>
              <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{s.points} pts</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const LeaderboardView = () => {
  const [period, setPeriod] = useState("month");

  return (
    <div>
      <PageHead title="Leaderboard" subtitle="Which London postcodes are rescuing the most this month" />

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[["week","This week"],["month","This month"],["all","All-time"]].map(([k,l]) => (
          <button key={k} onClick={() => setPeriod(k)} className={period === k ? "tc-pill-btn" : "tc-pill-btn ghost"}>{l}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <div className="tc-card" style={{ padding: 0 }}>
          <div style={{ padding: "18px 20px 12px" }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Top postcodes</h3>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--tc-text-3)" }}>Ranked by rescues this month</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px 80px 1fr 80px 80px", padding: "6px 20px", fontSize: 11, color: "var(--tc-text-3)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            <span>#</span><span>Postcode</span><span>Activity</span><span style={{ textAlign: "right" }}>CO2e</span><span style={{ textAlign: "right" }}>Trend</span>
          </div>
          {leaderboard.map(row => {
            const isMine = row.postcode === currentUser.postcode;
            const maxRescues = leaderboard[0].rescues;
            return (
              <div key={row.postcode} style={{
                display: "grid", gridTemplateColumns: "40px 80px 1fr 80px 80px",
                padding: "12px 20px", alignItems: "center",
                background: isMine ? "var(--tc-mint-wash)" : "transparent",
                borderTop: "1px solid var(--tc-line-2)",
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.rank <= 3 ? "var(--tc-mint-ink)" : "var(--tc-text-3)" }}>
                  {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--tc-ink)" }}>
                  {row.postcode}{isMine && <span style={{ fontSize: 10, marginLeft: 6, color: "var(--tc-mint-ink)", fontWeight: 600 }}>YOU</span>}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ height: 6, borderRadius: 3, background: "var(--tc-line-2)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(row.rescues/maxRescues)*100}%`, background: "var(--tc-mint-deep)", borderRadius: 3 }}/>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{row.rescues} rescues · {row.spots} spots</span>
                </div>
                <span style={{ textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--tc-ink)" }}>{(row.co2e/1000).toFixed(1)}t</span>
                <span style={{ textAlign: "right", fontSize: 12, fontWeight: 600, color: row.trend.startsWith("+") ? "var(--tc-live)" : row.trend.startsWith("-") ? "var(--tc-danger)" : "var(--tc-text-3)" }}>
                  {row.trend}
                </span>
              </div>
            );
          })}
        </div>

        <div className="tc-card" style={{ padding: 0 }}>
          <div style={{ padding: "18px 20px 12px" }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Top spotters in E15</h3>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--tc-text-3)" }}>Points this month</p>
          </div>
          {topSpotters.map(sp => (
            <div key={sp.rank} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 20px",
              borderTop: "1px solid var(--tc-line-2)",
              background: sp.isMe ? "var(--tc-mint-wash)" : "transparent",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--tc-text-3)", width: 20 }}>#{sp.rank}</span>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: sp.isMe ? "var(--tc-mint)" : "var(--tc-mint-bg)", color: "var(--tc-mint-ink)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>
                {sp.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--tc-ink)" }}>
                  {sp.name}{sp.isMe && <span style={{ fontSize: 10, marginLeft: 6, color: "var(--tc-mint-ink)", fontWeight: 700 }}>YOU</span>}
                </div>
                <div style={{ fontSize: 11, color: "var(--tc-text-3)" }}>{sp.spots} spots posted</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--tc-ink)" }}>{sp.points.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "var(--tc-text-3)" }}>pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MapView, NearbyView, LeaderboardView };
