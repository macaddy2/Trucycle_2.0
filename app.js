/* ============================================================
   TruCycle 2.0 — Application Logic
   Interactive demo for Street Spot & Rescue
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSpotFlow();
  initMap();
  initCarbonCalculator();
  initDashboardAnimations();
  initLondonDashboard();
  initLeaderboard();
  initTicker();
  initScrollEffects();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNavigation() {
  const tabs = document.querySelectorAll('.nav__tab');
  const sections = document.querySelectorAll('.section');
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const tabsContainer = document.querySelector('.nav__tabs');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.section;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update sections
      sections.forEach(s => s.classList.remove('active'));
      const targetSection = document.getElementById(target);
      if (targetSection) {
        targetSection.classList.add('active');
        // Trigger animations for the section
        triggerSectionAnimations(target);
      }

      // Close mobile menu
      tabsContainer.classList.remove('open');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Mobile toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      tabsContainer.classList.toggle('open');
    });
  }
}

function triggerSectionAnimations(sectionId) {
  if (sectionId === 'impact') animateCounters('.dashboard');
  if (sectionId === 'london') animateLondonDashboard();
  if (sectionId === 'leaderboard') animateLeaderboard();
  if (sectionId === 'map') {
    setTimeout(() => {
      if (window.spotMap) window.spotMap.invalidateSize();
    }, 100);
  }
}

/* ============================================================
   SCROLL EFFECTS
   ============================================================ */
function initScrollEffects() {
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Intersection observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe-animate').forEach(el => observer.observe(el));
}

/* ============================================================
   SPOT FLOW — 3-screen interactive demo
   ============================================================ */
let spotFlowState = {
  step: 1,
  photo: false,
  category: null,
  item: null,
};

function initSpotFlow() {
  // Shutter button
  const shutter = document.getElementById('shutter-btn');
  if (shutter) {
    shutter.addEventListener('click', capturePhoto);
  }

  // Category chips
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => selectCategory(chip));
  });

  // Navigation buttons
  const nextBtn = document.getElementById('spot-next');
  const backBtn = document.getElementById('spot-back');
  const postBtn = document.getElementById('spot-post');

  if (nextBtn) nextBtn.addEventListener('click', () => goToSpotStep(2));
  if (backBtn) backBtn.addEventListener('click', () => goToSpotStep(spotFlowState.step - 1));
  if (postBtn) postBtn.addEventListener('click', postSpot);
}

function capturePhoto() {
  const shutter = document.getElementById('shutter-btn');
  const cameraView = document.querySelector('.camera-mock');
  const itemPreview = document.querySelector('.camera-mock__item-preview');
  
  // Flash effect
  cameraView.style.background = 'white';
  setTimeout(() => {
    cameraView.style.background = '';
    cameraView.style.background = 'linear-gradient(135deg, #0F2A1E 0%, #2E7D32 100%)';
    if (itemPreview) {
      itemPreview.style.opacity = '1';
      itemPreview.style.fontSize = '100px';
    }
    
    // Show captured state
    const hint = cameraView.querySelector('.camera-mock__hint');
    if (hint) hint.textContent = '✓ Photo captured!';
    shutter.style.background = '#68C89B';
    
    spotFlowState.photo = true;
    
    // Auto-advance after brief pause
    setTimeout(() => goToSpotStep(2), 800);
  }, 150);
}

function selectCategory(chip) {
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
  spotFlowState.category = chip.dataset.category;
  spotFlowState.item = chip.dataset.item;

  // Update review card
  updateReviewCard();
}

