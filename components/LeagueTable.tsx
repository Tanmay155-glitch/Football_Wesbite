'use client'

import { motion } from 'framer-motion'
import { leagueTable } from '@/lib/data'

function FormDot({ r }: { r: 'W' | 'D' | 'L' }) {
    const cls = { W: 'bg-emerald-500', D: 'bg-amber-400', L: 'bg-red-400' }[r]
    return <span className={`w-2 h-2 rounded-full inline-block ${cls}`} title={r} />
}

const thCls = 'text-left py-4 px-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]'
const tdCls = 'py-4 px-4'

export default function LeagueTable() {
    return (
        <div>
            <div className="section-divider" />
            <div className="flex items-center gap-3 mb-6">
                <h2 className="heading-section">League Table</h2>
                <span className="badge-blue text-[10px] shadow-sm">Inter-University League 2025/26</span>
            </div>
            <div className="card shadow-soft-lg border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className={thCls}>#</th>
                            <th className={thCls}>Team</th>
                            <th className={`${thCls} hidden sm:table-cell`}>P</th>
                            <th className={`${thCls} hidden md:table-cell`}>W</th>
                            <th className={`${thCls} hidden md:table-cell`}>D</th>
                            <th className={`${thCls} hidden md:table-cell`}>L</th>
                            <th className={`${thCls} hidden lg:table-cell`}>GF</th>
                            <th className={`${thCls} hidden lg:table-cell`}>GA</th>
                            <th className={`${thCls} hidden lg:table-cell`}>GD</th>
                            <th className={thCls}>Pts</th>
                            <th className={`${thCls} hidden sm:table-cell`}>Form</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {leagueTable.map((team, i) => (
                            <motion.tr
                                key={team.rank}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className={`transition-colors ${team.isUs
                                    ? 'bg-blue-50/60 hover:bg-blue-50'
                                    : i < 4 ? 'hover:bg-emerald-50/30' : i > 5 ? 'hover:bg-red-50/20' : 'hover:bg-slate-50'
                                    }`}
                            >
                                <td className={`${tdCls}`}>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1 h-5 rounded-full ${i === 0 ? 'bg-brand-gold' : i < 4 ? 'bg-emerald-400' : i > 5 ? 'bg-red-300' : 'bg-slate-200'}`} />
                                        <span className="text-slate-500 font-bold text-[13px]">{team.rank}</span>
                                    </div>
                                </td>
                                <td className={`${tdCls} font-bold ${team.isUs ? 'text-brand-blue' : 'text-slate-800'} text-[14px]`}>
                                    {team.name}
                                    {team.isUs && <span className="ml-2 badge bg-blue-50 text-brand-blue border-blue-200 text-[9px] align-middle">US</span>}
                                </td>
                                <td className={`${tdCls} hidden sm:table-cell text-slate-500 font-medium`}>{team.played}</td>
                                <td className={`${tdCls} hidden md:table-cell text-slate-600 font-medium`}>{team.won}</td>
                                <td className={`${tdCls} hidden md:table-cell text-slate-600 font-medium`}>{team.drawn}</td>
                                <td className={`${tdCls} hidden md:table-cell text-slate-600 font-medium`}>{team.lost}</td>
                                <td className={`${tdCls} hidden lg:table-cell text-slate-600 font-medium`}>{team.gf}</td>
                                <td className={`${tdCls} hidden lg:table-cell text-slate-600 font-medium`}>{team.ga}</td>
                                <td className={`${tdCls} hidden lg:table-cell text-slate-500 font-medium`}>{team.gf - team.ga > 0 ? '+' : ''}{team.gf - team.ga}</td>
                                <td className={`${tdCls} font-display text-lg ${team.isUs ? 'text-brand-blue' : 'text-slate-900'}`}>{team.points}</td>
                                <td className={`${tdCls} hidden sm:table-cell`}>
                                    <div className="flex gap-1">{team.form.map((r, j) => <FormDot key={j} r={r} />)}</div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex flex-wrap items-center gap-5 px-4 py-3 border-t border-slate-200 bg-slate-50">
                    {[
                        { color: 'bg-emerald-400', label: 'Playoff / Promotion' },
                        { color: 'bg-red-300', label: 'Relegation' },
                    ].map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                            <div className={`w-2.5 h-2.5 rounded ${color}`} />{label}
                        </div>
                    ))}
                    <div className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span className="font-bold">GD</span> = Goal Difference
                    </div>
                </div>
            </div>
        </div>
    )
}
