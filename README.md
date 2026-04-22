# TruCycle 2.0 — Street Spot & Rescue Demo

> Community-powered reuse for London. Spot abandoned items on streets, rescue them for free, earn carbon points.

## What is this?

This is an interactive demo showcasing the upcoming **Street Spot & Rescue** feature for [TruCycle](https://trucycle.co.uk). It demonstrates new capabilities that complement the existing TruCycle marketplace:

- **📸 Spot Flow** — 3-step process to photograph and post items found on London streets
- **🗺️ Live Map** — Interactive London map showing all spotted items with Leaflet.js
- **📊 Impact Dashboard** — Personal carbon savings tracking with streaks and badges
- **🌍 London Dashboard** — City-wide aggregate impact and borough rankings
- **🧮 Carbon Calculator** — DEFRA-backed CO₂e savings calculator with 100+ items
- **🏆 Leaderboard** — Postcode-level community rankings

## Tech Stack

- **HTML/CSS/JavaScript** — No build step, no framework
- **Leaflet.js** — Interactive maps with CartoDB Voyager tiles
- **Google Fonts** — Fraunces (display) + Inter (UI)
- **Carbon Database** — Real data from DEFRA 2025 emission factors

## Quick Start

1. Clone the repo
2. Open `index.html` in a browser — that's it!

Or serve locally:
```bash
npx serve .
```

## Methodology

Carbon calculations use:
- DEFRA 2025 emission factors for landfill disposal
- PAS 2050 boundary definitions for embodied carbon
- 0.6 substitution rate (conservative, defensible)
- 1.4 kg CO₂e per van collection trip

See `carbon/TruCycle_Carbon_Methodology.docx` for the full methodology document.

## Project Structure

```
Trucycle_2.0/
├── index.html          # Main demo app
├── styles.css          # Design system & styles
├── app.js              # Application logic
├── data.js             # Carbon database & demo data
├── docs/               # Product documentation
│   └── TruCycle_2.0_Product_PRD.docx
├── carbon/             # Carbon methodology & data
│   ├── TruCycle_Carbon_Calculator.xlsx
│   ├── TruCycle_Carbon_Database.csv
│   └── TruCycle_Carbon_Methodology.docx
└── README.md
```

## Licence

© 2026 TruCycle Ltd. All rights reserved.