function goToSpotStep(step) {
  if (step < 1 || step > 3) return;
  spotFlowState.step = step;

  // Update screens
  document.querySelectorAll('.spot-flow__screen').forEach(s => s.classList.remove('active'));
  const targetScreen = document.getElementById(`spot-step-${step}`);
  if (targetScreen) targetScreen.classList.add('active');

  // Update progress dots
  document.querySelectorAll('.spot-flow__step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'done');
    if (i + 1 === step) dot.classList.add('active');
    if (i + 1 < step) dot.classList.add('done');
  });

  document.querySelectorAll('.spot-flow__step-line').forEach((line, i) => {
    line.classList.remove('done');
    if (i + 1 < step) line.classList.add('done');
  });

  if (step === 3) updateReviewCard();
}

function updateReviewCard() {
  const itemData = spotFlowState.item ? findCarbonItem(spotFlowState.item) : null;
  if (!itemData) return;

  const itemEl = document.getElementById('review-item');
  const categoryEl = document.getElementById('review-category');
  const weightEl = document.getElementById('review-weight');
  const co2El = document.getElementById('review-co2');
  const pointsEl = document.getElementById('review-points');
  const iconEl = document.getElementById('review-icon');

  if (itemEl) itemEl.textContent = itemData.item;
  if (categoryEl) categoryEl.textContent = `${itemData.category} › ${itemData.subcategory}`;
  if (weightEl) weightEl.textContent = `${itemData.weight} kg`;
  if (co2El) co2El.textContent = `${itemData.netSaved} kg CO₂e`;
  if (pointsEl) pointsEl.textContent = `+${itemData.points}`;
  if (iconEl) iconEl.textContent = itemData.icon;
}

function postSpot() {
  // Show success modal
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.add('active');
    
    // Confetti-like effect
    const pointsDisplay = document.getElementById('modal-points');
    const itemData = spotFlowState.item ? findCarbonItem(spotFlowState.item) : null;
    if (pointsDisplay && itemData) {
      pointsDisplay.textContent = `+${itemData.points} carbon points`;
    }
  }
}

function closeModal() {
  const modal = document.getElementById('success-modal');
  if (modal) modal.classList.remove('active');
  
  // Reset flow
  spotFlowState = { step: 1, photo: false, category: null, item: null };
  goToSpotStep(1);
  
  // Reset camera
  const cameraView = document.querySelector('.camera-mock');
  if (cameraView) cameraView.style.background = '';
  const hint = document.querySelector('.camera-mock__hint');
  if (hint) hint.textContent = 'Tap the shutter to capture';
  const shutter = document.getElementById('shutter-btn');
  if (shutter) shutter.style.background = '';
  const itemPreview = document.querySelector('.camera-mock__item-preview');
  if (itemPreview) {
    itemPreview.style.opacity = '0.6';
    itemPreview.style.fontSize = '80px';
  }
  
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('selected'));
}

/* ============================================================
   MAP — Leaflet.js integration
   ============================================================ */
