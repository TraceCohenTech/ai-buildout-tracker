"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
  Cell, ReferenceLine, PieChart, Pie,
} from "recharts";
import {
  DollarSign, Briefcase, Building2,
  TrendingUp, ChevronDown, ChevronUp,
  Server, Radio, Cpu, Atom, HardDrive,
} from "lucide-react";
import {
  HYPERSCALER_CAPEX_2026, CAPEX_RAMP, TOP_PROJECTS,
  STATES_DATA, MW_BY_STATE, METRO_MARKETS, REGIONAL_PIPELINE,
  JOBS_PER_BILLION, PROJECT_STATUS_BOARD,
  FISCAL_BENEFIT_RATIOS, HOST_COUNTIES, NUCLEAR_DC_PAIRINGS,
  GAS_PLANT_BUILDOUTS, TICKER_ITEMS,
  CONSTRUCTION_VS_PERM_JOBS, PERM_JOBS_BY_ROLE, WAGE_VS_LOCAL_MEDIAN,
  JOBS_TIMELINE, LOCAL_HIRING_DATA,
  COMMUNITY_STORIES, WORKFORCE_PIPELINE,
} from "@/lib/data";

/* ─── Shared tooltip ─── */
const ChartTip = ({ active, payload, label, fmt }: {
  active?: boolean;
  payload?: { name?: string; value?: unknown; color?: string }[];
  label?: string;
  fmt?: (v: unknown, name?: string) => string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg shadow-xl border text-sm" style={{ background: "#fff", borderColor: "#e2e8f0", padding: "10px 14px", minWidth: 140 }}>
      {label && <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#0f172a" }} className="font-bold">
          {p.name && <span className="text-slate-500 font-normal">{p.name}: </span>}
          {fmt ? fmt(p.value, p.name) : String(p.value ?? "")}
        </div>
      ))}
    </div>
  );
};

/* ─── Status badge ─── */
function Badge({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s.includes("construction") || s.includes("building")) return <span className="badge-construction">{status}</span>;
  if (s.includes("planned")) return <span className="badge-planned">{status}</span>;
  if (s.includes("operational") || s.includes("online")) return <span className="badge-operational">{status}</span>;
  if (s.includes("announced")) return <span className="badge-announced">{status}</span>;
  if (s.includes("approved")) return <span className="badge-approved">{status}</span>;
  return <span className="badge-mixed">{status}</span>;
}

/* ─── LED ─── */
function Led({ color }: { color: string }) {
  return <span className={color === "#22c55e" ? "led-green" : color === "#f59e0b" ? "led-amber" : color === "#ef4444" ? "led-red" : "led-grey"} />;
}

