'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, CheckCircle, XCircle, MinusCircle, Trophy } from 'lucide-react'
import dynamic from 'next/dynamic'
import PageHero from '@/components/PageHero'
import { matches } from '@/lib/data'

/* ── Result badge ─────────────────────────────────────────── */
function ResultBadge({ homeScore, awayScore, venue }: { homeScore?: number; awayScore?: number; venue: string }) {
    if (homeScore === undefined) return null
    const us = venue === 'Home' ? homeScore! : awayScore!
    const them = venue === 'Home' ? awayScore! : homeScore!
    const res = us > them ? 'W' : us < them ? 'L' : 'D'
    const scoreStr = `${homeScore} – ${awayScore}`
    const cfg = {
        W: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', Icon: CheckCircle },
        L: { cls: 'bg-red-50 text-red-700 border-red-200', Icon: XCircle },
        D: { cls: 'bg-amber-50 text-amber-700 border-amber-200', Icon: MinusCircle },
    }[res]!
    return (
        <div className="flex items-center gap-3">
            <span className={`badge border text-[10px] font-bold shadow-sm ${cfg.cls}`}>
                <cfg.Icon className="w-3.5 h-3.5" />{res}
            </span>
            <span className="font-display text-slate-900 text-[19px]">{scoreStr}</span>
        </div>
    )
}

/* ── Form dot ─────────────────────────────────────────────── */
function FormDot({ r }: { r: 'W' | 'D' | 'L' }) {
    const cls = { W: 'bg-emerald-500', D: 'bg-amber-400', L: 'bg-red-400' }[r]
    return <span className={`w-2 h-2 rounded-full inline-block ${cls}`} title={r} />
}

const thCls = 'text-left py-4 px-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]'
const tdCls = 'py-4 px-4'

/* ── Skeleton Loader ──────────────────────────────────────── */
function LeagueTableSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="section-divider" />
            <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-40 bg-slate-200 rounded-md" />
            </div>
            <div className="card shadow-soft-lg border-slate-200 overflow-hidden">
                <div className="h-12 bg-slate-100 border-b border-slate-200" />
                <div className="divide-y divide-slate-100 bg-white">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex px-4 py-4 items-center gap-4">
                            <div className="w-4 h-4 rounded bg-slate-200" />
                            <div className="w-32 h-4 rounded bg-slate-200" />
                            <div className="w-8 h-4 rounded bg-slate-200 ml-auto hidden sm:block" />
                            <div className="w-8 h-4 rounded bg-slate-200 hidden md:block" />
                            <div className="w-16 h-4 rounded bg-slate-200 hidden lg:block" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const DynamicLeagueTable = dynamic(() => import('@/components/LeagueTable'), { 
    ssr: false, 
    loading: () => <LeagueTableSkeleton /> 
})

/* ── Page ─────────────────────────────────────────────────── */
export default function MatchesPage() {
    const upcoming = matches.filter(m => m.isUpcoming).sort((a, b) => +new Date(a.date) - +new Date(b.date))
    const past = matches.filter(m => !m.isUpcoming).sort((a, b) => +new Date(b.date) - +new Date(a.date))

    return (
        <div>
            <PageHero eyebrow="2025/26 Season" title="Match Center" />

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-20">

                {/* ─ League Table ─ */}
                <DynamicLeagueTable />

                {/* ─ Upcoming ─ */}
                <div>
                    <div className="section-divider" />
                    <h2 className="heading-section mb-6">Upcoming Fixtures</h2>
                    <div className="card shadow-soft-lg border-slate-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className={thCls}>Date</th>
                                    <th className={thCls}>Opponent</th>
                                    <th className={`${thCls} hidden md:table-cell`}>Competition</th>
                                    <th className={`${thCls} hidden sm:table-cell`}>Venue</th>
                                    <th className={thCls}>Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {upcoming.map((m, i) => (
                                    <motion.tr key={m.id}
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                        className="hover:bg-slate-50 transition-colors">
                                        <td className={`${tdCls} text-slate-500 font-medium text-[13px]`}>
                                            {new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </td>
                                        <td className={`${tdCls} font-bold text-slate-900 text-[15px]`}>{m.opponent}</td>
                                        <td className={`${tdCls} hidden md:table-cell`}>
                                            <span className="badge-blue text-[10px] shadow-sm">{m.competition}</span>
                                        </td>
                                        <td className={`${tdCls} hidden sm:table-cell`}>
                                            <span className={`text-xs font-bold flex items-center gap-1.5 ${m.venue === 'Home' ? 'text-brand-blue' : 'text-slate-500'}`}>
                                                <MapPin className="w-3.5 h-3.5" />{m.venue}
                                            </span>
                                        </td>
                                        <td className={`${tdCls} text-slate-600 font-medium text-xs`}>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" />{m.time}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ─ Past Results ─ */}
                <div>
                    <div className="section-divider bg-slate-300" />
                    <h2 className="heading-section text-slate-800 mb-6">Past Results</h2>
                    <div className="card shadow-soft-lg border-slate-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className={thCls}>Date</th>
                                    <th className={thCls}>Opponent</th>
                                    <th className={`${thCls} hidden md:table-cell`}>Competition</th>
                                    <th className={`${thCls} hidden sm:table-cell`}>Venue</th>
                                    <th className={thCls}>Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {past.map((m, i) => (
                                    <motion.tr key={m.id}
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                        className="hover:bg-slate-50 transition-colors group">
                                        <td className={`${tdCls} text-slate-500 font-medium text-[13px]`}>
                                            {new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </td>
                                        <td className={`${tdCls}`}>
                                            <div className="font-bold text-slate-700 text-[15px]">{m.opponent}</div>
                                            {m.description && (
                                                <div className="text-[11px] text-slate-400 font-medium mt-0.5 hidden group-hover:block">{m.description}</div>
                                            )}
                                        </td>
                                        <td className={`${tdCls} hidden md:table-cell text-slate-400 font-medium text-xs`}>{m.competition}</td>
                                        <td className={`${tdCls} hidden sm:table-cell text-xs font-bold ${m.venue === 'Home' ? 'text-brand-blue/70' : 'text-slate-400/80'}`}>{m.venue}</td>
                                        <td className={tdCls}>
                                            <ResultBadge homeScore={m.homeScore} awayScore={m.awayScore} venue={m.venue} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ─ Season stats summary row ─ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                        { v: '0', l: 'Season Wins', icon: '🏆' },
                        { v: '0', l: 'Draws', icon: '🤝' },
                        { v: '0', l: 'Losses', icon: '📉' },
                        { v: '0', l: 'Goals Scored', icon: '⚽' },
                    ].map(({ v, l, icon }) => (
                        <motion.div key={l}
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="card p-6 text-center bg-white border-slate-200">
                            <div className="text-3xl mb-3">{icon}</div>
                            <div className="font-display text-4xl text-brand-blue">{v}</div>
                            <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mt-2">{l}</div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
