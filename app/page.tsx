"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  Cell, ReferenceLine, PieChart, Pie,
} from "recharts";
import {
  Zap, DollarSign, Briefcase, Building2, AlertTriangle,
  TrendingUp, Droplets, ChevronDown, ChevronUp,
  Server, Radio, Cpu, ThermometerSun,
} from "lucide-react";
import {
  HYPERSCALER_CAPEX_2026,
  CAPEX_RAMP,
  TOP_PROJECTS,
  STATES_DATA,
  MW_BY_STATE,
  OPERATOR_CATEGORIES,
  JOBS_PER_BILLION,
  PROJECT_STATUS_BOARD,
  FISCAL_BENEFIT_RATIOS,
  ELECTRICITY_PRICE_DATA,
  DC_ELECTRICITY_SHARE,
  HOST_COUNTIES,
  RATEPAYER_STATE_YOY,
  TICKER_ITEMS,
} from "@/lib/data";

/* ─── Tooltip ─── */
const DarkTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: unknown; color?: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #3a3a3a", borderRadius: 4, padding: "8px 12px" }}>
      {label && <div style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#f1f5f9", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>
          {p.name}: {String(p.value)}
        </div>
      ))}
    </div>
  );
};

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s.includes("construction") || s.includes("building")) return <span className="badge-construction">{status}</span>;
  if (s.includes("planned")) return <span className="badge-planned">{status}</span>;
  if (s.includes("operational") || s.includes("online")) return <span className="badge-operational">{status}</span>;
  if (s.includes("announced")) return <span className="badge-announced">{status}</span>;
  if (s.includes("approved")) return <span className="badge-approved">{status}</span>;
  return <span className="badge-mixed">{status}</span>;
}

/* ─── LED dot ─── */
function Led({ color }: { color: string }) {
  const cls = color === "#22c55e" ? "led-green" : color === "#f59e0b" ? "led-amber" : color === "#ef4444" ? "led-red" : "led-grey";
  return <span className={cls} />;
}

