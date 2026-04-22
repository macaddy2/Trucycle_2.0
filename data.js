/* ============================================================
   TruCycle 2.0 — Demo Data Module
   All demo data for the Street Spot & Rescue showcase
   ============================================================ */

// Carbon Database — converted from TruCycle_Carbon_Database.csv
const CARBON_DB = [
  { category: "Furniture", subcategory: "Soft furniture", item: "Sofa — 3-seater", weight: 55, embodiedCO2: 5.0, landfillCO2: 0.497, netSaved: 190.9, points: 191, icon: "🛋️" },
  { category: "Furniture", subcategory: "Soft furniture", item: "Sofa — 2-seater", weight: 40, embodiedCO2: 5.0, landfillCO2: 0.497, netSaved: 138.5, points: 138, icon: "🛋️" },
  { category: "Furniture", subcategory: "Soft furniture", item: "Armchair", weight: 25, embodiedCO2: 5.0, landfillCO2: 0.497, netSaved: 86.0, points: 86, icon: "🪑" },
  { category: "Furniture", subcategory: "Soft furniture", item: "Sofa bed", weight: 60, embodiedCO2: 5.2, landfillCO2: 0.497, netSaved: 215.6, points: 216, icon: "🛏️" },
  { category: "Furniture", subcategory: "Soft furniture", item: "Recliner", weight: 45, embodiedCO2: 5.5, landfillCO2: 0.497, netSaved: 169.5, points: 170, icon: "🪑" },
  { category: "Furniture", subcategory: "Soft furniture", item: "Footstool / ottoman", weight: 8, embodiedCO2: 4.5, landfillCO2: 0.497, netSaved: 24.2, points: 24, icon: "🪑" },
  { category: "Furniture", subcategory: "Beds & mattresses", item: "Double mattress", weight: 30, embodiedCO2: 6.0, landfillCO2: 0.497, netSaved: 121.5, points: 122, icon: "🛏️" },
  { category: "Furniture", subcategory: "Beds & mattresses", item: "Single mattress", weight: 18, embodiedCO2: 6.0, landfillCO2: 0.497, netSaved: 72.3, points: 72, icon: "🛏️" },
  { category: "Furniture", subcategory: "Beds & mattresses", item: "King mattress", weight: 40, embodiedCO2: 6.0, landfillCO2: 0.497, netSaved: 162.5, points: 162, icon: "🛏️" },
  { category: "Furniture", subcategory: "Beds & mattresses", item: "Bed frame — wooden double", weight: 35, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 52.0, points: 52, icon: "🛏️" },
  { category: "Furniture", subcategory: "Beds & mattresses", item: "Bed frame — metal double", weight: 30, embodiedCO2: 4.0, landfillCO2: 0.1, netSaved: 73.6, points: 74, icon: "🛏️" },
  { category: "Furniture", subcategory: "Storage", item: "Wardrobe — 2-door", weight: 50, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 74.8, points: 75, icon: "🗄️" },
  { category: "Furniture", subcategory: "Storage", item: "Wardrobe — 3-door", weight: 80, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 120.6, points: 121, icon: "🗄️" },
  { category: "Furniture", subcategory: "Storage", item: "Chest of drawers", weight: 30, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 44.4, points: 44, icon: "🗄️" },
  { category: "Furniture", subcategory: "Storage", item: "Bedside table", weight: 12, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 16.9, points: 17, icon: "🪑" },
  { category: "Furniture", subcategory: "Storage", item: "Bookshelf — tall", weight: 25, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 36.7, points: 37, icon: "📚" },
  { category: "Furniture", subcategory: "Storage", item: "Sideboard", weight: 40, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 59.6, points: 60, icon: "🗄️" },
  { category: "Furniture", subcategory: "Storage", item: "TV stand / unit", weight: 25, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 36.7, points: 37, icon: "📺" },
  { category: "Furniture", subcategory: "Tables & desks", item: "Dining table — 4-seater", weight: 35, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 52.0, points: 52, icon: "🍽️" },
  { category: "Furniture", subcategory: "Tables & desks", item: "Dining table — 6-seater", weight: 55, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 82.5, points: 82, icon: "🍽️" },
  { category: "Furniture", subcategory: "Tables & desks", item: "Coffee table", weight: 15, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 21.5, points: 22, icon: "☕" },
  { category: "Furniture", subcategory: "Tables & desks", item: "Desk — home office", weight: 25, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 36.7, points: 37, icon: "🖥️" },
  { category: "Furniture", subcategory: "Seating", item: "Dining chair — wooden", weight: 6, embodiedCO2: 1.0, landfillCO2: 0.925, netSaved: 7.8, points: 8, icon: "🪑" },
  { category: "Furniture", subcategory: "Seating", item: "Office chair", weight: 15, embodiedCO2: 4.0, landfillCO2: 0.2, netSaved: 37.6, points: 38, icon: "💺" },
  { category: "WEEE", subcategory: "Large appliances", item: "Fridge freezer", weight: 60, embodiedCO2: 4.0, landfillCO2: 0.05, netSaved: 145.6, points: 146, icon: "🧊" },
  { category: "WEEE", subcategory: "Large appliances", item: "Washing machine", weight: 70, embodiedCO2: 4.0, landfillCO2: 0.05, netSaved: 170.1, points: 170, icon: "🫧" },
  { category: "WEEE", subcategory: "Large appliances", item: "Tumble dryer", weight: 45, embodiedCO2: 4.0, landfillCO2: 0.05, netSaved: 108.8, points: 109, icon: "♨️" },
  { category: "WEEE", subcategory: "Large appliances", item: "Dishwasher", weight: 50, embodiedCO2: 4.0, landfillCO2: 0.05, netSaved: 121.1, points: 121, icon: "🍽️" },
  { category: "WEEE", subcategory: "Large appliances", item: "Oven — electric", weight: 40, embodiedCO2: 4.0, landfillCO2: 0.05, netSaved: 96.6, points: 97, icon: "🔥" },
  { category: "WEEE", subcategory: "Large appliances", item: "Range cooker", weight: 80, embodiedCO2: 4.5, landfillCO2: 0.05, netSaved: 218.6, points: 219, icon: "🔥" },
  { category: "WEEE", subcategory: "Small appliances", item: "Microwave", weight: 12, embodiedCO2: 7.0, landfillCO2: 0.1, netSaved: 50.2, points: 50, icon: "📡" },
  { category: "WEEE", subcategory: "Small appliances", item: "Coffee machine", weight: 4, embodiedCO2: 7.5, landfillCO2: 0.1, netSaved: 17.0, points: 17, icon: "☕" },
  { category: "WEEE", subcategory: "Small appliances", item: "Vacuum cleaner — upright", weight: 8, embodiedCO2: 6.0, landfillCO2: 0.2, netSaved: 29.0, points: 29, icon: "🧹" },
  { category: "WEEE", subcategory: "IT equipment", item: "Desktop computer", weight: 10, embodiedCO2: 15.0, landfillCO2: 0.1, netSaved: 89.6, points: 90, icon: "🖥️" },
  { category: "WEEE", subcategory: "IT equipment", item: "Laptop", weight: 2, embodiedCO2: 20.0, landfillCO2: 0.1, netSaved: 22.8, points: 23, icon: "💻" },
  { category: "WEEE", subcategory: "IT equipment", item: "Monitor — LCD/LED", weight: 6, embodiedCO2: 10.0, landfillCO2: 0.1, netSaved: 35.2, points: 35, icon: "🖥️" },
  { category: "WEEE", subcategory: "Consumer electronics", item: "TV — 43-inch", weight: 10, embodiedCO2: 10.0, landfillCO2: 0.1, netSaved: 59.6, points: 60, icon: "📺" },
  { category: "WEEE", subcategory: "Consumer electronics", item: "TV — 55-inch", weight: 15, embodiedCO2: 10.0, landfillCO2: 0.1, netSaved: 90.1, points: 90, icon: "📺" },
  { category: "WEEE", subcategory: "Consumer electronics", item: "Games console", weight: 3, embodiedCO2: 9.0, landfillCO2: 0.1, netSaved: 15.1, points: 15, icon: "🎮" },
  { category: "WEEE", subcategory: "Lighting", item: "Floor lamp", weight: 4, embodiedCO2: 3.0, landfillCO2: 0.4, netSaved: 7.4, points: 7, icon: "💡" },
  { category: "WEEE", subcategory: "Lighting", item: "Table lamp", weight: 2, embodiedCO2: 3.0, landfillCO2: 0.4, netSaved: 3.0, points: 3, icon: "💡" },
  { category: "WEEE", subcategory: "Power tools", item: "Lawn mower — electric", weight: 15, embodiedCO2: 5.0, landfillCO2: 0.1, netSaved: 45.1, points: 45, icon: "🌿" },
  { category: "Bulky", subcategory: "Other", item: "Exercise bike", weight: 30, embodiedCO2: 5.0, landfillCO2: 0.2, netSaved: 94.6, points: 95, icon: "🚴" },
  { category: "Bulky", subcategory: "Other", item: "Treadmill", weight: 60, embodiedCO2: 4.5, landfillCO2: 0.2, netSaved: 172.6, points: 173, icon: "🏃" },
  { category: "Bulky", subcategory: "Other", item: "Bicycle", weight: 12, embodiedCO2: 4.5, landfillCO2: 0.3, netSaved: 34.6, points: 35, icon: "🚲" },
  { category: "Bulky", subcategory: "Other", item: "Pram / pushchair", weight: 10, embodiedCO2: 5.0, landfillCO2: 0.3, netSaved: 31.6, points: 32, icon: "👶" },
  { category: "Bulky", subcategory: "Other", item: "Garden furniture — table", weight: 20, embodiedCO2: 2.0, landfillCO2: 0.925, netSaved: 41.1, points: 41, icon: "🌳" },
  { category: "Bulky", subcategory: "Other", item: "BBQ — gas", weight: 25, embodiedCO2: 4.5, landfillCO2: 0.05, netSaved: 67.3, points: 67, icon: "🔥" },
];