/* ─── Light card section header ─── */
function SH({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="lc-label">{n}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{title}</h2>
      {sub && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-3xl">{sub}</p>}
    </div>
  );
}

/* ─── Light stat card ─── */
function LStat({ label, value, sub, icon: Icon, accent = "amber" }: {
  label: string; value: string; sub?: string; icon: React.ElementType; accent?: string;
}) {
  const map: Record<string, { bar: string; icon: string; val: string }> = {
    amber: { bar: "lc-card-amber", icon: "text-amber-500", val: "text-amber-600" },
    red:   { bar: "lc-card-red",   icon: "text-red-500",   val: "text-red-600" },
    green: { bar: "lc-card-green", icon: "text-green-600", val: "text-green-700" },
    blue:  { bar: "lc-card-blue",  icon: "text-blue-600",  val: "text-blue-700" },
  };
  const t = map[accent] ?? map.amber;
  return (
    <div className={`lc-card ${t.bar} p-4 sm:p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="lc-label">{label}</div>
        <Icon size={16} className={t.icon} />
      </div>
      <div className={`mono text-2xl sm:text-3xl font-black ${t.val}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-2 leading-snug">{sub}</div>}
    </div>
  );
}

/* ─── Evidence chip ─── */
function EvidenceChip({ title, val, sub, color }: { title: string; val: string; sub: string; color: string }) {
  return (
    <div className="lc-card p-4 hover:shadow-md transition-shadow" style={{ borderTop: `3px solid ${color}` }}>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{title}</div>
      <div className="mono text-xl font-black" style={{ color }}>{val}</div>
      <div className="text-xs text-slate-500 mt-1 leading-snug">{sub}</div>
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
    <main className="min-h-screen">

      {/* ══ TOP STATUS BAR (dark) ══ */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3 py-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="led-green" />
            <span className="mono text-green-400 text-xs font-bold">SYS ONLINE</span>
          </div>
          <span className="text-slate-700 text-xs">|</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <Radio size={11} className="text-amber-500" />
            <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">LIVE</span>
          </div>
          <span className="text-slate-700 text-xs">|</span>
          <div className="mono text-slate-600 text-xs hidden sm:block">JUNE 2026 · US AI INFRASTRUCTURE COMMAND</div>
        </div>
      </div>

      {/* ══ TICKER (dark) ══ */}
      <div style={{ background: "#111", borderBottom: "1px solid #222", overflow: "hidden" }}>
        <div className="ticker-track py-2">
          {tickerDouble.map((item, i) => (
            <span key={i} className="mono text-xs text-slate-400 px-8 shrink-0 whitespace-nowrap">
              <span className="text-amber-500 mr-2">▶</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERO (dark industrial) ══ */}
      <div className="bg-grid" style={{ background: "linear-gradient(180deg, #161616 0%, #111 100%)", borderBottom: "1px solid #222" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-5">
            <Cpu size={18} className="text-amber-500" />
            <span className="sys-label">US AI INFRASTRUCTURE · MASTER COMMAND</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-none tracking-tight text-slate-100">AI BUILDOUT</h1>
          <h1 className="text-4xl sm:text-6xl font-black leading-none tracking-tight amber-glow mb-5">TRACKER</h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-8 leading-relaxed">
            $500B+ in tracked US data center investment is rewiring rural America — flooding depopulating counties with
            construction crews, overloading the electrical grid, and reshaping local fiscal policy in ways that will last decades.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {[
              { label: "Tracked US CapEx", value: "$500B+", color: "#f59e0b" },
              { label: "Hyperscaler CapEx 2026", value: "$760B", color: "#f59e0b" },
              { label: "Stargate Total", value: "$500B", color: "#ef4444" },
              { label: "US Facilities (Mar 2026)", value: "4,011", color: "#22c55e" },
              { label: "US Grid Capacity", value: "50+ GW", color: "#06b6d4" },
              { label: "New Grid Additions 2026", value: "86 GW", color: "#ef4444" },
            ].map((s) => (
              <div key={s.label} className="dc-card p-3 sm:p-4" style={{ borderTop: `2px solid ${s.color}` }}>
                <div className="mono text-xl sm:text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="sys-label mt-1" style={{ fontSize: 9 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          LIGHT CONTENT SECTIONS
      ══════════════════════════════════ */}
      <div style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LStat label="Near-Term Pipeline" value="65" sub="Projects — $92.1B breaking ground" icon={Building2} accent="amber" />
            <LStat label="YTD CapEx (Apr 2026)" value="$49.5B" sub="74 projects broke ground in 2026" icon={DollarSign} accent="green" />
            <LStat label="Perm. Jobs (Disclosed)" value="10,000+" sub="$18M–$54M capex per permanent job" icon={Briefcase} accent="blue" />
            <LStat label="Best Fiscal Ratio" value="26:1" sub="Loudoun Co., VA — $1 of services, $26 in tax. Residential = 0.8:1" icon={TrendingUp} accent="green" />
          </div>

          {/* ── Section 1: Capital Deployment ── */}
          <section>
            <SH n="01 · Capital Deployment" title="The Spending Ramp"
              sub="Hyperscaler AI infrastructure spend has grown nearly 10× in three years. The 2026 pace of $760B — Amazon $200B, Microsoft $190B, Google $185B, Meta $135B, Oracle $50B — exceeds the combined GDP of Switzerland and Argentina. The $7T through-2030 projection would make this the largest coordinated private capital deployment in history." />

            {/* Breaking: Alphabet $80B raise */}
            <div className="lc-card mb-5 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100" style={{ background: "#fffbeb" }}>
                <span className="text-xs font-black text-amber-700 bg-amber-200 px-2 py-0.5 rounded tracking-wide uppercase">Breaking · June 1, 2026</span>
                <span className="text-xs font-bold text-slate-700">Alphabet Announces $80B Equity Capital Raise to Expand AI Infrastructure</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
                {[
                  { label: "Equity Raise", val: "$80B", sub: "$30B public offering + $40B ATM program" },
                  { label: "Berkshire Hathaway", val: "$10B", sub: "Private placement — Buffett backs AI buildout" },
                  { label: "Google 2026 CapEx", val: "$180–190B", sub: "Up from $91B in 2025 — 2× YoY" },
                  { label: "Google Cloud Backlog", val: "$460B+", sub: "+63% revenue YoY; backlog nearly doubled QoQ" },
                ].map((x) => (
                  <div key={x.label} className="px-5 py-4">
                    <div className="lc-label mb-1">{x.label}</div>
                    <div className="mono text-xl font-black text-amber-600">{x.val}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-snug">{x.sub}</div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">Alphabet cited demand for AI solutions &ldquo;currently outstripping available compute supply&rdquo; as the primary rationale. 2027 CapEx expected to increase significantly beyond 2026 levels. Berkshire investment at $351.81/share (Class A) and $348.20/share (Class C).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="lc-card lc-card-amber p-5">
                <div className="text-xs font-bold text-slate-500 mb-3">Global Hyperscaler CapEx Trajectory ($B)</div>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CAPEX_RAMP} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                      <defs>
                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `$${v}B`} />
                      <Tooltip content={<ChartTip fmt={(v) => `$${v}B`} />} />
                      <Area type="monotone" dataKey="spend" name="CapEx" stroke="#f59e0b" fill="url(#cg)" strokeWidth={2.5} dot={{ fill: "#f59e0b", r: 4, strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lc-card lc-card-amber p-5">
                <div className="text-xs font-bold text-slate-500 mb-3">2026 CapEx by Hyperscaler ($B)</div>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HYPERSCALER_CAPEX_2026} layout="vertical" margin={{ left: 0, right: 55, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `$${v}B`} />
                      <YAxis type="category" dataKey="name" width={145} tick={{ fontSize: 11, fill: "#475569" }} />
                      <Tooltip content={<ChartTip fmt={(v) => `$${v}B`} />} />
                      <Bar dataKey="capex" name="2026 CapEx" radius={[0, 4, 4, 0]}>
                        {HYPERSCALER_CAPEX_2026.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">Combined 2026 Total</span>
                  <span className="mono text-xl font-black text-amber-600">$690B</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 2: Project Status Board (stays dark for impact) ── */}
          <section>
            <SH n="02 · Facility Status" title="Project Status Board"
              sub="Real-time status of major US AI data center projects by construction stage. Green = operational. Amber = under construction. Grey = planned or announced." />
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" style={{ background: "#111" }}>
                {PROJECT_STATUS_BOARD.map((p, i) => (
                  <div key={i} className="p-3 border-b border-r hover:bg-white/5 transition-colors cursor-default" style={{ borderColor: "#1f1f1f" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Led color={p.statusColor} />
                      <span className="mono text-xs font-bold" style={{ color: p.statusColor }}>{p.status}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200 leading-tight">{p.name}</div>
                    <div className="text-slate-500 mt-0.5" style={{ fontSize: 9, letterSpacing: "0.05em" }}>{p.operator} · {p.state}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="mono text-xs font-bold text-amber-400">{p.capex}</span>
                      {p.mw && <span className="mono text-xs text-cyan-400">{p.mw.toLocaleString()}MW</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5 px-4 py-3 bg-slate-50 border-t border-slate-200">
                {[
                  { cls: "led-green", label: "Online" },
                  { cls: "led-amber", label: "Building" },
                  { cls: "led-grey",  label: "Planned / Announced" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className={l.cls} />
                    <span className="text-xs text-slate-500 font-medium">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 3: Projects Table ── */}
          <section>
            <SH n="03 · Project Registry" title="Top Projects by CapEx"
              sub="The largest announced AI data center investments in the United States. Many host counties have never seen a private investment exceeding $100M — these numbers are measured in billions." />
            <div className="lc-card overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="lt-table min-w-[860px]">
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
                      <th className="text-right">Capacity</th>
                      <th className="text-right">10-Yr Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProjects.map((p, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-slate-900">{p.company}</td>
                        <td className="text-slate-700">{p.project}</td>
                        <td className="text-slate-500">{p.location}</td>
                        <td className="text-center">
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded mono">{p.state}</span>
                        </td>
                        <td className="text-center"><Badge status={p.status} /></td>
                        <td className="text-right mono font-bold text-slate-900">{p.capex}</td>
                        <td className="text-right mono text-slate-500">{p.constructionJobs}</td>
                        <td className="text-right mono text-slate-500">{p.permJobs}</td>
                        <td className="text-right mono text-blue-600">{p.mw ? `${p.mw.toLocaleString()}MW` : "—"}</td>
                        <td className="text-right mono text-green-600 font-semibold">
                          {p.tenYrImpact ? `$${(p.tenYrImpact / 1e9).toFixed(1)}B` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="w-full py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-amber-700 bg-amber-50 hover:bg-amber-100 border-t border-slate-200 transition-colors"
              >
                {projectsExpanded ? <><ChevronUp size={13} /> Show Less</> : <><ChevronDown size={13} /> Show All {TOP_PROJECTS.length} Projects</>}
              </button>
            </div>
          </section>

          {/* ── Section 4: Power Infrastructure ── */}
          <section>
            <SH n="04 · Power Infrastructure" title="Megawatt Capacity by State & Market"
              sub="MW is the real unit of data center investment. Texas is on track to become the largest US market by committed megawatts — driven by Stargate (1,200MW), Vantage Frontier (1,400MW), and Meta's El Paso and Fort Worth campuses." />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lc-card lc-card-blue p-5 lg:col-span-2 flex flex-col">
                <div className="text-xs font-bold text-slate-500 mb-3">Committed MW by State (All Stages)</div>
                <div className="flex-1 min-h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...MW_BY_STATE].sort((a, b) => b.mw - a.mw)} layout="vertical" margin={{ left: 8, right: 60, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v.toLocaleString()}MW`} />
                      <YAxis type="category" dataKey="state" width={34} tick={{ fontSize: 12, fill: "#475569", fontWeight: 700 }} />
                      <Tooltip content={<ChartTip fmt={(v) => `${Number(v).toLocaleString()} MW`} />} />
                      <Bar dataKey="mw" name="Capacity" radius={[0, 4, 4, 0]}>
                        {[...MW_BY_STATE].sort((a, b) => b.mw - a.mw).map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex gap-4">
                  {[{ color: "#22c55e", l: "Operational" }, { color: "#f59e0b", l: "Under Construction" }, { color: "#94a3b8", l: "Planned" }].map((l) => (
                    <div key={l.l} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                      <span className="text-xs text-slate-500">{l.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                {/* Metro markets */}
                <div className="lc-card lc-card-amber p-5">
                  <div className="text-xs font-bold text-slate-500 mb-3">Top Metro Markets — Operational MW</div>
                  <div className="space-y-2">
                    {METRO_MARKETS.map((m, i) => (
                      <div key={m.metro}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-700">{m.metro}</span>
                          <span className="mono text-xs font-bold text-slate-900">{m.mw.toLocaleString()} MW</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(m.mw / METRO_MARKETS[0].mw) * 100}%`,
                              background: i === 0 ? "#f59e0b" : i === 1 ? "#ef4444" : i === 2 ? "#3b82f6" : i === 3 ? "#22c55e" : "#8b5cf6"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">Source: NVTC, JLL, CBRE 2026 market reports</div>
                  </div>
                </div>
                {/* Regional pipeline split */}
                <div className="lc-card lc-card-green p-5">
                  <div className="text-xs font-bold text-slate-500 mb-3">Regional Share of 2026 Pipeline Spending</div>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={REGIONAL_PIPELINE} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="pct" nameKey="region">
                          {REGIONAL_PIPELINE.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0].payload as typeof REGIONAL_PIPELINE[0];
                            return (
                              <div className="rounded-lg shadow-lg border text-sm" style={{ background: "#fff", borderColor: "#e2e8f0", padding: "8px 12px" }}>
                                <div style={{ color: d.color }} className="font-bold">{d.region}: {d.pct}%</div>
                              </div>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {REGIONAL_PIPELINE.map((r) => (
                      <div key={r.region} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: r.color }} />
                        <span className="text-xs text-slate-600">{r.region}: <strong>{r.pct}%</strong></span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">Source: ConstructConnect, June 2026</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 5: State Leaderboard ── */}
          <section>
            <SH n="05 · State Rankings" title="State Leaderboard"
              sub="Virginia leads in operational facility count and economic maturity. Texas leads in planned MW. Arizona has the highest documented GDP return ($25B) from a smaller base." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="lc-card lc-card-amber p-5 flex flex-col">
                <div className="text-xs font-bold text-slate-500 mb-3">Operational Facilities (Top 10 States)</div>
                <div className="flex-1 min-h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10)}
                      margin={{ left: 0, right: 20, top: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="state" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <Tooltip content={<ChartTip fmt={(v, n) => `${v} ${n === "Operational" ? "facilities" : "pipeline"}`} />} />
                      <Bar dataKey="operational" name="Operational" stackId="a">
                        {[...STATES_DATA].filter(s => s.operational > 0).sort((a, b) => b.operational - a.operational).slice(0, 10).map((_, i) => (
                          <Cell key={i} fill={i === 0 ? "#f59e0b" : i === 1 ? "#d97706" : "#fbbf24"} />
                        ))}
                      </Bar>
                      <Bar dataKey="pipeline" name="Pipeline" stackId="a" fill="#e2e8f0" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lc-card overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="lt-table min-w-[400px]">
                    <thead>
                      <tr>
                        <th className="text-left">State</th>
                        <th className="text-right">Op.</th>
                        <th className="text-right">Pipeline</th>
                        <th className="text-right">GDP</th>
                        <th className="text-right">Jobs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedStates.map((s, i) => (
                        <tr key={i}>
                          <td>
                            <div className="font-bold text-slate-900 mono">{s.state}</div>
                            <div className="text-slate-400" style={{ fontSize: 10 }}>{s.state_name}</div>
                          </td>
                          <td className="text-right mono font-bold text-amber-600">{s.operational || "—"}</td>
                          <td className="text-right mono text-slate-500">{s.pipeline || "—"}</td>
                          <td className="text-right mono font-semibold text-green-600" style={{ fontSize: 11 }}>
                            {s.gdpB ? `$${s.gdpB}B` : "—"}
                          </td>
                          <td className="text-right mono text-slate-600" style={{ fontSize: 11 }}>
                            {s.jobs ? s.jobs.toLocaleString() : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => setStatesExpanded(!statesExpanded)}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 text-amber-700 bg-amber-50 hover:bg-amber-100 border-t border-slate-200 transition-colors"
                >
                  {statesExpanded ? <><ChevronUp size={12} /> Show Less</> : <><ChevronDown size={12} /> All {STATES_DATA.length} States</>}
                </button>
              </div>
            </div>
          </section>

          {/* ── Section 6: Jobs Deep Dive ── */}
          <section>
            <SH n="06 · Jobs Deep Dive" title="Who Gets Hired, For How Long, and What They're Paid"
              sub="The construction boom is real and well-compensated — but temporary. Permanent staffing is thin relative to capex. The communities that win are those that secured training pipelines, union agreements, and local hiring commitments before groundbreaking." />

            {/* Row 1: headline benchmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              {[
                { label: "Construction workers per 100MW", val: "850", sub: "Hamm Institute 2025", color: "#f59e0b" },
                { label: "Avg construction compensation", val: "$140K/yr", sub: "$70/hr including benefits", color: "#f59e0b" },
                { label: "Typical build duration", val: "18–36 mo", sub: "Per phase, per building", color: "#475569" },
                { label: "Cumul. construction jobs through 2030", val: "4.7M", sub: "All planned US projects", color: "#22c55e" },
                { label: "Permanent ops jobs by 2030", val: "697K", sub: "Projected industry-wide", color: "#3b82f6" },
                { label: "Perm. jobs per $1B invested", val: "28", sub: "vs 950 for an auto plant (34×)", color: "#ef4444" },
              ].map((x) => (
                <div key={x.label} className="lc-card p-3 sm:p-4 text-center hover:shadow-md transition-shadow" style={{ borderTop: `3px solid ${x.color}` }}>
                  <div className="mono text-xl sm:text-2xl font-black" style={{ color: x.color }}>{x.val}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1.5 leading-tight">{x.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{x.sub}</div>
                </div>
              ))}
            </div>

            {/* Row 2: Construction vs Perm + Role breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <div className="lc-card lc-card-amber p-5">
                <div className="text-xs font-bold text-slate-500 mb-1">Construction vs. Permanent Jobs by Project</div>
                <p className="text-xs text-slate-400 mb-3">The gap between the construction peak and permanent headcount is the defining feature of this investment class. Stargate Abilene: 6,000 build → 357 stay.</p>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CONSTRUCTION_VS_PERM_JOBS} layout="vertical" margin={{ left: 8, right: 60, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                      <YAxis type="category" dataKey="project" width={160} tick={{ fontSize: 9, fill: "#475569" }} />
                      <Tooltip content={<ChartTip fmt={(v, n) => `${Number(v).toLocaleString()} ${n === "construction" ? "construction" : "permanent"} jobs`} />} />
                      <Bar dataKey="construction" name="construction" fill="#f59e0b" radius={[0, 3, 3, 0]} />
                      <Bar dataKey="permanent" name="permanent" fill="#22c55e" radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400" /><span className="text-xs text-slate-500">Construction (peak)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500" /><span className="text-xs text-slate-500">Permanent</span></div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Permanent jobs by role */}
                <div className="lc-card lc-card-blue p-5">
                  <div className="text-xs font-bold text-slate-500 mb-3">Permanent Job Mix — By Role Category</div>
                  <div className="space-y-2">
                    {PERM_JOBS_BY_ROLE.map((r) => (
                      <div key={r.role}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-700">{r.role}</span>
                          <span className="mono text-xs font-bold text-slate-900">{r.pct}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="text-xs text-blue-800 leading-snug">The largest permanent role category is facilities/ops — requiring technical training but not a 4-year degree. This is the realistic pathway for local workforce investment.</div>
                  </div>
                </div>

                {/* Industry comparison */}
                <div className="lc-card lc-card-red p-5">
                  <div className="text-xs font-bold text-slate-500 mb-3">Permanent Jobs per $1B — Industry Comparison</div>
                  <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={JOBS_PER_BILLION} layout="vertical" margin={{ left: 8, right: 55, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                        <YAxis type="category" dataKey="industry" width={115} tick={{ fontSize: 9, fill: "#475569" }} />
                        <Tooltip content={<ChartTip fmt={(v) => `${v} jobs per $1B`} />} />
                        <Bar dataKey="jobs" name="Jobs per $1B" radius={[0, 3, 3, 0]}>
                          {JOBS_PER_BILLION.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Wage premium + job timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <div className="lc-card lc-card-green p-5 flex flex-col">
                <div className="text-xs font-bold text-slate-500 mb-1">DC Wages vs. Local Median Annual Income ($K)</div>
                <p className="text-xs text-slate-400 mb-3">Data center jobs pay well above county medians — especially in economically distressed host counties where alternatives are limited.</p>
                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WAGE_VS_LOCAL_MEDIAN} layout="vertical" margin={{ left: 8, right: 55, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `$${v}K`} />
                      <YAxis type="category" dataKey="county" width={115} tick={{ fontSize: 9, fill: "#475569" }} />
                      <Tooltip content={<ChartTip fmt={(v, n) => `$${v}K — ${n === "dcWage" ? "DC job" : "local median"}`} />} />
                      <Bar dataKey="localMedian" name="localMedian" fill="#e2e8f0" radius={[0, 2, 2, 0]} />
                      <Bar dataKey="dcWage" name="dcWage" fill="#22c55e" radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500" /><span className="text-xs text-slate-500">DC job wage</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-slate-200" /><span className="text-xs text-slate-500">Local median income</span></div>
                </div>
              </div>

              {/* Job lifecycle */}
              <div className="lc-card lc-card-amber p-5">
                <div className="text-xs font-bold text-slate-500 mb-3">Typical Employment Lifecycle — 1GW Campus</div>
                <div className="space-y-2">
                  {JOBS_TIMELINE.map((t) => (
                    <div key={t.phase} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      <div className="shrink-0 text-right" style={{ minWidth: 60 }}>
                        <div className="mono text-xs font-bold text-slate-400">{t.months}</div>
                        <div className="mono text-base font-black text-amber-600">{t.workers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{t.phase}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{t.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                  <div className="text-xs text-amber-800">Construction workers are pulled from a <strong>300-mile radius</strong>. Many are transient — local hotels, restaurants, and services capture the spending, but permanent population growth is limited.</div>
                </div>
              </div>
            </div>

            {/* Row 4: Local hiring commitments */}
            <div className="lc-card p-5">
              <div className="text-xs font-bold text-slate-500 mb-3">Local Hiring Commitments & Community Agreements</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {LOCAL_HIRING_DATA.map((d) => (
                  <div key={d.project} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${d.verified ? "bg-green-500" : "bg-amber-400"}`} />
                      <div className="text-xs font-bold text-slate-800 leading-tight">{d.project}</div>
                    </div>
                    <div className="text-xs font-semibold text-amber-700 mb-1">{d.commitment}</div>
                    <div className="text-xs text-slate-500 leading-snug">{d.detail}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-xs text-slate-500">Formally verified / committed in filing</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span className="text-xs text-slate-500">Announced but not legally binding</span></div>
              </div>
            </div>

            {/* Row 5: Fiscal returns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
              <div className="lc-card lc-card-green p-5">
                <div className="text-xs font-bold text-slate-500 mb-1">Fiscal Benefit Ratio — Tax Revenue vs. Services Consumed</div>
                <p className="text-xs text-slate-400 mb-4">Dollars of property tax per dollar of public services (schools, roads, emergency response). Residential housing loses money at 0.8:1. A data center at 26:1 funds the whole county.</p>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FISCAL_BENEFIT_RATIOS} layout="vertical" margin={{ left: 8, right: 55, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}:1`} />
                      <YAxis type="category" dataKey="name" width={145} tick={{ fontSize: 10, fill: "#475569" }} />
                      <Tooltip content={<ChartTip fmt={(v) => `${v}:1 ratio`} />} />
                      <ReferenceLine x={1} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Break-even", position: "insideTopRight", fontSize: 9, fill: "#ef4444" }} />
                      <Bar dataKey="ratio" name="Fiscal Ratio" radius={[0, 4, 4, 0]}>
                        {FISCAL_BENEFIT_RATIOS.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                <EvidenceChip title="Virginia Statewide" val="74,000 Jobs" sub="$9.1B GDP · $1.64B local taxes/yr · 1:3.5 employment multiplier" color="#22c55e" />
                <EvidenceChip title="Arizona" val="$25B GDP" sub="$863M combined annual tax revenue from data centers (2023)" color="#f59e0b" />
                <EvidenceChip title="Brookings 2026 (Peer-Reviewed)" val="+22% Info Sector" sub="+4–5% private employment in host counties vs 3,000 control counties" color="#3b82f6" />
                <EvidenceChip title="Project Steamboat, GA" val="1,666×" sub="$12K/yr idle parcel → $200M over 10 years in property tax" color="#8b5cf6" />
                <EvidenceChip title="Maryland SAGE Study" val="$775M" sub="Local economic activity during construction of one 800K sqft DC" color="#22c55e" />
                <EvidenceChip title="Stargate Michigan" val="2,500 Union" sub="First Stargate with explicit union-built commitment. IBEW + operating engineers." color="#f59e0b" />
              </div>
            </div>
          </section>

          {/* ── Section 8: Nuclear ── */}
          <section>
            <SH n="08 · Clean Energy Pivot" title="Nuclear-DC Pairings"
              sub="Hyperscalers are increasingly co-locating with or contracting nuclear plants to meet 24/7 carbon-free energy commitments. This is reshaping the US nuclear industry — including restarting plants that had already been shut down." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NUCLEAR_DC_PAIRINGS.map((n) => (
                <div key={n.operator} className="lc-card p-4 hover:shadow-md transition-shadow" style={{ borderTop: `3px solid ${n.color}` }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Atom size={16} style={{ color: n.color }} className="shrink-0 mt-0.5" />
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mono ${
                      n.status === "Done" ? "bg-green-50 text-green-700" :
                      n.status === "Signed" ? "bg-blue-50 text-blue-700" :
                      n.status === "Active" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"
                    }`}>{n.status}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{n.operator}</div>
                  <div className="text-xs font-semibold text-slate-600 mb-2">{n.facility}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{n.deal}</div>
                  {n.mw && <div className="mono text-sm font-black mt-3" style={{ color: n.color }}>{n.mw.toLocaleString()} MW</div>}
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 9: Gas Buildouts ── */}
          <section>
            <SH n="09 · Hidden Infrastructure" title="Gas Plant Buildouts Behind the Meter"
              sub="Before nuclear and renewables come online, data centers are triggering massive gas plant construction — some directly onsite, others contracted through utilities. This infrastructure won't be dismantled when cleaner power arrives." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GAS_PLANT_BUILDOUTS.map((g) => (
                <div key={g.operator} className="lc-card lc-card-red p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive size={15} className="text-red-500 shrink-0" />
                    <div className="text-xs font-bold text-slate-700 leading-tight">{g.operator}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-2 mb-3">
                    <div className="text-xs text-slate-500 font-medium">{g.type}</div>
                  </div>
                  <div className="space-y-1.5">
                    {g.newMW && <div className="flex justify-between"><span className="text-xs text-slate-500">New generation capacity</span><span className="mono text-xs font-bold text-red-600">{g.newMW.toLocaleString()} MW</span></div>}
                    {g.transmissionMiles && <div className="flex justify-between"><span className="text-xs text-slate-500">New transmission lines</span><span className="mono text-xs font-bold text-slate-700">{g.transmissionMiles} miles</span></div>}
                    {g.substations && <div className="flex justify-between"><span className="text-xs text-slate-500">New substations</span><span className="mono text-xs font-bold text-slate-700">{g.substations}</span></div>}
                  </div>
                  <div className="mt-3 bg-red-50 border border-red-100 rounded-lg p-2.5">
                    <div className="text-xs text-red-700 leading-snug">{g.concern}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 10: Regulatory Pushback ── */}
          <section>
            <SH n="10 · Regulatory Responses" title="States Strike Back"
              sub="Where regulators have acted, residential bill impacts are being mitigated. Where they haven't, ratepayers subsidize the grid buildout for hyperscaler connections — a subsidy that never appears in economic impact reports." />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { state: "Virginia", rule: "GS5 Rate Class", date: "Approved Nov 2025 · Effective Jan 2027", detail: "DCs ≥25MW must pay min 85% of distribution/transmission costs + 60% of generation. Estimated residential savings: $5.52/mo.", impact: "~$5.52/mo residential savings", color: "#22c55e" },
                { state: "Ohio", rule: "85% Min-Pay Rule", date: "Approved 2025", detail: "DCs must pay 85% of contracted electricity capacity even when unused. Prevents shifting idle-capacity costs to residential ratepayers.", impact: "Demand dropped 30GW → 13GW immediately", color: "#22c55e" },
                { state: "Mississippi", rule: "Cost Recovery Legislation", date: "Special legislation", detail: "AWS must cover all incremental power infrastructure costs. Entergy: $300M grid upgrade, 50% outage reduction. Zero cost to residential customers.", impact: "Entergy: $300M grid upgrade at no customer cost", color: "#22c55e" },
              ].map((r) => (
                <div key={r.state} className="lc-card lc-card-green p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="led-green" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{r.state} — {r.rule}</div>
                      <div className="text-xs text-slate-400">{r.date}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed mb-3">{r.detail}</div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <div className="text-xs font-bold text-green-700">{r.impact}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Governance red flags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { l: "VA Municipalities with NDAs", v: "80%", sub: "Block public access to project details", c: "#f59e0b" },
                { l: "Stargate Abilene Tax Abatement", v: "85%", sub: "10-year property tax exemption", c: "#f59e0b" },
                { l: "Community-Blocked Projects", v: "$64B+", sub: "Water / energy / noise opposition", c: "#ef4444" },
                { l: "Ohio Standard Abatement", v: "75–100%", sub: "15-yr exemption, $100M+ projects", c: "#f59e0b" },
                { l: "xAI Memphis (Colossus)", v: "⚠ EJ Case", sub: "Gas turbines near Black communities", c: "#ef4444" },
              ].map((x) => (
                <div key={x.l} className="lc-card p-3 hover:shadow-md transition-shadow">
                  <div className="text-xs font-semibold text-slate-600 mb-1">{x.l}</div>
                  <div className="mono text-lg font-black" style={{ color: x.c }}>{x.v}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{x.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 10b: Community Transformation Stories ── */}
          <section>
            <SH n="10b · Case Studies" title="Community Transformation — The Full Picture"
              sub="These are the specific stories behind the aggregate numbers. Each represents a county that was losing population, underfunding schools, or watching its agricultural tax base erode — before a data center changed the fiscal math entirely." />

            {/* Story cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {COMMUNITY_STORIES.map((s) => (
                <div key={s.title} className="lc-card p-5 hover:shadow-lg transition-shadow flex flex-col" style={{ borderTop: `3px solid ${s.color}` }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-black text-slate-900 text-sm leading-tight">{s.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.county}</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mono shrink-0 ${
                      s.verdict === "Transformative" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>{s.verdict}</span>
                  </div>

                  {/* Key numbers row */}
                  <div className="grid grid-cols-2 gap-2 my-3">
                    <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                      <div className="mono text-base font-black text-slate-900">{s.investment}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Investment</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                      <div className="mono text-base font-black" style={{ color: s.color }}>{s.taxImpact}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Tax / Revenue Impact</div>
                    </div>
                  </div>

                  {/* Jobs row */}
                  <div className="flex gap-3 mb-3">
                    <div className="text-center flex-1">
                      <div className="mono text-sm font-bold text-amber-600">{s.constructionJobs}</div>
                      <div className="text-xs text-slate-400">Build jobs</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="mono text-sm font-bold text-green-600">{s.permJobs}</div>
                      <div className="text-xs text-slate-400">Perm. jobs</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="mono text-sm font-bold text-slate-500">{s.pop}</div>
                      <div className="text-xs text-slate-400">County pop.</div>
                    </div>
                  </div>

                  {/* Standout fact */}
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-3">
                    <div className="text-xs font-bold text-green-800 leading-snug">{s.standout}</div>
                  </div>

                  <div className="text-xs text-slate-400 leading-snug mt-auto">{s.note}</div>
                </div>
              ))}
            </div>

            {/* Workforce pipeline */}
            <div className="lc-card p-5">
              <div className="text-xs font-bold text-slate-500 mb-1">Community College & Workforce Training Pipelines</div>
              <p className="text-xs text-slate-400 mb-4">The communities that benefit most are those that moved early on workforce infrastructure — partnering with local colleges before groundbreaking. The data center workforce shortage is now the single biggest constraint on the industry, ahead of power and land.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {WORKFORCE_PIPELINE.map((w) => (
                  <div key={w.program} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-amber-200 transition-colors">
                    <div className="flex items-start gap-2 mb-2">
                      <Briefcase size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs font-bold text-slate-800 leading-tight">{w.program}</div>
                    </div>
                    <div className="text-xs text-amber-700 font-semibold mb-1">{w.partner}</div>
                    <div className="text-xs text-slate-500 mb-2">{w.location}</div>
                    {w.wage && (
                      <div className="mono text-sm font-black text-green-600 mb-1">{w.wage}</div>
                    )}
                    <div className="text-xs text-slate-400 leading-snug">{w.detail}</div>
                    {w.need && (
                      <div className="mt-2 bg-amber-50 border border-amber-100 rounded px-2 py-1">
                        <span className="text-xs font-bold text-amber-700">{w.need}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 11: Host Counties ── */}
          <section>
            <SH n="11 · Community Impact" title="Host County Profiles"
              sub="The counties receiving the biggest investments are often the ones with the fewest economic alternatives. Understanding who they are — and what the realistic alternative was — is essential to evaluating the net impact." />
            <div className="lc-card overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="lt-table min-w-[720px]">
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
                        <td className="font-semibold text-slate-900">{c.county}</td>
                        <td className="text-slate-600">{c.anchor}</td>
                        <td className="text-right mono font-bold text-slate-900">{c.investment}</td>
                        <td className="text-right mono text-slate-600">{c.perCapitaIncome}</td>
                        <td className="text-right mono font-bold text-red-600">{c.povertyRate}</td>
                        <td className="text-right mono font-bold text-red-700">{c.childPoverty}</td>
                        <td className="text-right mono text-slate-500">{c.popChange}</td>
                        <td className="text-center">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded mono ${
                            c.verdict === "Transformative" ? "bg-green-100 text-green-800 border border-green-200" :
                            c.verdict === "Positive" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                            "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}>{c.verdict}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 lc-card lc-card-amber p-5">
              <div className="lc-label mb-2">Richland Parish, Louisiana — The Defining Case</div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Meta&apos;s $27B Hyperion campus is being built in a parish where <strong className="text-red-600">37% of children live in poverty</strong>, per capita
                income is <strong className="text-slate-900 mono">$42,298</strong>, and the population has declined <strong className="text-red-600">6% since 2010</strong>.
                Meta wages run <strong className="text-green-600">150% above the state average</strong> (~$80K vs $42K). The parish is receiving
                <strong> $300M</strong> in direct infrastructure funding. The realistic alternative to this investment
                isn&apos;t a better industrial project — it&apos;s continued agricultural decline and school funding cuts
                from a shrinking tax base. The local child poverty rate of 37% represents the world this campus is being built into.
              </p>
            </div>
          </section>

          {/* ── Section 12: Net Verdict ── */}
          <section>
            <SH n="12 · The Case" title="Why This Is the Biggest Economic Development Story in Modern America"
              sub="Peer-reviewed research, real fiscal data, and documented community outcomes all point the same direction. Data centers are delivering for rural America in ways no other asset class has matched." />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {[
                { icon: TrendingUp, color: "#22c55e", title: "Loudoun Co., VA", stat: "26:1", sub: "Fiscal benefit ratio — 38% of county's entire general fund from 3% of its land. Lowest property tax rate in Northern Virginia." },
                { icon: TrendingUp, color: "#22c55e", title: "Virginia Statewide", stat: "74K Jobs", sub: "$9.1B GDP contribution · $1.64B local taxes/yr · 1:3.5 employment multiplier across the full economy." },
                { icon: TrendingUp, color: "#22c55e", title: "Arizona", stat: "$25B GDP", sub: "$863M in combined annual tax revenue (2023). Phoenix is the #4 data center market in North America." },
                { icon: TrendingUp, color: "#3b82f6", title: "Brookings 2026 (Peer-Reviewed)", stat: "+22%", sub: "Information sector employment growth in host counties vs 3,000 matched controls. +4–5% private employment overall." },
                { icon: TrendingUp, color: "#f59e0b", title: "Project Steamboat, GA", stat: "1,666×", sub: "$12K/yr idle parcel → $200M in property tax over 10 years. The single best documented land-conversion return in US history." },
                { icon: TrendingUp, color: "#22c55e", title: "Meta Hyperion Year 1", stat: "$875M", sub: "Local contracts placed in Year 1 alone in a parish of 20,000 people. 9 schools received STEM grants." },
              ].map((c) => (
                <div key={c.title} className="lc-card p-5 hover:shadow-lg transition-shadow" style={{ borderTop: `3px solid ${c.color}` }}>
                  <div className="mono text-2xl font-black mb-1" style={{ color: c.color }}>{c.stat}</div>
                  <div className="text-xs font-bold text-slate-800 mb-1.5">{c.title}</div>
                  <div className="text-xs text-slate-500 leading-snug">{c.sub}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
              <div className="lc-label text-amber-500 mb-3">The Bottom Line</div>
              <blockquote className="text-base sm:text-lg font-semibold leading-relaxed text-white">
                &ldquo;Data centers are the highest-yielding land-conversion event in modern American local fiscal history.
                For counties that had no realistic alternative anchor investment — declining ag tax base, shrinking schools,
                depopulation — these campuses represent a once-in-a-generation fiscal reset. The Brookings research is unambiguous:
                communities with data centers outperform matched controls on employment, tax revenue, and economic activity.
                The scale of capital being deployed — $690B in 2026 alone — means this reshaping of rural America is only beginning.&rdquo;
              </blockquote>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-slate-800 pt-6">
                {[
                  { label: "Fiscal Impact", color: "#22c55e", items: ["26:1 fiscal ratio in best-case counties", "$863M annual tax revenue statewide in AZ", "1,666× property value return documented in GA", "$1.64B in local taxes/yr in Virginia alone"] },
                  { label: "Community Returns", color: "#f59e0b", items: ["$875M local contracts in Year 1 (Meta/Richland Parish)", "STEM labs in every Canton MS elementary school", "Community college pipelines opening $18–26/hr careers", "$140K avg construction comp — life-changing in rural areas"] },
                  { label: "Scale of Opportunity", color: "#3b82f6", items: ["$690B hyperscaler CapEx in 2026 — just one year", "4.7M cumulative construction jobs through 2030", "697K permanent operations jobs projected by 2030", "6 Stargate campuses + dozens of independent projects underway"] },
                ].map((col) => (
                  <div key={col.label}>
                    <div className="text-xs font-bold mb-2.5" style={{ color: col.color }}>{col.label}</div>
                    <ul className="space-y-1.5">
                      {col.items.map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="shrink-0" style={{ color: col.color }}>→</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Data Note ── */}
          <section>
            <div className="lc-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Server size={13} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Data Sources & Methodology</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                All figures are based on publicly disclosed announcements, state economic development filings, company press releases, JLARC 2024,
                Brookings Institution 2026, Union of Concerned Scientists 2024, Sage Policy Group / Maryland Tech Council Aug 2025,
                Hamm Institute 2025, Uptime Institute 2024, ConstructConnect June 2026, JLL / CBRE market reports, and local municipal records — all as of June 2026.
                Many projects have not yet disclosed final MW capacity, water usage agreements, or full employment commitments.
                Largest research gaps: Digital Realty, Equinix, CyrusOne, Aligned, Switch, Compass, CloudHQ, STACK, Iron Mountain, and numerous secondary hyperscaler campuses.
                Total identified capex: ~$290B+ directly disclosed. Hyperscaler 2026 CapEx figures represent global programs with heavy US concentration.
                Jobs-per-$B figures are estimates based on direct permanent employment disclosures; indirect and induced employment excluded.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ══ FOOTER (dark) ══ */}
      <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="led-amber" />
            <span className="mono text-xs text-amber-500 font-bold uppercase tracking-widest">US AI Infrastructure Tracker</span>
          </div>
          <div className="text-sm text-slate-500">
            Built by{" "}
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
              t@nyvp.com
            </a>
          </div>
          <div className="mono text-xs text-slate-700 mt-2">DATA AS OF JUNE 2026 · SOURCES: JLARC 2024 · BROOKINGS 2026 · UCS 2024 · SAGE POLICY GROUP 2025 · STATE EDA FILINGS</div>
        </div>
      </footer>
    </main>
  );
}