/* ─── Section Header ─── */
function SysHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <div className="sys-label mb-1">{label}</div>
      <h2 className="text-xl sm:text-2xl font-black text-slate-100">{title}</h2>
      {sub && <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-3xl">{sub}</p>}
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ label, value, sub, icon: Icon, accent = "amber" }: {
  label: string; value: string; sub?: string; icon: React.ElementType; accent?: string;
}) {
  const accentClass = accent === "amber" ? "dc-card-amber" : accent === "red" ? "dc-card-red" : accent === "green" ? "dc-card-green" : "dc-card-cyan";
  const iconColor = accent === "amber" ? "#f59e0b" : accent === "red" ? "#ef4444" : accent === "green" ? "#22c55e" : "#06b6d4";
  return (
    <div className={`dc-card ${accentClass} stat-top-amber p-4 sm:p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div className="sys-label">{label}</div>
        <Icon size={16} color={iconColor} />
      </div>
      <div className="mono-num text-2xl sm:text-3xl font-black" style={{ color: iconColor }}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-2 leading-tight">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [statesExpanded, setStatesExpanded] = useState(false);
  const displayedProjects = projectsExpanded ? TOP_PROJECTS : TOP_PROJECTS.slice(0, 10);
  const displayedStates = statesExpanded ? STATES_DATA : STATES_DATA.slice(0, 8);
  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <main className="min-h-screen bg-grid" style={{ backgroundColor: "#0f0f0f" }}>

      {/* ═══ TOP STATUS BAR ═══ */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #1f1f1f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="led-green" />
            <span className="mono-num text-green-400 font-bold">SYS ONLINE</span>
          </div>
          <span style={{ color: "#2a2a2a" }}>|</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <Radio size={11} color="#f59e0b" />
            <span className="text-amber-500 font-bold uppercase tracking-wider">LIVE</span>
          </div>
          <span style={{ color: "#2a2a2a" }}>|</span>
          <div className="text-slate-500 font-mono">JUNE 2026 · US AI INFRASTRUCTURE COMMAND</div>
        </div>
      </div>

      {/* ═══ LIVE TICKER ═══ */}
      <div style={{ background: "#111", borderBottom: "1px solid #2a2a2a", overflow: "hidden" }}>
        <div className="ticker-track py-2">
          {tickerDouble.map((item, i) => (
            <span key={i} className="mono-num text-xs text-slate-400 px-8 shrink-0 whitespace-nowrap">
              <span className="text-amber-500 mr-2">▶</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <div style={{ background: "linear-gradient(180deg, #161616 0%, #0f0f0f 100%)", borderBottom: "1px solid #2a2a2a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-5">
            <Cpu size={20} color="#f59e0b" />
            <span className="sys-label">US AI INFRASTRUCTURE · MASTER COMMAND</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-none mb-2 tracking-tight" style={{ color: "#f1f5f9" }}>
            AI BUILDOUT
          </h1>
          <h1 className="text-4xl sm:text-6xl font-black leading-none mb-5 tracking-tight amber-glow">
            TRACKER
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-8 leading-relaxed">
            $290B+ in announced data center investment is rewiring rural America — flooding depopulating counties with construction crews,
            overloading the electrical grid, and reshaping local fiscal policy in ways that will last decades.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {[
              { label: "Identified CapEx", value: "$290B+", color: "#f59e0b" },
              { label: "Hyperscaler CapEx 2026", value: "$675B", color: "#f59e0b" },
              { label: "Stargate Total", value: "$500B", color: "#ef4444" },
              { label: "Operational Facilities", value: "4,000+", color: "#22c55e" },
              { label: "Construction Jobs", value: "40K+", color: "#06b6d4" },
              { label: "US Elec. Load by 2030", value: "8–12%", color: "#ef4444" },
            ].map((s) => (
              <div key={s.label} className="dc-card p-3 sm:p-4" style={{ borderTop: `2px solid ${s.color}` }}>
                <div className="mono-num text-xl sm:text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="sys-label mt-1" style={{ fontSize: 9 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">

        {/* ═══ SYSTEM STAT CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Near-Term Pipeline" value="65" sub="Projects — $92.1B breaking ground" icon={Building2} accent="amber" />
          <StatCard label="YTD CapEx (Apr 2026)" value="$49.5B" sub="74 projects broke ground" icon={DollarSign} accent="green" />
          <StatCard label="Perm. Jobs (Disclosed)" value="10,000+" sub="$18M–$54M capex per job" icon={Briefcase} accent="cyan" />
          <StatCard label="Ratepayer Burden" value="$4.3B" sub="Across 7 states · IL +16% / VA +13%" icon={AlertTriangle} accent="red" />
        </div>

        {/* ═══ CAPEX RAMP + HYPERSCALER ═══ */}
        <section>
          <SysHeader label="Section 01 · Capital Deployment" title="The Spending Ramp" sub="Hyperscaler AI infrastructure spend has grown 10× in three years and shows no sign of plateauing. The 2026 pace exceeds the GDP of Switzerland. The $7T through 2030 projection would make this the largest coordinated private capital deployment in history." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* CapEx ramp */}
            <div className="dc-card dc-card-amber p-4 sm:p-5">
              <div className="sys-label mb-4">Hyperscaler Global CapEx ($B) — Trajectory</div>
              <div className="h-[240px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CAPEX_RAMP} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                    <defs>
                      <linearGradient id="capexGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`$${v}B`, "CapEx"]} />
                    <Area type="monotone" dataKey="spend" name="CapEx" stroke="#f59e0b" fill="url(#capexGrad)" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hyperscaler breakdown */}
            <div className="dc-card dc-card-amber p-4 sm:p-5">
              <div className="sys-label mb-4">2026 CapEx by Operator ($B)</div>
              <div className="h-[240px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={HYPERSCALER_CAPEX_2026} layout="vertical" margin={{ left: 0, right: 50, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `$${v}B`} />
                    <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`$${v}B`, "2026 CapEx"]} />
                    <Bar dataKey="capex" name="2026 CapEx" radius={[0, 3, 3, 0]}>
                      {HYPERSCALER_CAPEX_2026.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 dc-card p-3 mono-num text-center">
                <span className="sys-label">5-Company 2026 Total</span>
                <div className="text-2xl font-black amber-glow mt-1">$675B</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROJECT STATUS BOARD ═══ */}
        <section>
          <SysHeader label="Section 02 · Facility Status" title="Project Status Board" sub="Real-time status of major US AI data center projects. Green = operational. Amber = under construction. Grey = planned or announced." />
          <div className="dc-card overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0">
              {PROJECT_STATUS_BOARD.map((p, i) => (
                <div
                  key={i}
                  className="p-3 border-b border-r"
                  style={{ borderColor: "#1f1f1f" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Led color={p.statusColor} />
                    <span className="mono-num text-xs font-bold" style={{ color: p.statusColor }}>{p.status}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 leading-tight">{p.name}</div>
                  <div className="sys-label mt-1" style={{ fontSize: 9 }}>{p.operator} · {p.state}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="mono-num text-xs font-bold text-amber-500">{p.capex}</div>
                    {p.mw && <div className="mono-num text-xs text-cyan-500">{p.mw.toLocaleString()}MW</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 flex items-center gap-4 border-t" style={{ borderColor: "#1f1f1f", background: "#141414" }}>
              {[
                { color: "#22c55e", label: "ONLINE", cls: "led-green" },
                { color: "#f59e0b", label: "BUILDING", cls: "led-amber" },
                { color: "#94a3b8", label: "PLANNED", cls: "led-grey" },
                { color: "#475569", label: "ANNOUNCED", cls: "led-grey" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={item.cls} />
                  <span className="sys-label" style={{ fontSize: 9 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TOP PROJECTS TABLE ═══ */}
        <section>
          <SysHeader label="Section 03 · Project Registry" title="Top Projects by CapEx" sub="Largest announced AI infrastructure projects sorted by investment size. Many host counties have no prior industrial anchor at this scale." />
          <div className="dc-card overflow-hidden">
            <div className="overflow-x-auto scrollbar-dark">
              <table className="dc-table w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left">Company</th>
                    <th className="text-left">Project</th>
                    <th className="text-left">Location</th>
                    <th className="text-center">State</th>
                    <th className="text-center">Status</th>
                    <th className="text-right">CapEx</th>
                    <th className="text-right">Const. Jobs</th>
                    <th className="text-right">Perm. Jobs</th>
                    <th className="text-right">MW</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProjects.map((p, i) => (
                    <tr key={i}>
                      <td className="font-bold text-slate-200">{p.company}</td>
                      <td className="text-slate-400">{p.project}</td>
                      <td className="text-slate-500">{p.location}</td>
                      <td className="text-center">
                        <span className="mono-num text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{p.state}</span>
                      </td>
                      <td className="text-center"><StatusBadge status={p.status} /></td>
                      <td className="text-right mono-num font-bold text-amber-400">{p.capex}</td>
                      <td className="text-right mono-num text-slate-400">{p.constructionJobs}</td>
                      <td className="text-right mono-num text-slate-400">{p.permJobs}</td>
                      <td className="text-right mono-num text-cyan-500">{p.mw ? `${p.mw.toLocaleString()}` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setProjectsExpanded(!projectsExpanded)}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              style={{ color: "#f59e0b", background: "#141414", borderTop: "1px solid #1f1f1f" }}
            >
              {projectsExpanded ? <><ChevronUp size={14} /> COLLAPSE</> : <><ChevronDown size={14} /> EXPAND ALL {TOP_PROJECTS.length} PROJECTS</>}
            </button>
          </div>
        </section>

        {/* ═══ MW CAPACITY + MARKET SHARE ═══ */}
        <section>
          <SysHeader label="Section 04 · Power Infrastructure" title="Megawatt Capacity by State" sub="MW is the real unit of measure for data center investment — more meaningful than raw dollar figures. Texas is poised to become the largest US market by committed MW as the Stargate and Vantage programs come online." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="dc-card dc-card-cyan p-4 sm:p-5 lg:col-span-2">
              <div className="sys-label mb-4">Committed MW by State (Operational + Under Construction + Planned)</div>
              <div className="h-[280px] sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...MW_BY_STATE].sort((a, b) => b.mw - a.mw)} layout="vertical" margin={{ left: 10, right: 60, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `${v.toLocaleString()}MW`} />
                    <YAxis type="category" dataKey="state" width={36} tick={{ fontSize: 12, fill: "#94a3b8", fontFamily: "monospace", fontWeight: 700 }} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`${Number(v).toLocaleString()}MW`, "Capacity"]} />
                    <Bar dataKey="mw" name="MW" radius={[0, 3, 3, 0]}>
                      {MW_BY_STATE.sort((a, b) => b.mw - a.mw).map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex gap-4 flex-wrap">
                {[
                  { color: "#22c55e", label: "Operational" },
                  { color: "#f59e0b", label: "Under Construction" },
                  { color: "#94a3b8", label: "Planned" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                    <span className="sys-label">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operator category pie */}
            <div className="dc-card dc-card-amber p-4 sm:p-5">
              <div className="sys-label mb-4">Market Share by Operator Category (% of Pipeline MW)</div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={OPERATOR_CATEGORIES}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      dataKey="value"
                      nameKey="name"
                    >
                      {OPERATOR_CATEGORIES.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload as typeof OPERATOR_CATEGORIES[0];
                        return (
                          <div style={{ background: "#1a1a1a", border: "1px solid #3a3a3a", borderRadius: 4, padding: "8px 12px" }}>
                            <div style={{ color: d.color, fontWeight: 700, fontSize: 13 }}>{d.name}: {d.value}%</div>
                            <div style={{ color: "#64748b", fontSize: 10, marginTop: 2 }}>{d.examples}</div>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {OPERATOR_CATEGORIES.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c.color }} />
                      <span className="text-xs text-slate-400">{c.name}</span>
                    </div>
                    <span className="mono-num text-sm font-bold" style={{ color: c.color }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATE LEADERBOARD ═══ */}
        <section>
          <SysHeader label="Section 05 · State Rankings" title="State Leaderboard" sub="Virginia leads in operational facilities and economic maturity. Texas is projected to surpass it by 2030." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="dc-card dc-card-amber p-4 sm:p-5">
              <div className="sys-label mb-4">Operational Facilities (Top 10)</div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10)}
                    margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="state" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <Tooltip content={<DarkTooltip />} formatter={(v, name) => [String(v), String(name) === "operational" ? "Operational" : "Pipeline"]} />
                    <Bar dataKey="operational" name="Operational" stackId="a">
                      {[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10).map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#f59e0b" : i === 1 ? "#d97706" : "#92400e"} />
                      ))}
                    </Bar>
                    <Bar dataKey="pipeline" name="Pipeline" stackId="a" fill="#292524" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dc-card overflow-hidden">
              <div className="overflow-x-auto scrollbar-dark">
                <table className="dc-table w-full min-w-[400px]">
                  <thead>
                    <tr>
                      <th className="text-left">State</th>
                      <th className="text-right">Op.</th>
                      <th className="text-right">Pipeline</th>
                      <th className="text-right">GDP Impact</th>
                      <th className="text-right">Jobs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStates.map((s, i) => (
                      <tr key={i}>
                        <td>
                          <div className="mono-num font-bold text-slate-200">{s.state}</div>
                          <div className="text-slate-600" style={{ fontSize: 10 }}>{s.state_name}</div>
                        </td>
                        <td className="text-right mono-num font-bold text-amber-400">{s.operational || "—"}</td>
                        <td className="text-right mono-num text-slate-500">{s.pipeline || "—"}</td>
                        <td className="text-right mono-num text-green-400 font-bold" style={{ fontSize: 11 }}>
                          {s.gdpB ? `$${s.gdpB}B` : "—"}
                        </td>
                        <td className="text-right mono-num text-slate-400" style={{ fontSize: 11 }}>
                          {s.jobs ? s.jobs.toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setStatesExpanded(!statesExpanded)}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                style={{ color: "#f59e0b", background: "#141414", borderTop: "1px solid #1f1f1f" }}
              >
                {statesExpanded ? <><ChevronUp size={12} /> COLLAPSE</> : <><ChevronDown size={12} /> ALL {STATES_DATA.length} STATES</>}
              </button>
            </div>
          </div>
        </section>

        {/* ═══ JOBS PER $B + FISCAL RATIOS ═══ */}
        <section>
          <SysHeader label="Section 06 · Economic Analysis" title="The Jobs Math & Fiscal Returns" sub="Data centers create extraordinarily few permanent jobs per dollar invested — but generate fiscal returns that dwarf every other land-use type. The industry creates value for governments, not workers." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Jobs per $B */}
            <div className="dc-card dc-card-red p-4 sm:p-5">
              <div className="sys-label mb-1">Permanent Jobs per $1B Invested — Industry Comparison</div>
              <p className="text-xs text-slate-600 mb-4">Data centers are the most capital-intensive, lowest-jobs-per-dollar industry in the US economy. An auto plant creates 33× more permanent jobs per billion invested.</p>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={JOBS_PER_BILLION} layout="vertical" margin={{ left: 10, right: 60, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis type="category" dataKey="industry" width={120} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`${v} jobs`, "Per $1B"]} />
                    <Bar dataKey="jobsPerB" name="Jobs per $1B" radius={[0, 3, 3, 0]}>
                      {JOBS_PER_BILLION.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 dc-card p-3 flex gap-6">
                <div>
                  <div className="sys-label">Data Centers</div>
                  <div className="mono-num text-xl font-black text-red-400">28 jobs/$B</div>
                </div>
                <div>
                  <div className="sys-label">Auto Plant</div>
                  <div className="mono-num text-xl font-black text-amber-400">950 jobs/$B</div>
                </div>
                <div>
                  <div className="sys-label">Ratio</div>
                  <div className="mono-num text-xl font-black text-slate-300">34×</div>
                </div>
              </div>
            </div>

            {/* Fiscal benefit ratios */}
            <div className="dc-card dc-card-green p-4 sm:p-5">
              <div className="sys-label mb-1">Fiscal Benefit Ratio — Tax Revenue vs. Services Consumed</div>
              <p className="text-xs text-slate-600 mb-4">Dollars of property tax generated per dollar of public services consumed. Break-even = 1:1. Residential housing = 0.8:1. Data centers: off the chart.</p>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FISCAL_BENEFIT_RATIOS} layout="vertical" margin={{ left: 10, right: 60, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `${v}:1`} />
                    <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`${v}:1`, "Fiscal Ratio"]} />
                    <ReferenceLine x={1} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Break-even", position: "insideTopRight", fontSize: 9, fill: "#ef4444" }} />
                    <Bar dataKey="ratio" name="Fiscal Ratio" radius={[0, 3, 3, 0]}>
                      {FISCAL_BENEFIT_RATIOS.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 dc-card p-3 mono-num text-center">
                <div className="sys-label">Loudoun County, VA</div>
                <div className="text-2xl font-black" style={{ color: "#22c55e" }}>38%</div>
                <div className="sys-label mt-1">of county general fund from 3% of county land</div>
              </div>
            </div>
          </div>

          {/* Evidence cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Virginia Statewide", val: "74,000 Jobs", sub: "$9.1B GDP · $1.64B local taxes/yr · 1:3.5 multiplier", color: "#22c55e" },
              { label: "Arizona", val: "$25B GDP", sub: "$863M combined annual tax revenue (2023 data)", color: "#f59e0b" },
              { label: "Brookings 2026", val: "+22% Info Sector", sub: "+4–5% private employment in host counties vs controls", color: "#06b6d4" },
              { label: "Project Steamboat, GA", val: "1,666×", sub: "$12K/yr parcel → $200M in 10-yr property tax", color: "#a78bfa" },
            ].map((c) => (
              <div key={c.label} className="dc-card p-4" style={{ borderTop: `2px solid ${c.color}` }}>
                <div className="sys-label mb-1">{c.label}</div>
                <div className="mono-num text-xl font-black" style={{ color: c.color }}>{c.val}</div>
                <div className="text-xs text-slate-500 mt-1 leading-tight">{c.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ ENERGY / GRID ═══ */}
        <section>
          <SysHeader label="Section 07 · Grid Stress" title="Energy Demand & Power Costs" sub="Data centers are responsible for 60% of all US electrical load growth through 2030. The grid was not designed for this pace of demand. The cost is being socialized to residential ratepayers who never voted on it." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="dc-card dc-card-amber p-4 sm:p-5">
              <div className="sys-label mb-4">DC Share of US Electricity (%)</div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DC_ELECTRICITY_SHARE} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                    <defs>
                      <linearGradient id="elecGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`${v}%`, "DC Share"]} />
                    <Area type="monotone" dataKey="share" name="DC Share" stroke="#f59e0b" fill="url(#elecGrad)" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dc-card dc-card-red p-4 sm:p-5">
              <div className="sys-label mb-4">US Avg Electricity Price (¢/kWh)</div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ELECTRICITY_PRICE_DATA} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `${v}¢`} domain={[10, 30]} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`${v}¢/kWh`, "Avg Price"]} />
                    <Line type="monotone" dataKey="cents" name="Price (¢/kWh)" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ratepayer YoY */}
            <div className="dc-card dc-card-red p-4 sm:p-5">
              <div className="sys-label mb-2">Residential Bill Increase YoY — DC-Heavy States</div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RATEPAYER_STATE_YOY} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="state" tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b", fontFamily: "monospace" }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<DarkTooltip />} formatter={(v) => [`+${v}%`, "YoY Increase"]} />
                    <Bar dataKey="pct" name="YoY %" radius={[3, 3, 0, 0]}>
                      {RATEPAYER_STATE_YOY.map((e, i) => <Cell key={i} fill={e.state === "US Avg" ? "#475569" : "#ef4444"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Ratepayer burden (7 states)", val: "$4.3B", color: "#ef4444" },
                  { label: "Ohio households by 2028", val: "+$70/mo", color: "#ef4444" },
                  { label: "PJM auction YoY jump", val: "+568%", color: "#ef4444" },
                  { label: "Virginia 5-yr price rise", val: "+267%", color: "#f59e0b" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="sys-label">{item.label}</span>
                    <span className="mono-num text-sm font-black" style={{ color: item.color }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid stats row */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Share of US Load Growth by 2030", value: "60%", color: "#f59e0b", icon: Zap },
              { label: "Daily DC Water Use (2021)", value: "449M gal", color: "#06b6d4", icon: Droplets },
              { label: "Projected 2028 Annual Water", value: "32B gal", color: "#06b6d4", icon: ThermometerSun },
              { label: "Projects Blocked by Community", value: "$64B+", color: "#ef4444", icon: AlertTriangle },
            ].map((item) => (
              <div key={item.label} className="dc-card p-4" style={{ borderTop: `2px solid ${item.color}` }}>
                <item.icon size={16} color={item.color} className="mb-2" />
                <div className="mono-num text-xl sm:text-2xl font-black" style={{ color: item.color }}>{item.value}</div>
                <div className="sys-label mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ REGULATORY RESPONSES ═══ */}
        <section>
          <SysHeader label="Section 08 · Regulatory Pushback" title="States Strike Back" sub="Where regulators have acted, residential bill impacts are being mitigated. Where they haven't, ratepayers subsidize hyperscaler grid connections." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                state: "Virginia — GS5 Rate Class",
                date: "Nov 2025 · Effective Jan 2027",
                rule: "DCs ≥25MW must pay min 85% of distribution/transmission + 60% of generation costs.",
                impact: "Est. residential savings: $5.52/mo",
                color: "#22c55e",
              },
              {
                state: "Ohio — 85% Min-Pay Rule",
                date: "Approved 2025",
                rule: "DCs must pay 85% of contracted electricity capacity even when unused.",
                impact: "DC demand dropped from 30GW → 13GW overnight",
                color: "#22c55e",
              },
              {
                state: "Mississippi — Cost Recovery",
                date: "Special Legislation",
                rule: "AWS must cover all incremental power infrastructure costs. No ratepayer pass-through.",
                impact: "Entergy: $300M grid upgrade, zero cost to customers",
                color: "#22c55e",
              },
            ].map((r) => (
              <div key={r.state} className="dc-card dc-card-green p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="led-green" />
                  <span className="mono-num text-xs font-bold text-green-400">{r.state}</span>
                </div>
                <div className="sys-label mb-2">{r.date}</div>
                <div className="text-xs text-slate-400 leading-relaxed mb-2">{r.rule}</div>
                <div className="text-xs font-bold text-green-400 mono-num">{r.impact}</div>
              </div>
            ))}
          </div>

          {/* Governance red flags */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "VA Municipalities w/ NDAs", val: "80%", sub: "Block public project information", color: "#f59e0b" },
              { label: "Abilene Tax Abatement", val: "85%", sub: "10-year property tax, min 400 jobs", color: "#f59e0b" },
              { label: "Blocked by Communities", val: "$64B+", sub: "Water / energy / noise opposition", color: "#ef4444" },
              { label: "OH Standard Abatement", val: "75–100%", sub: "15-yr exemption for $100M+ projects", color: "#f59e0b" },
              { label: "xAI Memphis Colossus", val: "⚠ EJ", sub: "Gas turbines near Black communities", color: "#ef4444" },
            ].map((item) => (
              <div key={item.label} className="dc-card p-3">
                <div className="sys-label mb-1">{item.label}</div>
                <div className="mono-num text-lg font-black" style={{ color: item.color }}>{item.val}</div>
                <div className="text-slate-600 mt-1" style={{ fontSize: 10 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOST COUNTIES ═══ */}
        <section>
          <SysHeader label="Section 09 · Community Impact" title="Host County Profiles" sub="The counties receiving the biggest investments are often the ones with the fewest economic alternatives. The counterfactual matters." />
          <div className="dc-card overflow-hidden">
            <div className="overflow-x-auto scrollbar-dark">
              <table className="dc-table w-full min-w-[700px]">
                <thead>
                  <tr>
                    <th className="text-left">County</th>
                    <th className="text-left">Anchor Project</th>
                    <th className="text-right">Investment</th>
                    <th className="text-right">Per Capita Income</th>
                    <th className="text-right">Poverty Rate</th>
                    <th className="text-right">Child Poverty</th>
                    <th className="text-right">Pop. Trend</th>
                    <th className="text-center">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {HOST_COUNTIES.map((c, i) => (
                    <tr key={i}>
                      <td className="font-bold text-slate-200">{c.county}</td>
                      <td className="text-slate-400">{c.anchor}</td>
                      <td className="text-right mono-num font-bold text-amber-400">{c.investment}</td>
                      <td className="text-right mono-num text-slate-400">{c.perCapitaIncome}</td>
                      <td className="text-right mono-num font-bold text-red-400">{c.povertyRate}</td>
                      <td className="text-right mono-num font-bold text-red-500">{c.childPoverty}</td>
                      <td className="text-right mono-num text-slate-500">{c.popChange}</td>
                      <td className="text-center">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded mono-num ${
                          c.verdict === "Transformative" ? "text-green-400 bg-green-900/30 border border-green-800" :
                          c.verdict === "Positive" ? "text-cyan-400 bg-cyan-900/30 border border-cyan-800" :
                          "text-amber-400 bg-amber-900/30 border border-amber-800"
                        }`}>{c.verdict}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 dc-card p-4 sm:p-5" style={{ borderLeft: "3px solid #f59e0b" }}>
            <div className="sys-label mb-2">Richland Parish, Louisiana — The Defining Case</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Meta&apos;s $27B Hyperion campus lands in a parish where <span className="text-red-400 font-bold">37% of children live in poverty</span>, per capita income
              is <span className="text-amber-400 font-bold mono-num">$42,298</span>, and the population has shrunk <span className="text-red-400 font-bold">6% since 2010</span>.
              Meta wages run <span className="text-green-400 font-bold">150% above state average</span> (~$80K vs $42K). Parish receives
              <span className="text-amber-400 font-bold"> $300M</span> in direct infrastructure investment. The counterfactual
              isn&apos;t a better industrial project — it&apos;s continued agricultural decline and school funding cuts.
            </p>
          </div>
        </section>

        {/* ═══ NET VERDICT ═══ */}
        <section>
          <SysHeader label="Section 10 · Net Assessment" title="The Verdict" sub="Is hosting a data center net positive for a rural US community? The evidence is conditional — but leans strongly positive, provided the community doesn't give away the fiscal store." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="dc-card dc-card-green p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} color="#22c55e" />
                <div className="sys-label text-green-500">Net Positive Evidence</div>
              </div>
              <ul className="space-y-2">
                {[
                  "Loudoun Co: 38% of general fund on 3% of land (26:1 fiscal ratio)",
                  "Virginia statewide: 74K jobs, $9.1B GDP, $1.64B local taxes, 1:3.5 multiplier",
                  "Arizona: $25B GDP, $863M combined annual tax revenue",
                  "Brookings (peer-reviewed): +4–5% private employment, +22% information sector",
                  "Richland Parish: $27B vs $42K per capita income / 24% poverty / -6% pop",
                  "Project Steamboat: $12K/yr idle parcel → $200M in 10-year property tax",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-green-400 font-bold mt-0.5 shrink-0 mono-num">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="dc-card dc-card-red p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} color="#ef4444" />
                <div className="sys-label text-red-500">Risk Factors</div>
              </div>
              <ul className="space-y-2">
                {[
                  "Permanent jobs: 50–500 per facility — tiny relative to capex",
                  "Capex per permanent job: $18M–$54M — highest of any US industry",
                  "$4.3B ratepayer burden in 7 states — costs socialized, benefit private",
                  "Communities sometimes absorb grid/water costs with no tax yield",
                  "80% of VA municipalities operate under NDAs blocking accountability",
                  "xAI Memphis: gas turbines adjacent to Black communities — canonical EJ failure",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-red-400 font-bold mt-0.5 shrink-0 mono-num">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 dc-card p-5 sm:p-7" style={{ borderLeft: "4px solid #f59e0b", background: "#141414" }}>
            <div className="sys-label text-amber-600 mb-3">THESIS STATEMENT</div>
            <blockquote className="text-sm sm:text-base font-bold leading-relaxed text-slate-200 mono-num">
              &ldquo;Data centers are the highest-yielding land-conversion event in modern American local fiscal history —
              for counties that would otherwise have no anchor industrial investment. The criticism has legitimate teeth
              on (1) ratepayer cost-shifting where regulators haven&apos;t acted and (2) environmental siting failures.
              But the alternative for most host counties is not a better industrial project — it&apos;s nothing.&rdquo;
            </blockquote>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-5" style={{ borderColor: "#2a2a2a" }}>
              {[
                {
                  label: "// NET_POSITIVE_WHEN",
                  color: "#22c55e",
                  items: ["Fair tax structure (not 100% abated)", "Utility regulator blocks ratepayer cost-shift", "Water/environmental constraints respected"],
                },
                {
                  label: "// NET_NEGATIVE_WHEN",
                  color: "#ef4444",
                  items: ["Full abatement + grid costs socialized", "Sited without EJ or water impact analysis", "NDA blocks community oversight entirely"],
                },
                {
                  label: "// FALSIFIABLE_IF",
                  color: "#94a3b8",
                  items: ["Peer-reviewed studies show net fiscal loss post-abatement", "Brookings shows population decline increasing vs controls", "Ratepayer burden becomes pervasive + unmitigated"],
                },
              ].map((col) => (
                <div key={col.label}>
                  <div className="mono-num text-xs font-bold mb-2" style={{ color: col.color }}>{col.label}</div>
                  <ul className="space-y-1">
                    {col.items.map((item, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <span className="shrink-0 mt-0.5" style={{ color: "#2a2a2a" }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DATA NOTE ═══ */}
        <section>
          <div className="dc-card p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <Server size={13} color="#475569" />
              <span className="sys-label">Data Sources & Methodology</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All figures are based on publicly disclosed announcements, state economic development filings, company press releases,
              JLARC 2024, Brookings 2026, UCS 2024, and local municipal records as of June 2026. Many projects have not yet disclosed
              final MW capacity, water agreements, or full employment commitments. The largest research gaps include Digital Realty,
              Equinix, CyrusOne, Aligned, Switch, Compass, CloudHQ, STACK, Iron Mountain, and numerous secondary hyperscaler campuses.
              Total identified capex: ~$290B+ (directly identified, publicly disclosed). Hyperscaler 2026 CapEx figures represent global programs with significant US concentration.
            </p>
          </div>
        </section>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid #1f1f1f", background: "#0a0a0a" }} className="py-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="led-amber" />
            <span className="mono-num text-xs text-amber-500 font-bold uppercase tracking-widest">US AI Infrastructure Tracker</span>
          </div>
          <div className="text-sm text-slate-500">
            Built by{" "}
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
              t@nyvp.com
            </a>
          </div>
          <div className="mono-num text-xs text-slate-600 mt-2">
            DATA AS OF JUNE 2026 · SOURCES: JLARC 2024 · BROOKINGS 2026 · UCS 2024 · STATE EDA FILINGS · COMPANY DISCLOSURES
          </div>
        </div>
      </footer>
    </main>
  );
}