// Demo spots seeded across London boroughs
const DEMO_SPOTS = [
  { id: 1, item: "Sofa — 3-seater", category: "Furniture", icon: "🛋️", lat: 51.5315, lng: 0.0086, postcode: "E15 1XA", status: "live", co2e: 190.9, points: 191, timeAgo: "12 min ago", spotter: "Sarah K.", condition: "Good condition, light wear on cushions" },
  { id: 2, item: "Washing machine", category: "WEEE", icon: "🫧", lat: 51.5401, lng: 0.0294, postcode: "E15 4QZ", status: "live", co2e: 170.1, points: 170, timeAgo: "28 min ago", spotter: "James T.", condition: "Working, replaced after kitchen refit" },
  { id: 3, item: "Bookshelf — tall", category: "Furniture", icon: "📚", lat: 51.5189, lng: 0.0185, postcode: "E16 3PB", status: "claimed", co2e: 36.7, points: 37, timeAgo: "1 hr ago", spotter: "Priya M.", condition: "IKEA Billy, pine finish, all shelves intact" },
  { id: 4, item: "Armchair", category: "Furniture", icon: "🪑", lat: 51.5362, lng: 0.0812, postcode: "E6 1HS", status: "live", co2e: 86.0, points: 86, timeAgo: "45 min ago", spotter: "David L.", condition: "Velvet, dark green, slight fade on arm" },
  { id: 5, item: "Fridge freezer", category: "WEEE", icon: "🧊", lat: 51.5468, lng: 0.0651, postcode: "E6 5NR", status: "live", co2e: 145.6, points: 146, timeAgo: "2 hrs ago", spotter: "Amina O.", condition: "Beko, frost free, moving house" },
  { id: 6, item: "Desk — home office", category: "Furniture", icon: "🖥️", lat: 51.4613, lng: -0.0118, postcode: "SE13 5HU", status: "live", co2e: 36.7, points: 37, timeAgo: "35 min ago", spotter: "Tom R.", condition: "Solid oak, 120cm wide, drawer working" },
  { id: 7, item: "Bicycle", category: "Bulky", icon: "🚲", lat: 51.4580, lng: -0.0210, postcode: "SE13 7SN", status: "rescued", co2e: 34.6, points: 35, timeAgo: "4 hrs ago", spotter: "Kenji W.", condition: "Mountain bike, needs new brake pads" },
  { id: 8, item: "Coffee table", category: "Furniture", icon: "☕", lat: 51.4527, lng: -0.0228, postcode: "SE6 4JF", status: "live", co2e: 21.5, points: 22, timeAgo: "1 hr ago", spotter: "Claire B.", condition: "Round glass top, chrome legs" },
  { id: 9, item: "TV — 55-inch", category: "WEEE", icon: "📺", lat: 51.5406, lng: 0.0037, postcode: "E15 2RW", status: "claimed", co2e: 90.1, points: 90, timeAgo: "3 hrs ago", spotter: "Marcus J.", condition: "Samsung Smart TV, 2021 model, screen perfect" },
  { id: 10, item: "Dining table — 4-seater", category: "Furniture", icon: "🍽️", lat: 51.5352, lng: 0.0151, postcode: "E15 3AQ", status: "live", co2e: 52.0, points: 52, timeAgo: "20 min ago", spotter: "Fatima H.", condition: "Pine, good condition, minor scratch" },
  { id: 11, item: "Double mattress", category: "Furniture", icon: "🛏️", lat: 51.5457, lng: 0.1022, postcode: "IG11 8AB", status: "live", co2e: 121.5, points: 122, timeAgo: "50 min ago", spotter: "Ryan P.", condition: "Memory foam, 2 yrs old, clean" },
  { id: 12, item: "Office chair", category: "Furniture", icon: "💺", lat: 51.5421, lng: 0.0891, postcode: "IG11 7QR", status: "live", co2e: 37.6, points: 38, timeAgo: "1.5 hrs ago", spotter: "Zara K.", condition: "Ergonomic, adjustable height, mesh back" },
  { id: 13, item: "Microwave", category: "WEEE", icon: "📡", lat: 51.4651, lng: -0.0310, postcode: "SE13 6DS", status: "live", co2e: 50.2, points: 50, timeAgo: "25 min ago", spotter: "Ben S.", condition: "Panasonic, 800W, works perfectly" },
  { id: 14, item: "Exercise bike", category: "Bulky", icon: "🚴", lat: 51.4744, lng: -0.0499, postcode: "SE4 2PD", status: "live", co2e: 94.6, points: 95, timeAgo: "40 min ago", spotter: "Lucy A.", condition: "Digital display, adjustable resistance" },
  { id: 15, item: "Chest of drawers", category: "Furniture", icon: "🗄️", lat: 51.5290, lng: 0.0050, postcode: "E15 1BD", status: "rescued", co2e: 44.4, points: 44, timeAgo: "5 hrs ago", spotter: "Omar F.", condition: "White, 4 drawers, all runners smooth" },
  { id: 16, item: "Wardrobe — 2-door", category: "Furniture", icon: "🗄️", lat: 51.5501, lng: 0.0745, postcode: "E6 3BT", status: "live", co2e: 74.8, points: 75, timeAgo: "15 min ago", spotter: "Ella D.", condition: "Dark wood, mirrored door, good condition" },
  { id: 17, item: "Floor lamp", category: "WEEE", icon: "💡", lat: 51.4715, lng: -0.0255, postcode: "SE13 5LB", status: "live", co2e: 7.4, points: 7, timeAgo: "10 min ago", spotter: "Noah C.", condition: "Arc lamp, brass finish, LED bulb included" },
  { id: 18, item: "Pram / pushchair", category: "Bulky", icon: "👶", lat: 51.5375, lng: 0.0429, postcode: "E13 0HB", status: "live", co2e: 31.6, points: 32, timeAgo: "55 min ago", spotter: "Aisha N.", condition: "Silver Cross, folds flat, rain cover included" },
  { id: 19, item: "Oven — electric", category: "WEEE", icon: "🔥", lat: 51.5488, lng: 0.0945, postcode: "IG11 9LS", status: "claimed", co2e: 96.6, points: 97, timeAgo: "2 hrs ago", spotter: "Chris M.", condition: "Built-in, 60cm, fan assisted, clean" },
  { id: 20, item: "Sofa — 2-seater", category: "Furniture", icon: "🛋️", lat: 51.4560, lng: -0.0148, postcode: "SE6 2BA", status: "live", co2e: 138.5, points: 138, timeAgo: "30 min ago", spotter: "Hannah L.", condition: "Grey fabric, IKEA Kivik, washable covers" },
];