function initMap() {
  const mapEl = document.getElementById('spot-map');
  if (!mapEl) return;

  // Initialize Leaflet map centered on East London
  const map = L.map('spot-map', {
    zoomControl: false,
  }).setView([51.5200, 0.0100], 12);

  // Add zoom control to top-right
  L.control.zoom({ position: 'topright' }).addTo(map);

  // CartoDB Voyager tiles (clean, modern look)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Custom marker icon
  function createMarkerIcon(status, icon) {
    const color = status === 'live' ? '#2E7D32' : status === 'claimed' ? '#D4A84B' : '#999';
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 40px; height: 40px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        border: 3px solid white;
      "><span style="transform: rotate(45deg); font-size: 18px;">${icon}</span></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -42],
    });
  }

  // Add spots to map
  DEMO_SPOTS.forEach(spot => {
    const marker = L.marker([spot.lat, spot.lng], {
      icon: createMarkerIcon(spot.status, spot.icon),
    }).addTo(map);

    const statusLabel = spot.status === 'live' ? '🟢 Live' : spot.status === 'claimed' ? '🟡 Claimed' : '✅ Rescued';
    const statusColor = spot.status === 'live' ? '#2E7D32' : spot.status === 'claimed' ? '#D4A84B' : '#999';

    marker.bindPopup(`
      <div class="spot-popup" style="min-width: 200px;">
        <div class="spot-popup__title">${spot.icon} ${spot.item}</div>
        <div class="spot-popup__category">${spot.category} · ${spot.postcode}</div>
        <div class="spot-popup__co2">${spot.co2e} kg CO₂e saved</div>
        <div class="spot-popup__status" style="color: ${statusColor}">
          ${statusLabel} · Spotted ${spot.timeAgo} by ${spot.spotter}
        </div>
        <p style="margin-top: 8px; font-size: 13px; color: #5C6B63;">${spot.condition}</p>
        ${spot.status === 'live' ? '<button style="margin-top: 10px; width: 100%; padding: 8px; background: #0D3B24; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">Rescue This →</button>' : ''}
      </div>
    `, { maxWidth: 280 });
  });

  // ---- Populate sidebar spot list ----
  const spotList = document.getElementById('spot-list');
  if (spotList) {
    const liveSpots = DEMO_SPOTS.filter(s => s.status === 'live');
    spotList.innerHTML = liveSpots.map(spot => `
      <div class="spot-list-item" data-lat="${spot.lat}" data-lng="${spot.lng}">
        <div class="spot-list-item__icon">${spot.icon}</div>
        <div class="spot-list-item__info">
          <div class="spot-list-item__name">${spot.item}</div>
          <div class="spot-list-item__meta">
            <span>${spot.postcode}</span>
            <span>·</span>
            <span>${spot.timeAgo}</span>
          </div>
        </div>
        <span class="spot-list-item__status live">Live</span>
      </div>
    `).join('');

    // Click to fly to spot
    spotList.querySelectorAll('.spot-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const lat = parseFloat(item.dataset.lat);
        const lng = parseFloat(item.dataset.lng);
        map.flyTo([lat, lng], 16, { duration: 1.2 });
      });
    });
  }

  window.spotMap = map;
}

/* ============================================================
   CARBON CALCULATOR
   ============================================================ */
function initCarbonCalculator() {
  const categorySelect = document.getElementById('calc-category');
  const itemSelect = document.getElementById('calc-item');
  const resultDiv = document.getElementById('calc-result');

  if (!categorySelect || !itemSelect) return;

  // Populate categories
  const categories = [...new Set(CARBON_DB.map(i => i.category))];
  categorySelect.innerHTML = '<option value="">Choose category...</option>' + 
    categories.map(c => `<option value="${c}">${c}</option>`).join('');

  categorySelect.addEventListener('change', () => {
    const cat = categorySelect.value;
    if (!cat) {
      itemSelect.innerHTML = '<option value="">Choose item...</option>';
      if (resultDiv) resultDiv.style.display = 'none';
      return;
    }

    const items = CARBON_DB.filter(i => i.category === cat);
    itemSelect.innerHTML = '<option value="">Choose item...</option>' + 
      items.map(i => `<option value="${i.item}">${i.icon} ${i.item}</option>`).join('');
  });

  itemSelect.addEventListener('change', () => {
    const itemName = itemSelect.value;
    if (!itemName) {
      if (resultDiv) resultDiv.style.display = 'none';
      return;
    }

    const item = findCarbonItem(itemName);
    if (!item || !resultDiv) return;

    resultDiv.style.display = 'block';

    // Animate the result
    const co2El = document.getElementById('calc-co2');
    const weightEl = document.getElementById('calc-weight');
    const embodiedEl = document.getElementById('calc-embodied');
    const landfillEl = document.getElementById('calc-landfill');
    const pointsEl = document.getElementById('calc-points');
    const milesEl = document.getElementById('calc-miles');
    const trainsEl = document.getElementById('calc-trains');
    const treesEl = document.getElementById('calc-trees');

    if (co2El) animateNumber(co2El, item.netSaved, 1);
    if (weightEl) weightEl.textContent = `${item.weight} kg`;
    if (embodiedEl) embodiedEl.textContent = `${(item.embodiedCO2 * item.weight).toFixed(1)} kg`;
    if (landfillEl) landfillEl.textContent = `${(item.landfillCO2 * item.weight).toFixed(1)} kg`;
    if (pointsEl) pointsEl.textContent = item.points;
    if (milesEl) milesEl.textContent = co2ToMiles(item.netSaved).toLocaleString();
    if (trainsEl) trainsEl.textContent = co2ToTrainJourneys(item.netSaved);
    if (treesEl) treesEl.textContent = co2ToTrees(item.netSaved);
  });
}

