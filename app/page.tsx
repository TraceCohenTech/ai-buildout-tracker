"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  Cell, ReferenceLine,
} from "recharts";
import {
  Zap, DollarSign, Briefcase, Building2, AlertTriangle,
  TrendingUp, Droplets, ChevronDown, ChevronUp, Info,
} from "lucide-react";
import {
  HYPERSCALER_CAPEX_2026,
  TOP_PROJECTS,
  STATES_DATA,
  FISCAL_BENEFIT_RATIOS,
  ELECTRICITY_PRICE_DATA,
  DC_ELECTRICITY_SHARE,
  HOST_COUNTIES,
  RATEPAYER_STATE_YOY,
} from "@/lib/data";

function StatCard({ label, value, sub, icon: Icon, accent = "blue" }: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; accent?: string;
}) {
  const accentMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentMap[accent] || accentMap.blue}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{value}</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">{label}</div>
        {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-3xl">{subtitle}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s.includes("construction")) return <span className="badge-construction">{status}</span>;
  if (s.includes("planned")) return <span className="badge-planned">{status}</span>;
  if (s.includes("operational")) return <span className="badge-operational">{status}</span>;
  if (s.includes("announced")) return <span className="badge-announced">{status}</span>;
  if (s.includes("approved")) return <span className="badge-approved">{status}</span>;
  return <span className="badge-mixed">{status}</span>;
}

const CustomBarTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
        <div className="font-semibold text-slate-800 mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || "#334155" }} className="font-medium">
            {p.name}: ${p.value}B
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [statesExpanded, setStatesExpanded] = useState(false);
  const displayedProjects = projectsExpanded ? TOP_PROJECTS : TOP_PROJECTS.slice(0, 12);
  const displayedStates = statesExpanded ? STATES_DATA : STATES_DATA.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* HERO */}
      <div className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Live Tracker · June 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-3 max-w-4xl">
            The US AI Infrastructure<br className="hidden sm:block" /> Buildout
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            $290B+ in announced data center investment is reshaping rural America — rewiring the electrical grid,
            flooding depopulating counties with construction jobs, and sparking the most consequential land-use
            debate in a generation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Total Announced CapEx", value: "$290B+" },
              { label: "Hyperscaler CapEx 2026", value: "$675B" },
              { label: "Stargate Program", value: "$500B" },
              { label: "US Facilities (Op.)", value: "4,000+" },
              { label: "Construction Jobs", value: "40,000+" },
              { label: "US Electrical Load by 2030", value: "8–12%" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                <div className="text-xl sm:text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-blue-200 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pipeline Projects (Near-Term)" value="65" sub="$92.1B in projects breaking ground" icon={Building2} accent="blue" />
          <StatCard label="YTD CapEx (Apr 2026)" value="$49.5B" sub="74 projects broke ground" icon={DollarSign} accent="green" />
          <StatCard label="Permanent Jobs (Disclosed)" value="10,000+" sub="$18M–$54M capex per permanent job" icon={Briefcase} accent="slate" />
          <StatCard label="Ratepayer Burden (7 States)" value="$4.3B" sub="IL +16%, VA +13%, OH +12% YoY" icon={AlertTriangle} accent="red" />
        </div>

        {/* HYPERSCALER CAPEX 2026 */}
        <section>
          <SectionHeader
            title="Hyperscaler Capital Expenditure — 2026"
            subtitle="The five largest tech companies are collectively spending $675B this year on AI infrastructure globally — the single biggest coordinated private capital deployment in history. Amazon leads at $200B, nearly double its 2025 pace."
          />
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
            <div className="h-[260px] sm:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HYPERSCALER_CAPEX_2026} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `$${v}B`} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12, fill: "#334155" }} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="capex" name="2026 CapEx" radius={[0, 6, 6, 0]}>
                    {HYPERSCALER_CAPEX_2026.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {HYPERSCALER_CAPEX_2026.map((o) => (
                <div key={o.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: o.color }} />
                  <span className="text-xs text-slate-600">{o.name}: <strong className="text-slate-800">${o.capex}B</strong></span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-900">
              <span className="font-bold">Total: $675B in 2026</span> — up from $350B in 2025. This 5-company total exceeds the GDP of Switzerland. Full program commitments (Stargate alone: $500B) push the multi-year figure toward $7T by 2030.
            </div>
          </div>
        </section>

        {/* TOP PROJECTS TABLE */}
        <section>
          <SectionHeader
            title="Top Projects by CapEx"
            subtitle="The largest announced AI infrastructure projects in the United States. Many rural counties hosting these projects have no prior industrial anchor at this scale — some have never seen a private investment exceeding $100M."
          />
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Company</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Project</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Location</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">State</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">CapEx</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Const. Jobs</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Perm. Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProjects.map((p, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900 text-xs">{p.company}</td>
                      <td className="px-4 py-3 text-slate-700 text-xs">{p.project}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{p.location}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded">{p.state}</span>
                      </td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 text-xs">{p.capex}</td>
                      <td className="px-4 py-3 text-right text-slate-600 text-xs">{p.constructionJobs}</td>
                      <td className="px-4 py-3 text-right text-slate-600 text-xs">{p.permJobs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setProjectsExpanded(!projectsExpanded)}
              className="w-full py-3 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border-t border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              {projectsExpanded
                ? <><ChevronUp size={16} /> Show Less</>
                : <><ChevronDown size={16} /> Show All {TOP_PROJECTS.length} Projects</>}
            </button>
          </div>
        </section>

        {/* STATE LEADERBOARD */}
        <section>
          <SectionHeader
            title="State Leaderboard — Facilities & Economic Impact"
            subtitle="Virginia leads in facility count and economic maturity. Texas is projected to surpass it by 2030 as the Stargate program, Vantage Frontier ($25B), and Aligned Caprock ($5B) come online."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-slate-700 text-sm mb-4">Operational Facilities by State (Top 10)</h3>
              <div className="h-[280px] sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10)}
                    margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="state" tick={{ fontSize: 12, fill: "#475569" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip
                      formatter={(v, name) => [String(v), String(name) === "operational" ? "Operational" : "Pipeline/UC"]}
                    />
                    <Bar dataKey="operational" name="Operational" stackId="a" radius={[0, 0, 0, 0]}>
                      {[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10).map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#1d4ed8" : i === 1 ? "#2563eb" : "#3b82f6"} />
                      ))}
                    </Bar>
                    <Bar dataKey="pipeline" name="Pipeline/UC" stackId="a" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-700" /><span>Operational</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-200" /><span>Pipeline / Under Construction</span></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[440px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">State</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Op.</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Pipeline</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">GDP</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Jobs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStates.map((s, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{s.state}</div>
                          <div className="text-xs text-slate-500">{s.state_name}</div>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900 text-sm">{s.operational || "—"}</td>
                        <td className="px-4 py-3 text-right text-slate-600 text-sm">{s.pipeline || "—"}</td>
                        <td className="px-4 py-3 text-right text-green-700 font-semibold text-xs">
                          {s.gdpB ? `$${s.gdpB}B` : "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-700 text-xs">
                          {s.jobs ? s.jobs.toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setStatesExpanded(!statesExpanded)}
                className="w-full py-3 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border-t border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                {statesExpanded
                  ? <><ChevronUp size={16} /> Show Less</>
                  : <><ChevronDown size={16} /> Show All {STATES_DATA.length} States</>}
              </button>
            </div>
          </div>
        </section>

        {/* FISCAL IMPACT */}
        <section>
          <SectionHeader
            title="Fiscal Benefit Ratios — The Land Use Math"
            subtitle="Fiscal benefit ratio = dollars of property tax revenue per dollar of public services consumed. Data centers are the highest-ratio land use in modern American local government history — by a wide margin."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
              <div className="h-[280px] sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FISCAL_BENEFIT_RATIOS} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${v}:1`} />
                    <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "#334155" }} />
                    <Tooltip formatter={(v: unknown) => [`${v}:1`, "Fiscal Ratio"]} />
                    <ReferenceLine
                      x={1}
                      stroke="#ef4444"
                      strokeDasharray="4 4"
                      label={{ value: "Break-even", position: "insideTopRight", fontSize: 10, fill: "#ef4444" }}
                    />
                    <Bar dataKey="ratio" name="Fiscal Ratio" radius={[0, 6, 6, 0]}>
                      {FISCAL_BENEFIT_RATIOS.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2">Source: NVTC / Loudoun Economic Development. Red dashed = break-even (1:1). Below 1:1 = net fiscal loss.</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Loudoun County, VA",
                  stat: "38% of general fund",
                  detail: "From 3% of county land. $733M/yr property tax. $120M Revenue Stabilization Fund fully funded.",
                  badge: "26:1 Ratio",
                  color: "bg-blue-50 border-blue-200",
                  textColor: "text-blue-900",
                  badgeCls: "bg-blue-700 text-white",
                },
                {
                  title: "Virginia Statewide",
                  stat: "74,000 jobs / $9.1B GDP",
                  detail: "1:3.5 job multiplier. $1.64B in local taxes/yr. 84% of all VA capex in 2024.",
                  badge: "JLARC 2024",
                  color: "bg-green-50 border-green-200",
                  textColor: "text-green-900",
                  badgeCls: "bg-green-700 text-white",
                },
                {
                  title: "Arizona",
                  stat: "$25B GDP contribution",
                  detail: "$863M in combined annual tax revenue. Phoenix is #4 North American data center market.",
                  badge: "2023 Data",
                  color: "bg-amber-50 border-amber-200",
                  textColor: "text-amber-900",
                  badgeCls: "bg-amber-700 text-white",
                },
                {
                  title: "Brookings Institution (2026)",
                  stat: "+4–5% private employment",
                  detail: "770 facilities, 93 host counties vs 3,000 controls. +22% information sector. +11% construction. Home prices: unchanged (0%).",
                  badge: "Peer-Reviewed",
                  color: "bg-slate-50 border-slate-200",
                  textColor: "text-slate-900",
                  badgeCls: "bg-slate-700 text-white",
                },
                {
                  title: "Project Steamboat (Fulton Co., GA)",
                  stat: "$12K/yr → $200M over 10 years",
                  detail: "That parcel was generating $12K/yr in property tax. The DC transforms it 1,666×. 10-yr economic impact: $2.88B.",
                  badge: "1,666× Multiplier",
                  color: "bg-indigo-50 border-indigo-200",
                  textColor: "text-indigo-900",
                  badgeCls: "bg-indigo-700 text-white",
                },
              ].map((item) => (
                <div key={item.title} className={`rounded-xl border p-4 ${item.color} ${item.textColor}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm mb-0.5">{item.title}</div>
                      <div className="font-black text-base leading-tight">{item.stat}</div>
                      <div className="text-xs mt-1 opacity-75">{item.detail}</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${item.badgeCls}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENERGY REALITY */}
        <section>
          <SectionHeader
            title="Energy Reality — The Grid Pressure"
            subtitle="Data centers are responsible for 60% of all US electrical load growth through 2030. The US grid was not built for this. Electricity prices are rising nationally, and the fastest increases are in DC-heavy states."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4">DC Share of US Electricity Consumption</h3>
              <div className="h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DC_ELECTRICITY_SHARE} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                    <defs>
                      <linearGradient id="elecGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#475569" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: unknown) => [`${v}%`, "DC Share of US Electricity"]} />
                    <Area
                      type="monotone"
                      dataKey="share"
                      stroke="#2563EB"
                      fill="url(#elecGrad)"
                      strokeWidth={2.5}
                      dot={{ fill: "#2563EB", r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4">US Avg Electricity Price (¢/kWh)</h3>
              <div className="h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ELECTRICITY_PRICE_DATA} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#475569" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${v}¢`} domain={[10, 30]} />
                    <Tooltip formatter={(v: unknown) => [`${v}¢/kWh`, "Avg Price"]} />
                    <Line
                      type="monotone"
                      dataKey="cents"
                      stroke="#dc2626"
                      strokeWidth={2.5}
                      dot={{ fill: "#dc2626", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Share of US Load Growth Through 2030", value: "60%", color: "text-blue-700" },
              { label: "US Electricity Price Rise (2019–2025)", value: "+46%", color: "text-red-600" },
              { label: "Virginia 5-Year Price Increase", value: "+267%", color: "text-red-700" },
              { label: "PJM Capacity Auction Spike (YoY)", value: "+568%", color: "text-red-700" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                <div className={`text-2xl sm:text-3xl font-black ${item.color}`}>{item.value}</div>
                <div className="text-xs text-slate-500 mt-1 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* THE DARK SIDE */}
        <section>
          <SectionHeader
            title="The Costs — Ratepayers, Water, Governance"
            subtitle="Data centers impose costs that don't show up in headline economic numbers. They land on residential electric bills, community water tables, and environmental justice communities — and often under NDAs that prevent public scrutiny."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Ratepayer */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-red-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Ratepayer Cost Shift</h3>
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RATEPAYER_STATE_YOY} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="state" tick={{ fontSize: 12, fill: "#475569" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: unknown) => [`+${v}%`, "YoY Bill Increase"]} />
                    <Bar dataKey="pct" name="YoY Increase" radius={[4, 4, 0, 0]}>
                      {RATEPAYER_STATE_YOY.map((entry, i) => (
                        <Cell key={i} fill={entry.state === "US Avg" ? "#94a3b8" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 space-y-2">
                <div className="bg-red-50 rounded-lg p-3 text-xs text-red-900">
                  <strong>$4.3B</strong> total ratepayer burden across 7 states (Union of Concerned Scientists, 2024)
                </div>
                <div className="text-xs text-slate-600">Ohio households: projected <strong>+$70/mo</strong> by 2028</div>
                <div className="text-xs text-slate-600">PJM capacity auction jumped from $2.2B → $14.7B (+568%) in one year</div>
              </div>
            </div>

            {/* Water */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Droplets size={16} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Water Consumption</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "US DC Daily Water Use (2021)", value: "449M gal/day", note: "5,426 facilities nationally" },
                  { label: "Projected 2028 Annual", value: "32B gallons", note: "Cooling demand drives growth" },
                  { label: "Typical Hyperscale Range", value: "10K–5M gal/day", note: "Per facility — highly variable" },
                  { label: "Newton Co., GA (Meta Mansfield)", value: "10% county supply", note: "Future permits could double usage" },
                  { label: "Berkeley Co., SC (Google)", value: "1.5M gal/day", note: "Triggered community opposition" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.note}</div>
                    </div>
                    <div className="text-sm font-bold text-blue-700 text-right ml-2 shrink-0">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={16} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Governance Red Flags</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Virginia NDAs", value: "80%", note: "Of VA municipalities with DCs block public project info" },
                  { label: "Abilene Tax Abatement", value: "85%", note: "10-year property tax abatement, min 400 jobs at $57.6K" },
                  { label: "Blocked Project Value", value: "$64B+", note: "Stopped by community water/energy/noise opposition" },
                  { label: "Ohio Standard Abatement", value: "75–100%", note: "15-year exemption for $100M+ projects" },
                  { label: "xAI Memphis Colossus", value: "⚠ EJ Case", note: "Gas turbines adjacent to Black communities — canonical failure" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.note}</div>
                    </div>
                    <div className="text-sm font-bold text-amber-700 text-right ml-2 shrink-0">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regulatory responses */}
          <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
            <div className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <Info size={15} className="text-green-600" /> States Are Pushing Back — Regulatory Responses
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  state: "Virginia",
                  rule: "GS5 Rate Class (Nov 2025)",
                  detail: "DCs ≥25MW must pay min 85% of distribution/transmission + 60% of generation costs. Effective Jan 2027. Estimated residential savings: $5.52/mo.",
                },
                {
                  state: "Ohio",
                  rule: "85% Min-Pay Rule (2025)",
                  detail: "DCs must pay 85% of contracted capacity even when unused. DC demand requests immediately dropped from 30GW to 13GW — halved.",
                },
                {
                  state: "Mississippi",
                  rule: "Cost Recovery Legislation",
                  detail: "Special legislation requires AWS to cover incremental power infrastructure costs. Entergy: $300M grid investment at no cost to customers.",
                },
              ].map((r) => (
                <div key={r.state} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="font-bold text-green-900 text-sm">{r.state}</div>
                  <div className="text-xs font-semibold text-green-800 mt-0.5">{r.rule}</div>
                  <div className="text-xs text-green-700 mt-1 leading-relaxed">{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOST COUNTIES */}
        <section>
          <SectionHeader
            title="The Unlikely Winners — Host County Profiles"
            subtitle="The counties receiving the biggest investments are often the ones with the fewest economic alternatives. Here's what the baseline looked like before the data centers arrived — and why the counterfactual matters."
          />
          <div className="overflow-x-auto scrollbar-thin bg-white border border-slate-200 rounded-xl">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">County</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Anchor Project</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Investment</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Per Capita Income</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Poverty Rate</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Child Poverty</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Pop. Change</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {HOST_COUNTIES.map((c, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900 text-xs">{c.county}</td>
                    <td className="px-4 py-3 text-slate-700 text-xs">{c.anchor}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 text-xs">{c.investment}</td>
                    <td className="px-4 py-3 text-right text-slate-600 text-xs">{c.perCapitaIncome}</td>
                    <td className="px-4 py-3 text-right text-red-600 font-semibold text-xs">{c.povertyRate}</td>
                    <td className="px-4 py-3 text-right text-red-700 font-bold text-xs">{c.childPoverty}</td>
                    <td className="px-4 py-3 text-right text-slate-600 text-xs">{c.popChange}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        c.verdict === "Transformative"
                          ? "bg-green-100 text-green-800"
                          : c.verdict === "Positive"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {c.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
              Richland Parish, Louisiana — The Defining Case
            </div>
            <p className="text-sm leading-relaxed text-slate-200">
              Meta&apos;s $27B Hyperion campus is being built in a parish where 37% of children live in poverty, per capita income
              is $42,298, and the population has shrunk 6% since 2010. Meta wages run 150% above the state average (~$80K vs $42K).
              The parish is receiving $300M in direct infrastructure funding. The counterfactual isn&apos;t a better industrial project
              — it&apos;s continued agricultural decline and school funding cuts driven by a shrinking tax base.
            </p>
          </div>
        </section>

        {/* WHO GETS THE JOBS */}
        <section>
          <SectionHeader
            title="Who Gets the Jobs?"
            subtitle="Construction phases employ 5–10× more workers than the permanent facility. Most permanent roles are highly technical, but the construction wave generates broad blue-collar employment across a 300-mile radius."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Construction Phase Trades</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Concrete", "Steel / Ironwork", "Electrical Construction", "Civil Engineering",
                  "HVAC / Mechanical", "Fiber Optic", "Substation Tech", "Plumbing",
                  "Landscaping", "Heavy Equipment", "Project Management", "Safety / EHS",
                ].map((tag) => (
                  <span key={tag} className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                <strong>6,000</strong> peak construction workers at Stargate Abilene alone. Pulled from a 300-mile radius.
                Ohio had 22,300 construction + 4,500 permanent DC jobs in 2024.
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Permanent Operations Roles</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Center Technician", "Network Engineer", "Electrical Engineer",
                  "Mechanical Engineer", "Power Systems Engineer", "Site Reliability Engineer",
                  "Cooling Infrastructure", "Facilities Manager", "Security Operations",
                  "Environmental Compliance", "Procurement", "Industrial Maintenance",
                ].map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800">
                Permanent headcount is <strong>small relative to capex</strong> — 50–500 direct employees per billion invested.
                The real employment lever is construction wages + induced local spending (Brookings multiplier: 1:3.5).
              </div>
            </div>
          </div>
        </section>

        {/* NET VERDICT */}
        <section>
          <SectionHeader
            title="The Net Verdict"
            subtitle="Is hosting a data center net positive for a rural US community? The honest answer is conditional — but the data leans heavily toward yes, provided the community doesn't give away the store on tax structure."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-green-900 text-base mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-green-700" /> Net Positive Evidence
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Loudoun Co: 38% of general fund on 3% of land (26:1 fiscal ratio)",
                  "Virginia statewide: 74K jobs, $9.1B GDP, $1.64B local taxes, 1:3.5 multiplier",
                  "Arizona: $25B GDP, $863M combined annual tax revenue",
                  "Brookings (peer-reviewed): +4–5% private employment, +22% information sector",
                  "Richland Parish: $27B investment vs $42K per capita income / 24% poverty",
                  "Project Steamboat: $12K/yr idle parcel → $200M in 10-year property tax",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                    <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-red-900 text-base mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-700" /> Qualifying Evidence (Real Risks)
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Permanent jobs per facility: 50–500 (surprisingly few for the capex size)",
                  "Capex per permanent job: $18M–$54M — highest of any major industry",
                  "$4.3B ratepayer burden in 7 states — cost is socialized, benefit is private",
                  "Some communities absorb grid/water costs with no commensurate tax yield",
                  "80% of VA municipalities operate under NDAs limiting public accountability",
                  "xAI Memphis: gas turbines sited near Black communities — canonical EJ failure",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 bg-slate-900 text-white rounded-xl p-5 sm:p-7">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Thesis</div>
            <blockquote className="text-base sm:text-lg font-semibold leading-relaxed text-white">
              &ldquo;Data centers are the highest-yielding land-conversion event in modern American local fiscal history —
              for counties that would otherwise have no anchor industrial investment. The criticism has legitimate teeth
              on (1) ratepayer cost-shifting where regulators haven&apos;t acted and (2) environmental siting failures.
              But the alternative for most host counties is not a better industrial project — it&apos;s nothing.&rdquo;
            </blockquote>
            <div className="mt-5 border-t border-slate-700 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Net Positive When",
                  items: [
                    "Fair tax structure (not 100% abated)",
                    "Utility regulator prevents ratepayer cost-shift",
                    "Water/environmental constraints respected",
                  ],
                },
                {
                  label: "Net Negative When",
                  items: [
                    "Full abatement + grid costs socialized",
                    "Sited without EJ/water analysis",
                    "NDA blocks community oversight",
                  ],
                },
                {
                  label: "What Would Falsify This",
                  items: [
                    "Peer-reviewed studies showing net fiscal loss post-abatement",
                    "Brookings data showing population decline increasing vs controls",
                    "Pervasive ratepayer burden with no regulatory mitigation",
                  ],
                },
              ].map((col) => (
                <div key={col.label}>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{col.label}</div>
                  <ul className="space-y-1.5">
                    {col.items.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-slate-500 shrink-0 mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DATA NOTE */}
        <section>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Data & Methodology Notes</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              All figures are based on publicly disclosed announcements, state economic development filings, company press releases,
              JLARC 2024, Brookings 2026, UCS 2024, and local municipal records as of June 2026. Many projects have not yet disclosed
              final MW capacity, water agreements, or full permanent employment commitments. The largest remaining research gaps include
              Digital Realty, Equinix, CyrusOne, Aligned, Switch, Compass, CloudHQ, STACK, Iron Mountain, and numerous secondary
              hyperscaler campuses. Total identified capex: ~$290B+ (directly identified, publicly disclosed). Hyperscaler 2026 CapEx
              figures represent global programs with significant US concentration.
            </p>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8 mt-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-sm text-slate-500">
            Built by{" "}
            <a
              href="https://x.com/Trace_Cohen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-blue-600 font-semibold hover:underline">
              t@nyvp.com
            </a>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Data as of June 2026 · Sources: JLARC 2024, Brookings 2026, UCS 2024, State EDA filings, company disclosures
          </div>
        </div>
      </footer>
    </main>
  );
}