// Demo user profile for the impact dashboard
const DEMO_USER = {
  name: "Alex",
  initials: "AK",
  totalPoints: 847,
  totalCO2e: 847.3,
  spotsPosted: 14,
  rescuesCompleted: 9,
  currentStreakWeeks: 4,
  postcode: "E15",
  postcodeRank: 3,
  badgeTier: "silver",
  joinedWeeksAgo: 8,
  weeklyData: [62, 85, 110, 145, 95, 132, 118, 100],
  weekLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
};

// London-wide aggregate data
const LONDON_STATS = {
  totalSpots: 2847,
  totalRescues: 1923,
  totalCO2eSaved: 142580,
  totalWeight: 87430,
  flyTippingDiverted: 412,
  activeUsers: 1247,
  weeklyActiveRescuers: 189,
  topBoroughs: [
    { name: "Newham", rescues: 312, co2e: 24150, barWidth: 100 },
    { name: "Lewisham", rescues: 278, co2e: 21480, barWidth: 89 },
    { name: "Barking & Dagenham", rescues: 245, co2e: 18920, barWidth: 78 },
    { name: "Tower Hamlets", rescues: 198, co2e: 15340, barWidth: 63 },
    { name: "Hackney", rescues: 176, co2e: 13650, barWidth: 56 },
    { name: "Southwark", rescues: 164, co2e: 12780, barWidth: 53 },
    { name: "Greenwich", rescues: 152, co2e: 11790, barWidth: 49 },
    { name: "Lambeth", rescues: 141, co2e: 10930, barWidth: 45 },
  ],
};