/* ============================================================
   DASHBOARD ANIMATIONS
   ============================================================ */
function initDashboardAnimations() {
  // Set initial values
  const userPoints = document.getElementById('user-points');
  const userCO2 = document.getElementById('user-co2');
  const userSpots = document.getElementById('user-spots');
  const userRescues = document.getElementById('user-rescues');

  if (userPoints) userPoints.textContent = '0';
  if (userCO2) userCO2.textContent = '0';
  if (userSpots) userSpots.textContent = '0';
  if (userRescues) userRescues.textContent = '0';

  // Build streak bar
  buildStreakBar();
  // Build impact chart
  buildImpactChart();
}

function animateCounters(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  setTimeout(() => {
    const userPoints = document.getElementById('user-points');
    const userCO2 = document.getElementById('user-co2');
    const userSpots = document.getElementById('user-spots');
    const userRescues = document.getElementById('user-rescues');

    if (userPoints) animateNumber(userPoints, DEMO_USER.totalPoints, 0);
    if (userCO2) animateNumber(userCO2, DEMO_USER.totalCO2e, 1);
    if (userSpots) animateNumber(userSpots, DEMO_USER.spotsPosted, 0);
    if (userRescues) animateNumber(userRescues, DEMO_USER.rescuesCompleted, 0);

    // Equivalencies
    const eqMiles = document.getElementById('eq-miles');
    const eqTrains = document.getElementById('eq-trains');
    const eqTrees = document.getElementById('eq-trees');
    if (eqMiles) animateNumber(eqMiles, co2ToMiles(DEMO_USER.totalCO2e), 0);
    if (eqTrains) animateNumber(eqTrains, parseFloat(co2ToTrainJourneys(DEMO_USER.totalCO2e)), 1);
    if (eqTrees) animateNumber(eqTrees, parseFloat(co2ToTrees(DEMO_USER.totalCO2e)), 1);
  }, 200);

  // Animate chart bars
  setTimeout(() => {
    document.querySelectorAll('.chart-bar__fill').forEach(bar => {
      const target = bar.dataset.height;
      if (target) bar.style.height = target + '%';
    });
  }, 500);
}

function buildStreakBar() {
  const container = document.getElementById('streak-weeks');
  if (!container) return;

  const weeks = 8;
  const current = DEMO_USER.currentStreakWeeks;
  let html = '';
  for (let i = 1; i <= weeks; i++) {
    let cls = 'future';
    let label = `W${i}`;
    if (i < current) cls = 'done';
    else if (i === current) cls = 'current';
    html += `<div class="streak-bar__week ${cls}">${i <= current ? '✓' : i}</div>`;
  }
  container.innerHTML = html;
}

function buildImpactChart() {
  const container = document.getElementById('impact-chart');
  if (!container) return;

  const max = Math.max(...DEMO_USER.weeklyData);
  container.innerHTML = DEMO_USER.weeklyData.map((val, i) => `
    <div class="chart-bar">
      <div class="chart-bar__fill" data-height="${(val / max * 85).toFixed(0)}" style="height: 4px;"></div>
      <div class="chart-bar__label">${DEMO_USER.weekLabels[i]}</div>
    </div>
  `).join('');
}

/* ============================================================
   LONDON DASHBOARD
   ============================================================ */
