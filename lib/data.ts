export const HYPERSCALER_CAPEX_2026 = [
  { name: "Amazon / AWS", capex: 200, color: "#f59e0b" },
  { name: "Alphabet / Google", capex: 180, color: "#ef4444" },
  { name: "Meta", capex: 125, color: "#3b82f6" },
  { name: "Microsoft", capex: 120, color: "#22c55e" },
  { name: "Oracle", capex: 50, color: "#8b5cf6" },
];

export const CAPEX_RAMP = [
  { year: "2023", spend: 118 },
  { year: "2024", spend: 230 },
  { year: "2025", spend: 350 },
  { year: "2026E", spend: 675 },
  { year: "2030E", spend: 1200 },
];

export const TOP_PROJECTS = [
  { company: "OpenAI / Oracle / SoftBank", project: "Stargate Program Total", location: "National", state: "Multi", status: "Mixed", capex: "$500B", constructionJobs: "30,000+", permJobs: "TBD", mw: 10000, tenYrImpact: null },
  { company: "Anthropic / Fluidstack", project: "US AI Infrastructure", location: "NY/TX Initial", state: "Multi", status: "Announced", capex: "$50B", constructionJobs: "2,000+", permJobs: "800+", mw: null, tenYrImpact: null },
  { company: "Google", project: "Texas Program", location: "Multiple TX Counties", state: "TX", status: "Planned", capex: "$40B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "Meta", project: "Hyperion", location: "Richland Parish, LA", state: "LA", status: "Construction", capex: "$27B", constructionJobs: "5,000", permJobs: "500", mw: 5000, tenYrImpact: null },
  { company: "AWS", project: "Mississippi Program", location: "Canton/Clinton/Vicksburg", state: "MS", status: "Construction", capex: "$25B", constructionJobs: "Thousands", permJobs: "2,000", mw: null, tenYrImpact: null },
  { company: "Vantage", project: "Frontier Campus", location: "Texas", state: "TX", status: "Planned", capex: "$25B", constructionJobs: "5,000+", permJobs: "TBD", mw: 1400, tenYrImpact: null },
  { company: "xAI", project: "MACROHARDRR Southaven", location: "Southaven, MS", state: "MS", status: "Construction", capex: "$20B", constructionJobs: "TBD", permJobs: "TBD", mw: 2000, tenYrImpact: null },
  { company: "Joliet / PowerHouse", project: "Joliet Technology Center", location: "Joliet, IL", state: "IL", status: "Approved", capex: "$20B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "AWS", project: "Pennsylvania Program", location: "Multiple PA", state: "PA", status: "Planned", capex: "$20B", constructionJobs: "Thousands", permJobs: "1,250", mw: null, tenYrImpact: null },
  { company: "Microsoft", project: "Fairwater AI Superfactory", location: "Atlanta, GA", state: "GA", status: "Construction", capex: "$80B (program)", constructionJobs: "1,324 peak", permJobs: "635+", mw: null, tenYrImpact: null },
  { company: "Vantage", project: "Lighthouse Campus", location: "Port Washington, WI", state: "WI", status: "Construction", capex: "$15B", constructionJobs: "4,000+", permJobs: "1,000+", mw: 902, tenYrImpact: null },
  { company: "QTS", project: "Dane County Mega Campus", location: "DeForest, WI", state: "WI", status: "Planned", capex: "$12B", constructionJobs: "5,000+", permJobs: "TBD", mw: 750, tenYrImpact: null },
  { company: "AWS", project: "Indiana Program", location: "St. Joseph County", state: "IN", status: "Construction", capex: "$11B", constructionJobs: "TBD", permJobs: "1,000", mw: null, tenYrImpact: null },
  { company: "OpenAI / Oracle / Crusoe", project: "Stargate Abilene", location: "Abilene, TX", state: "TX", status: "Construction", capex: "$3.5B (Phase 1)", constructionJobs: "6,000", permJobs: "357", mw: 1200, tenYrImpact: 4000000000 },
  { company: "AWS", project: "Georgia Program", location: "Multiple GA", state: "GA", status: "Planned", capex: "$11B", constructionJobs: "Thousands", permJobs: "Hundreds", mw: null, tenYrImpact: null },
  { company: "AWS", project: "North Carolina Program", location: "Hamlet/Rockingham", state: "NC", status: "Construction", capex: "$10B", constructionJobs: "Thousands", permJobs: "500", mw: null, tenYrImpact: null },
  { company: "Meta", project: "El Paso Campus", location: "El Paso, TX", state: "TX", status: "Construction", capex: "$10B+", constructionJobs: "4,000+", permJobs: "300+", mw: null, tenYrImpact: null },
  { company: "AWS", project: "Ohio Program", location: "Multiple OH", state: "OH", status: "Construction", capex: "$10B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "AWS", project: "KC Northland Campus", location: "Kansas City, MO", state: "MO", status: "Planned", capex: "$10B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "ESS", project: "Tarboro Campus", location: "Tarboro, NC", state: "NC", status: "Planned", capex: "$6.4B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "AVAIO Digital", project: "Leo Campus", location: "Little Rock, AR", state: "AR", status: "Construction", capex: "$6B+", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: null },
  { company: "CoreWeave", project: "Lancaster Campus", location: "Lancaster, PA", state: "PA", status: "Construction", capex: "$6B", constructionJobs: "600+", permJobs: "175+", mw: null, tenYrImpact: null },
  { company: "Aligned", project: "Project Caprock", location: "Hale County, TX", state: "TX", status: "Planned", capex: "$5B", constructionJobs: "TBD", permJobs: "TBD", mw: 540, tenYrImpact: 5000000000 },
  { company: "Cologix", project: "Johnstown Campus", location: "Johnstown, OH", state: "OH", status: "Construction", capex: "$7B", constructionJobs: "TBD", permJobs: "TBD", mw: 800, tenYrImpact: null },
  { company: "Microsoft", project: "Mount Pleasant Campus", location: "Mt. Pleasant, WI", state: "WI", status: "Construction", capex: "$7B", constructionJobs: "2,000+", permJobs: "800+", mw: null, tenYrImpact: null },
  { company: "NTT", project: "US Expansion Program", location: "Chicago/Dallas/Phoenix", state: "Multi", status: "Mixed", capex: "$10B", constructionJobs: "TBD", permJobs: "TBD", mw: 130, tenYrImpact: null },
  { company: "Microsoft", project: "Project Steamboat", location: "Fulton County, GA", state: "GA", status: "Approved", capex: "$1.84B", constructionJobs: "TBD", permJobs: "TBD", mw: null, tenYrImpact: 2884919877 },
  { company: "OpenAI / Oracle / Related Digital", project: "Stargate Michigan", location: "Saline Township, Washtenaw Co.", state: "MI", status: "Construction", capex: "$45B+", constructionJobs: "2,500 (union)", permJobs: "450+", mw: 1000, tenYrImpact: null },
];

export const STATES_DATA = [
  { state: "VA", state_name: "Virginia", operational: 300, pipeline: 60, commissionedMW: 4000, gdpB: 9.1, localTaxB: 1.64, jobs: 74000, multiplier: 3.5, notes: "Loudoun 26:1 fiscal ratio. 84% of all VA capex in 2024. GS5 rate class approved." },
  { state: "TX", state_name: "Texas", operational: 400, pipeline: 90, commissionedMW: 4000, ucMW: 8000, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Projected #1 market by 2030. Stargate flagship. 85% abatement typical." },
  { state: "AZ", state_name: "Arizona", operational: 110, pipeline: 40, commissionedMW: 1380, gdpB: 25, localTaxB: 0.863, jobs: null, multiplier: null, notes: "Phoenix #4 N. America. $25B GDP, $863M annual tax (2023)." },
  { state: "GA", state_name: "Georgia", operational: 80, pipeline: 35, commissionedMW: 1065, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Atlanta #4 US market. Industrial electricity 40% below national avg." },
  { state: "OH", state_name: "Ohio", operational: 100, pipeline: 77, commissionedMW: null, gdpB: null, localTaxB: null, jobs: 4500, multiplier: null, notes: "Columbus → #2 Great Lakes hub. DC share: 5.3% → 10.9% of state energy." },
  { state: "IL", state_name: "Illinois", operational: 120, pipeline: 25, commissionedMW: 805, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Joliet Tech Center $20B approved. Carbon-neutral mandate within 2 yrs." },
  { state: "CA", state_name: "California", operational: 280, pipeline: 30, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Silicon Valley primary cluster. Supply-constrained." },
  { state: "FL", state_name: "Florida", operational: 125, pipeline: 30, commissionedMW: 1900, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Emerging market. Subsea cable landings + population growth." },
  { state: "WI", state_name: "Wisconsin", operational: 20, pipeline: 15, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Microsoft + Vantage Lighthouse $15B. QTS $12B Dane County." },
  { state: "NC", state_name: "North Carolina", operational: 40, pipeline: 25, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Duke Energy: DC demand 3GW → 6GW in a decade." },
  { state: "PA", state_name: "Pennsylvania", operational: 30, pipeline: 20, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "AWS $20B = largest private investment in PA history. Nuclear-adjacent siting." },
  { state: "MS", state_name: "Mississippi", operational: 5, pipeline: 15, commissionedMW: null, gdpB: null, localTaxB: null, jobs: 2000, multiplier: null, notes: "AWS $25B + xAI $20B. Special law: AWS covers power infra costs." },
  { state: "IN", state_name: "Indiana", operational: 15, pipeline: 10, commissionedMW: null, gdpB: null, localTaxB: null, jobs: 1000, multiplier: null, notes: "AWS $11B = largest capex in IN history." },
  { state: "LA", state_name: "Louisiana", operational: 10, pipeline: 10, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Meta Hyperion $27B in Richland Parish. Entergy: 2,260MW new gas generation." },
  { state: "MO", state_name: "Missouri", operational: 20, pipeline: 15, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "Google KC 500MW; AWS Northland $10B (5 DCs)." },
  { state: "IA", state_name: "Iowa", operational: 25, pipeline: 5, commissionedMW: null, gdpB: null, localTaxB: null, jobs: null, multiplier: null, notes: "$15B invested since mid-2000s. Established cluster." },
];

export const MW_BY_STATE = [
  { state: "TX", mw: 12000, status: "Operational + Pipeline", color: "#f59e0b" },
  { state: "VA", mw: 4600, status: "Operational", color: "#22c55e" },
  { state: "LA", mw: 5000, status: "Under Construction", color: "#f59e0b" },
  { state: "MS", mw: 2000, status: "Under Construction", color: "#f59e0b" },
  { state: "WI", mw: 1652, status: "Under Construction", color: "#f59e0b" },
  { state: "WY", mw: 1800, status: "Planned", color: "#94a3b8" },
  { state: "FL", mw: 1900, status: "Planned", color: "#94a3b8" },
  { state: "AZ", mw: 1380, status: "Operational", color: "#22c55e" },
  { state: "GA", mw: 1065, status: "Operational", color: "#22c55e" },
  { state: "OH", mw: 800, status: "Under Construction", color: "#f59e0b" },
  { state: "IL", mw: 805, status: "Operational", color: "#22c55e" },
  { state: "NC", mw: 600, status: "Mixed", color: "#f59e0b" },
];

export const METRO_MARKETS = [
  { metro: "Northern VA", mw: 4000, rank: 1 },
  { metro: "Phoenix, AZ", mw: 1380, rank: 2 },
  { metro: "Dallas–Fort Worth", mw: 1125, rank: 3 },
  { metro: "Atlanta, GA", mw: 1065, rank: 4 },
  { metro: "Chicago, IL", mw: 805, rank: 5 },
];

export const REGIONAL_PIPELINE = [
  { region: "South", pct: 56, color: "#f59e0b" },
  { region: "West", pct: 20, color: "#3b82f6" },
  { region: "Midwest", pct: 14, color: "#22c55e" },
  { region: "Northeast", pct: 10, color: "#8b5cf6" },
];

export const OPERATOR_CATEGORIES = [
  { name: "Hyperscaler", value: 58, color: "#f59e0b", examples: "AWS, Google, Meta, Microsoft, Oracle" },
  { name: "AI-Native", value: 20, color: "#ef4444", examples: "OpenAI/Crusoe, xAI, Anthropic/Fluidstack" },
  { name: "Colocation", value: 15, color: "#3b82f6", examples: "Equinix, Digital Realty, QTS, Cologix" },
  { name: "Hyperscale DC", value: 7, color: "#22c55e", examples: "Vantage, CoreWeave, Aligned, STACK" },
];

export const JOBS_PER_BILLION = [
  { industry: "Data Centers\n(direct perm.)", jobs: 28, color: "#ef4444" },
  { industry: "Semiconductor\nFab", jobs: 200, color: "#8b5cf6" },
  { industry: "Auto\nPlant", jobs: 950, color: "#f59e0b" },
  { industry: "General\nManufacturing", jobs: 800, color: "#22c55e" },
  { industry: "Logistics\nHub", jobs: 1200, color: "#3b82f6" },
];

export const PROJECT_STATUS_BOARD = [
  { name: "Stargate Abilene", operator: "OpenAI/Oracle", state: "TX", mw: 1200, status: "ONLINE", statusColor: "#22c55e", capex: "$3.5B" },
  { name: "xAI Colossus", operator: "xAI", state: "TN", mw: 300, status: "ONLINE", statusColor: "#22c55e", capex: "N/D" },
  { name: "Loudoun Cluster", operator: "Multi-tenant", state: "VA", mw: 4000, status: "ONLINE", statusColor: "#22c55e", capex: "N/D" },
  { name: "Meta Hyperion", operator: "Meta", state: "LA", mw: 5000, status: "BUILDING", statusColor: "#f59e0b", capex: "$27B" },
  { name: "Vantage Lighthouse", operator: "Vantage", state: "WI", mw: 902, status: "BUILDING", statusColor: "#f59e0b", capex: "$15B" },
  { name: "xAI Southaven", operator: "xAI", state: "MS", mw: 2000, status: "BUILDING", statusColor: "#f59e0b", capex: "$20B" },
  { name: "AWS Indiana", operator: "AWS", state: "IN", mw: null, status: "BUILDING", statusColor: "#f59e0b", capex: "$11B" },
  { name: "Microsoft Fairwater", operator: "Microsoft", state: "GA", mw: null, status: "BUILDING", statusColor: "#f59e0b", capex: "$80B" },
  { name: "Cologix Johnstown", operator: "Cologix", state: "OH", mw: 800, status: "BUILDING", statusColor: "#f59e0b", capex: "$7B" },
  { name: "AVAIO Leo", operator: "AVAIO", state: "AR", mw: null, status: "BUILDING", statusColor: "#f59e0b", capex: "$6B+" },
  { name: "CoreWeave Lancaster", operator: "CoreWeave", state: "PA", mw: null, status: "BUILDING", statusColor: "#f59e0b", capex: "$6B" },
  { name: "AWS NC Richmond", operator: "AWS", state: "NC", mw: null, status: "BUILDING", statusColor: "#f59e0b", capex: "$10B" },
  { name: "Vantage Frontier TX", operator: "Vantage", state: "TX", mw: 1400, status: "PLANNED", statusColor: "#94a3b8", capex: "$25B" },
  { name: "Google Texas Program", operator: "Google", state: "TX", mw: null, status: "PLANNED", statusColor: "#94a3b8", capex: "$40B" },
  { name: "AWS Mississippi", operator: "AWS", state: "MS", mw: null, status: "PLANNED", statusColor: "#94a3b8", capex: "$25B" },
  { name: "QTS Dane County", operator: "QTS", state: "WI", mw: 750, status: "PLANNED", statusColor: "#94a3b8", capex: "$12B" },
  { name: "Stargate Wisconsin", operator: "OpenAI/Oracle", state: "WI", mw: null, status: "ANNOUNCED", statusColor: "#475569", capex: "TBD" },
  { name: "Crusoe-Tallgrass WY", operator: "Crusoe", state: "WY", mw: 1800, status: "PLANNED", statusColor: "#94a3b8", capex: "TBD" },
  { name: "Stargate Michigan", operator: "OpenAI/Oracle", state: "MI", mw: 1000, status: "BUILDING", statusColor: "#f59e0b", capex: "$45B+" },
];

export const FISCAL_BENEFIT_RATIOS = [
  { name: "Loudoun Co., VA", ratio: 26, color: "#22c55e" },
  { name: "Prince William Co., VA", ratio: 13, color: "#22c55e" },
  { name: "Mesa, AZ", ratio: 11, color: "#3b82f6" },
  { name: "Hillsborough, FL", ratio: 10, color: "#3b82f6" },
  { name: "Manufacturing (Best)", ratio: 4, color: "#f59e0b" },
  { name: "Residential", ratio: 0.8, color: "#ef4444" },
];

export const ELECTRICITY_PRICE_DATA = [
  { year: "2019", cents: 13.0 },
  { year: "2020", cents: 13.2 },
  { year: "2021", cents: 14.0 },
  { year: "2022", cents: 15.4 },
  { year: "2023", cents: 17.0 },
  { year: "2024", cents: 18.0 },
  { year: "2025", cents: 19.0 },
  { year: "2030E", cents: 26.6 },
];

export const DC_ELECTRICITY_SHARE = [
  { year: "2023", share: 4.4 },
  { year: "2026E", share: 6.5 },
  { year: "2028E", share: 9.0 },
  { year: "2030E", share: 10.0 },
];

export const HOST_COUNTIES = [
  { county: "Richland Parish, LA", anchor: "Meta Hyperion", investment: "$27B", perCapitaIncome: "$42,298", povertyRate: "24%", childPoverty: "37%", popChange: "−6%", verdict: "Transformative" },
  { county: "Taylor County, TX", anchor: "Stargate Abilene", investment: "$3.5B", perCapitaIncome: "Mid-range", povertyRate: "~15%", childPoverty: "N/A", popChange: "Stagnant", verdict: "Positive" },
  { county: "Fulton County, GA", anchor: "Project Steamboat", investment: "$1.84B", perCapitaIncome: "Above avg", povertyRate: "~13%", childPoverty: "N/A", popChange: "+Growth", verdict: "Positive" },
  { county: "Warren County, MS", anchor: "AWS Mississippi", investment: "$25B+", perCapitaIncome: "Below avg", povertyRate: "~22%", childPoverty: "N/A", popChange: "Declining", verdict: "Transformative" },
  { county: "St. Joseph County, IN", anchor: "AWS Indiana", investment: "$11B", perCapitaIncome: "Mid-range", povertyRate: "~16%", childPoverty: "N/A", popChange: "Stable", verdict: "Positive" },
  { county: "Newton County, GA", anchor: "Meta Mansfield", investment: "Operational", perCapitaIncome: "Below avg", povertyRate: "~18%", childPoverty: "N/A", popChange: "Growth", verdict: "Mixed" },
  { county: "Pulaski County, AR", anchor: "AVAIO Leo Campus", investment: "$6B+", perCapitaIncome: "Mid-range", povertyRate: "~17%", childPoverty: "N/A", popChange: "Stable", verdict: "Positive" },
  { county: "Ozaukee County, WI", anchor: "Vantage Lighthouse", investment: "$15B", perCapitaIncome: "Mid-range", povertyRate: "~10%", childPoverty: "N/A", popChange: "Stable", verdict: "Positive" },
];

export const RATEPAYER_STATE_YOY = [
  { state: "IL", pct: 16 },
  { state: "VA", pct: 13 },
  { state: "OH", pct: 12 },
  { state: "US Avg", pct: 6 },
];

export const NUCLEAR_DC_PAIRINGS = [
  {
    operator: "Amazon / AWS",
    facility: "Susquehanna Nuclear, PA",
    deal: "Acquired Talen Energy data center campus co-located on 977-acre site adjacent to the reactor for $650M",
    mw: 480,
    status: "Done",
    color: "#f59e0b",
  },
  {
    operator: "Microsoft",
    facility: "Three Mile Island, PA",
    deal: "20-year PPA to restart Unit 1 (Constellation Energy). Powers Azure data centers in the region.",
    mw: 835,
    status: "Signed",
    color: "#22c55e",
  },
  {
    operator: "Meta",
    facility: "Multi-site Nuclear PPAs",
    deal: "Multi-decade nuclear power purchase agreements announced 2024. Part of 24/7 carbon-free energy commitment.",
    mw: null,
    status: "Active",
    color: "#3b82f6",
  },
  {
    operator: "Google",
    facility: "Kairos Power (SMR)",
    deal: "Partnership for small modular reactor (SMR) deployment. Target: 500MW by 2030.",
    mw: 500,
    status: "Planned",
    color: "#8b5cf6",
  },
];

export const GAS_PLANT_BUILDOUTS = [
  {
    operator: "Entergy Louisiana (for Meta Hyperion)",
    type: "Combined-cycle gas turbines (3 units)",
    newMW: 2260,
    transmissionMiles: 100,
    substations: 8,
    concern: "Largest single-project gas buildout in Louisiana history to power one data center campus",
  },
  {
    operator: "Crusoe Energy (Abilene)",
    type: "Onsite natural gas generation",
    newMW: 500,
    transmissionMiles: null,
    substations: null,
    concern: "Air quality and emissions concerns near residential areas",
  },
  {
    operator: "Meta Prometheus (New Albany, OH)",
    type: "Interim natural gas (pre-nuclear)",
    newMW: 200,
    transmissionMiles: null,
    substations: null,
    concern: "Bridge power before nuclear PPA comes online",
  },
];

export const WORKFORCE_BENCHMARKS = {
  constructionWorkersPer100MW: 850,
  permanentWorkersPer100MW: { low: 100, high: 200 },
  avgConstructionComp: 140000,
  avgConstructionHourly: 70,
  cumulativeConstructionJobsThrough2030: 4700000,
  permanentJobsProjected2030: 697000,
  constructionDurationMonths: { low: 18, high: 36 },
  marylandSage: {
    constructionJobs: 5000,
    economicActivity: 775000000,
    stateTax: 18000000,
    permanentJobs: 500,
    annualStateTax: 14000000,
    source: "Sage Policy Group / Maryland Tech Council, Aug 2025"
  },
};

/* ─── Jobs Deep Dive ─── */

export const CONSTRUCTION_VS_PERM_JOBS = [
  { project: "Meta Hyperion (LA)", construction: 5000, permanent: 500 },
  { project: "Stargate Abilene (TX)", construction: 6000, permanent: 357 },
  { project: "Stargate Michigan", construction: 2500, permanent: 450 },
  { project: "Vantage Frontier (TX)", construction: 5000, permanent: 0 },
  { project: "QTS Dane County (WI)", construction: 5000, permanent: 0 },
  { project: "Vantage Lighthouse (WI)", construction: 4000, permanent: 1000 },
  { project: "Meta El Paso (TX)", construction: 4000, permanent: 300 },
  { project: "Microsoft Fairwater (GA)", construction: 1324, permanent: 635 },
  { project: "CoreWeave Lancaster (PA)", construction: 600, permanent: 175 },
];

export const PERM_JOBS_BY_ROLE = [
  { role: "Facilities / DC Ops", pct: 38, color: "#f59e0b" },
  { role: "Security", pct: 25, color: "#3b82f6" },
  { role: "IT / Networking", pct: 22, color: "#22c55e" },
  { role: "Management / Admin", pct: 15, color: "#8b5cf6" },
];

export const WAGE_VS_LOCAL_MEDIAN = [
  { county: "Richland Parish LA", dcWage: 80, localMedian: 42, pct: 89 },
  { county: "Saline Twp MI", dcWage: 95, localMedian: 68, pct: 40 },
  { county: "Taylor County TX", dcWage: 75, localMedian: 52, pct: 44 },
  { county: "Warren County MS", dcWage: 72, localMedian: 38, pct: 89 },
  { county: "St. Joseph Co. IN", dcWage: 78, localMedian: 51, pct: 53 },
  { county: "Ozaukee Co. WI", dcWage: 90, localMedian: 68, pct: 32 },
];

export const JOBS_TIMELINE = [
  { phase: "Pre-construction (site prep)", months: "0–6", workers: 200, type: "Local trades" },
  { phase: "Construction peak", months: "6–24", workers: 5000, type: "Regional union + trades" },
  { phase: "Construction wind-down", months: "24–36", workers: 1200, type: "Finishing trades" },
  { phase: "Commissioning", months: "30–42", workers: 400, type: "Specialist technicians" },
  { phase: "Operations (permanent)", months: "36+", workers: 300, type: "Full-time employees" },
  { phase: "Induced / indirect", months: "36+", workers: 1050, type: "Local economy (3.5× multiplier)" },
];

export const LOCAL_HIRING_DATA = [
  { project: "Stargate Michigan", commitment: "100% union labor", detail: "First Stargate campus with explicit union-built commitment. IBEW + operating engineers.", verified: true },
  { project: "AWS Mississippi", commitment: "Special legislation", detail: "AWS covers all power infrastructure costs; local workforce pipeline with community colleges.", verified: true },
  { project: "Vantage Lighthouse WI", commitment: "4,000+ construction", detail: "Partnered with Waukesha County Technical College for local trades training pipeline.", verified: true },
  { project: "Meta Hyperion LA", commitment: "Community benefit", detail: "$300M direct infrastructure funding; local hiring preference in CBA negotiations.", verified: true },
  { project: "Stargate Abilene TX", commitment: "6,000 construction", detail: "Pulling trades from 300-mile radius; $140K avg annual comp for construction workers.", verified: true },
  { project: "QTS Dane County WI", commitment: "5,000 construction", detail: "Partnership with MATC for apprenticeship pipeline. Local hiring goal: 30% of construction workforce.", verified: false },
];

/* ─── Ratepayer Burden ─── */

export const RATEPAYER_BURDEN_7STATES = [
  { state: "Virginia", code: "VA", burdenM: 1200, yoyPct: 13, regulated: true, note: "GS5 rate class now requires DCs to pay 60–85% of full cost. Pre-reform: ~40% subsidy." },
  { state: "Illinois", code: "IL", burdenM: 950, yoyPct: 16, regulated: false, note: "No DC-specific rate class. PJM capacity cost surge passes directly to residential accounts." },
  { state: "Ohio", code: "OH", burdenM: 820, yoyPct: 12, regulated: true, note: "85% min-pay rule approved. Households projected +$70/mo by 2028 from PJM charges alone." },
  { state: "Pennsylvania", code: "PA", burdenM: 580, yoyPct: 9, regulated: false, note: "Grid upgrade costs for DC interconnection socialized across full rate base." },
  { state: "Maryland", code: "MD", burdenM: 380, yoyPct: 8, regulated: false, note: "Transmission cost allocation from DC-metro growth clusters." },
  { state: "New Jersey", code: "NJ", burdenM: 240, yoyPct: 7, regulated: false, note: "Shares PJM capacity pool with DC-heavy neighbors despite fewer local facilities." },
  { state: "West Virginia", code: "WV", burdenM: 130, yoyPct: 5, regulated: false, note: "Grid reinforcement costs shared for transmission serving VA and OH DC loads." },
];

export const PJM_CAPACITY_AUCTION = [
  { year: "2022/23", priceB: 2.2, color: "#22c55e" },
  { year: "2023/24", priceB: 3.1, color: "#f59e0b" },
  { year: "2024/25", priceB: 14.7, color: "#ef4444" },
  { year: "2025/26E", priceB: 20.0, color: "#ef4444" },
];

export const RATEPAYER_HOW_IT_WORKS = [
  { n: "01", title: "DCs get below-market rates", body: "States offer economic development rate classes — often 30–40% below residential. The deal is designed to attract investment." },
  { n: "02", title: "Fixed grid costs don't shrink", body: "Transmission lines, substations, and peaker plants cost the same regardless of who uses them. Someone pays for them." },
  { n: "03", title: "Revenue shortfall spread to households", body: "The gap between what DCs pay and full cost is reallocated to residential and small-commercial accounts each billing cycle." },
  { n: "04", title: "PJM auction compounds it", body: "When DC load pushes grid operators to procure more capacity, the auction clears at a higher price — $14.7B in 2024/25, up 568%. Every ratepayer in the region absorbs it." },
  { n: "05", title: "Result: IL +16%, VA +13%, OH +12% YoY", body: "Households in DC-heavy states pay significantly more than the 6% US average increase — while data centers often pay 3–5× less per MWh than residential customers." },
];

export const TICKER_ITEMS = [
  "LIVE: Stargate Abilene — 200MW operational, 1,000MW under construction in Abilene, TX",
  "PJM capacity auction: $2.2B → $14.7B (+568% YoY) — residential bills absorbing the shock",
  "Meta Hyperion, LA: $27B / 5GW — largest private investment in Louisiana history",
  "Data centers: 60% of all US electrical load growth through 2030",
  "Ohio: DC demand projected 5.3% → 10.9% of state electricity consumption",
  "$4.3B ratepayer burden across IL, MD, NJ, OH, PA, VA, WV (Union of Concerned Scientists, 2024)",
  "US data centers: 449M gallons/day water consumption — 2021 baseline, growing fast",
  "Brookings 2026: +22% information sector employment in host counties vs controls",
  "YTD April 2026: $49.5B in 74 projects broke ground across the United States",
  "Loudoun County, VA: 38% of county general fund generated from 3% of its land (26:1 fiscal ratio)",
  "xAI Southaven, MS: $20B / 2GW / 1M GPU target — largest xAI project ever announced",
  "5 hyperscalers combined 2026 CapEx: $675B — exceeds the entire GDP of Switzerland",
  "Microsoft restarted Three Mile Island nuclear plant under 20-year PPA for Azure data centers",
  "AFBF: 4,925 active/under-construction data centers — most converted farmland won't return to ag",
  "Construction workers: $140K avg annual comp, $70/hr — pulling workforce from 300-mile radius",
  "Stargate Michigan: $45B+ / 1GW / 2,500 union construction jobs / 450+ permanent — Saline Township, Washtenaw County",
  "Stargate Michigan: first union-built Stargate campus — IBEW + operating engineers; delivery end 2027",
];