// Leaderboard data
const LEADERBOARD = [
  { rank: 1, postcode: "E15", area: "Stratford", rescues: 312, co2e: 24150, trend: "+12%", medal: "🥇" },
  { rank: 2, postcode: "SE13", area: "Lewisham", rescues: 278, co2e: 21480, trend: "+8%", medal: "🥈" },
  { rank: 3, postcode: "IG11", area: "Barking", rescues: 245, co2e: 18920, trend: "+15%", medal: "🥉" },
  { rank: 4, postcode: "E1", area: "Whitechapel", rescues: 198, co2e: 15340, trend: "+5%" },
  { rank: 5, postcode: "E8", area: "Hackney", rescues: 176, co2e: 13650, trend: "+3%" },
  { rank: 6, postcode: "SE1", area: "Southwark", rescues: 164, co2e: 12780, trend: "+9%" },
  { rank: 7, postcode: "SE10", area: "Greenwich", rescues: 152, co2e: 11790, trend: "+7%" },
  { rank: 8, postcode: "SW9", area: "Lambeth", rescues: 141, co2e: 10930, trend: "+4%" },
  { rank: 9, postcode: "E16", area: "Custom House", rescues: 134, co2e: 10280, trend: "+11%" },
  { rank: 10, postcode: "SE6", area: "Catford", rescues: 128, co2e: 9870, trend: "+6%" },
  { rank: 11, postcode: "E6", area: "East Ham", rescues: 119, co2e: 9210, trend: "+2%" },
  { rank: 12, postcode: "SE14", area: "New Cross", rescues: 112, co2e: 8640, trend: "+10%" },
];