function initLondonDashboard() {
  // Set initial values to 0 for animation
  const els = ['london-spots', 'london-rescues', 'london-co2', 'london-users'];
  els.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '0';
  });

  // Build borough list
  buildBoroughList();
}

function animateLondonDashboard() {
  setTimeout(() => {
    const spots = document.getElementById('london-spots');
    const rescues = document.getElementById('london-rescues');
    const co2 = document.getElementById('london-co2');
    const users = document.getElementById('london-users');

    if (spots) animateNumber(spots, LONDON_STATS.totalSpots, 0);
    if (rescues) animateNumber(rescues, LONDON_STATS.totalRescues, 0);
    if (co2) animateNumber(co2, LONDON_STATS.totalCO2eSaved, 0, true);
    if (users) animateNumber(users, LONDON_STATS.activeUsers, 0);

    // Animate borough bars
    setTimeout(() => {
      document.querySelectorAll('.borough-item__bar-fill').forEach(bar => {
        const target = bar.dataset.width;
        if (target) bar.style.width = target + '%';
      });
    }, 600);
  }, 200);
}

function buildBoroughList() {
  const container = document.getElementById('borough-list');
  if (!container) return;

  container.innerHTML = LONDON_STATS.topBoroughs.map((b, i) => `
    <div class="borough-item">
      <div class="borough-item__rank">#${i + 1}</div>
      <div class="borough-item__name">${b.name}</div>
      <div class="borough-item__bar">
        <div class="borough-item__bar-fill" data-width="${b.barWidth}" style="width: 0%;"></div>
      </div>
      <div class="borough-item__value">${formatNumber(b.co2e)} kg</div>
    </div>
  `).join('');
}

/* ============================================================
   LEADERBOARD
   ============================================================ */
function initLeaderboard() {
  buildLeaderboard();
}

function buildLeaderboard() {
  const container = document.getElementById('leaderboard-body');
  if (!container) return;

  container.innerHTML = LEADERBOARD.map(row => `
    <div class="leaderboard-row" style="opacity: 0; transform: translateX(-10px); transition: all 0.4s var(--ease);">
      <div class="leaderboard-row__rank ${row.rank <= 3 ? 'top-3' : ''}">
        ${row.medal || row.rank}
      </div>
      <div class="leaderboard-row__postcode">
        ${row.postcode} <span style="color: var(--tc-ink-soft); font-weight: 400; font-size: 13px;">${row.area}</span>
      </div>
      <div class="leaderboard-row__rescues">${row.rescues}</div>
      <div class="leaderboard-row__co2">${formatNumber(row.co2e)} kg</div>
      <div class="leaderboard-row__trend up">▲ ${row.trend}</div>
    </div>
  `).join('');
}

function animateLeaderboard() {
  const rows = document.querySelectorAll('.leaderboard-row:not(.header)');
  rows.forEach((row, i) => {
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, i * 80);
  });
}

/* ============================================================
   TICKER
   ============================================================ */
function initTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  // Double the items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  track.innerHTML = items.map(t => `
    <div class="ticker__item">
      <span class="dot"></span>
      Just rescued: ${t.item} in ${t.postcode} — ${t.co2e} kg saved · ${t.timeAgo}
    </div>
  `).join('');
}

/* ============================================================
   ANIMATED NUMBER COUNTER
   ============================================================ */
function animateNumber(element, target, decimals = 0, useFormat = false) {
  const duration = 1500;
  const startTime = performance.now();
  const start = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quad
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    if (useFormat) {
      element.textContent = formatNumber(Math.round(current));
    } else if (decimals > 0) {
      element.textContent = current.toFixed(decimals);
    } else {
      element.textContent = Math.round(current).toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ============================================================
   CTA BUTTON HANDLERS — Navigate between sections
   ============================================================ */
function navigateToSection(sectionId) {
  const tab = document.querySelector(`.nav__tab[data-section="${sectionId}"]`);
  if (tab) tab.click();
}