// Ticker data for social proof
const TICKER_ITEMS = [
  { item: "3-seater sofa", postcode: "E15", co2e: 191, timeAgo: "12 min" },
  { item: "Washing machine", postcode: "E6", co2e: 170, timeAgo: "28 min" },
  { item: "Office chair", postcode: "SE13", co2e: 38, timeAgo: "45 min" },
  { item: "Bicycle", postcode: "SE13", co2e: 35, timeAgo: "1 hr" },
  { item: "Coffee table", postcode: "SE6", co2e: 22, timeAgo: "1.5 hrs" },
  { item: "Fridge freezer", postcode: "IG11", co2e: 146, timeAgo: "2 hrs" },
  { item: "Double mattress", postcode: "E15", co2e: 122, timeAgo: "2.5 hrs" },
  { item: "Desk", postcode: "SE4", co2e: 37, timeAgo: "3 hrs" },
  { item: "Armchair", postcode: "E16", co2e: 86, timeAgo: "3.5 hrs" },
  { item: "TV — 55-inch", postcode: "E15", co2e: 90, timeAgo: "4 hrs" },
];

// CO2 equivalency helpers
function co2ToMiles(co2e) {
  return Math.round(co2e * 4);
}

function co2ToTrainJourneys(co2e) {
  return (co2e / 100).toFixed(1);
}

function co2ToHeatingMonths(co2e) {
  return (co2e / 200).toFixed(1);
}

function co2ToTrees(co2e) {
  // Average tree absorbs ~22 kg CO2 per year
  return (co2e / 22).toFixed(1);
}

// Get unique categories from carbon DB
function getCategories() {
  const cats = {};
  CARBON_DB.forEach(item => {
    if (!cats[item.category]) cats[item.category] = [];
    if (!cats[item.category].includes(item.subcategory)) {
      cats[item.category].push(item.subcategory);
    }
  });
  return cats;
}

// Get items by category
function getItemsByCategory(category) {
  return CARBON_DB.filter(item => item.category === category);
}

// Find item in carbon DB
function findCarbonItem(itemName) {
  return CARBON_DB.find(item => item.item === itemName);
}

// Format large numbers
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
}
