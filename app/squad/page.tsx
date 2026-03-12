'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Star, Target, Zap, Calendar, Award, User } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { players, Player } from '@/lib/data'

const positionColors: Record<string, string> = {
    GK: 'badge-gold',
    DEF: 'badge-blue',
    MID: 'bg-emerald-50 text-emerald-700 border-emerald-200 badge',
    FWD: 'bg-rose-50 text-rose-700 border-rose-200 badge',
}
const positionLabels: Record<string, string> = {
    All: 'All', GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward',
}

/* ── Rating stars ───────────────────────────────────────── */
function RatingBar({ value }: { value: number }) {
    const pct = ((value - 5) / 5) * 100  // scale 5-10 to 0-100%
    const color = value >= 8 ? 'bg-emerald-500' : value >= 7 ? 'bg-brand-blue' : 'bg-amber-400'
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
            <span className="font-display text-sm text-slate-800 min-w-[2ch]">{value.toFixed(1)}</span>
        </div>
    )
}

/* ── Player profile modal ───────────────────────────────── */
function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
    const [imgError, setImgError] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                onClick={e => e.stopPropagation()}
                className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden"
            >
                {/* Header image strip + info */}
                <div className="relative h-56 bg-gradient-to-br from-blue-900 to-brand-blue overflow-hidden">
                    {/* Background image ghost */}
                    {!imgError ? (
                        <img
                            src={player.imageUrl} alt={player.name}
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
                            onError={() => setImgError(true)}
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 to-transparent" />

                    {/* Close btn */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    {/* Player avatar */}
                    <div className="absolute bottom-4 left-6 flex items-end gap-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl bg-brand-blue shrink-0">
                            {!imgError ? (
                                <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover object-top" onError={() => setImgError(true)} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="font-display text-4xl text-white">{player.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="pb-1">
                            <div className="font-display text-3xl text-white tracking-wider drop-shadow">{player.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`badge ${positionColors[player.position]} text-[10px] shadow-sm`}>{positionLabels[player.position]}</span>
                                <span className="text-white/60 font-bold text-[11px]">#{player.number}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
                        {[
                            { icon: Calendar, label: 'Year', val: player.year.replace(' Year', 'yr') },
                            { icon: User, label: 'Appeared', val: `${player.appearances ?? 0}` },
                            { icon: Target, label: 'Goals', val: `${player.goals ?? 0}` },
                            { icon: Zap, label: 'Assists', val: `${player.assists ?? 0}` },
                        ].map(({ icon: Icon, label, val }) => (
                            <div key={label} className="card p-4 text-center bg-slate-50">
                                <Icon className="w-4 h-4 text-brand-blue mx-auto mb-2 opacity-75" />
                                <div className="font-display text-2xl text-slate-900 leading-none">{val}</div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="label-sm flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400" /> Season Rating</span>
                        </div>
                        <RatingBar value={player.rating ?? 0} />
                    </div>

                    {player.description && (
                        <div className="mb-6">
                            <p className="text-slate-600 font-medium text-[14px] leading-relaxed">{player.description}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium text-xs">
                            <Award className="w-3.5 h-3.5 text-brand-blue" /> {player.department}
                        </div>
                        {player.nationality && (
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-xs">
                                📍 {player.nationality}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

/* ── Player card ─────────────────────────────────────────── */
function PlayerCard({ player, onClick }: { player: Player; onClick: () => void }) {
    const [imgError, setImgError] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className="card-hover overflow-hidden group border-slate-200 cursor-pointer select-none"
        >
            {/* Image */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
                {!imgError ? (
                    <img
                        src={player.imageUrl} alt={player.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                            <span className="font-display text-2xl">{player.name.charAt(0)}</span>
                        </div>
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3 font-display text-2xl text-white drop-shadow-md leading-none">#{player.number}</div>
                <div className="absolute bottom-3 left-3">
                    <span className={`badge border text-[10px] shadow-sm ${positionColors[player.position]}`}>{player.position}</span>
                </div>
                {/* Tap to view hint */}
                <div className="absolute inset-x-0 top-0 h-full bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-[11px] font-bold text-brand-blue shadow-sm">
                        View Profile
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-white">
                <h3 className="font-bold text-slate-800 text-sm mb-0.5 group-hover:text-brand-blue transition-colors duration-200">
                    {player.name}
                </h3>
                <p className="text-slate-500 font-medium text-[11px] truncate">{player.department}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{player.year}</p>
                {/* Stats row for outfield players */}
                <div className="flex gap-4 mt-3.5 pt-3.5 border-t border-slate-100">
                    <div className="text-center">
                        <div className="font-display text-lg text-brand-blue leading-none">{player.goals ?? 0}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Goals</div>
                    </div>
                    <div className="w-px bg-slate-100" />
                    <div className="text-center">
                        <div className="font-display text-lg text-slate-600 leading-none">{player.assists ?? 0}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Assists</div>
                    </div>
                    <div className="w-px bg-slate-100" />
                    <div className="text-center">
                        <div className="font-display text-lg text-slate-600 leading-none">{(player.rating ?? 0).toFixed(1)}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Rating</div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* ── Page ─────────────────────────────────────────────────── */
export default function SquadPage() {
    const [filter, setFilter] = useState('All')
    const [selected, setSelected] = useState<Player | null>(null)

    const filtered = filter === 'All' ? players : players.filter(p => p.position === filter)

    // Top scorers sorted by goals (for a sidebar widget)
    const topScorers = [...players].filter(p => p.goals).sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 5)
    const maxGoals = topScorers[0]?.goals ?? 1

    return (
        <div>
            <PageHero eyebrow="2025/26 Season" title="The Squad" />

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main grid */}
                    <div className="flex-1 min-w-0">
                        {/* Filter bar */}
                        <div className="flex flex-wrap gap-2.5 mb-8 justify-center">
                            {(['All', 'GK', 'DEF', 'MID', 'FWD'] as const).map(pos => (
                                <button key={pos} id={`filter-${pos.toLowerCase()}`}
                                    onClick={() => setFilter(pos)}
                                    className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 shadow-sm
                    ${filter === pos
                                            ? 'bg-brand-blue text-white border-brand-blue'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-brand-blue/30 hover:text-brand-blue'}`}
                                >
                                    {positionLabels[pos]}
                                </button>
                            ))}
                        </div>

                        <p className="text-center text-slate-400 font-bold text-[10px] mb-8 uppercase tracking-[0.2em]">
                            {filtered.length} PLAYER{filtered.length !== 1 ? 'S' : ''}
                        </p>

                        <AnimatePresence mode="popLayout">
                            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                                {filtered.map(player => (
                                    <PlayerCard key={player.id} player={player} onClick={() => setSelected(player)} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sidebar: top scorers */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="card p-6 sticky top-24 bg-white border-slate-200">
                            <div className="section-divider mb-3" />
                            <h3 className="font-display text-xl text-slate-900 tracking-wider mb-6">🎯 Top Scorers</h3>
                            <div className="space-y-4">
                                {topScorers.map((p, i) => {
                                    const pct = ((p.goals ?? 0) / maxGoals) * 100
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelected(p)}
                                            className="w-full text-left group"
                                        >
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <span className={`font-display text-lg leading-none w-5 shrink-0 ${i === 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                                                    {i + 1}
                                                </span>
                                                <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover object-top" onError={e => (e.currentTarget.style.display = 'none')} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-slate-800 text-xs font-bold truncate group-hover:text-brand-blue transition-colors">{p.name}</div>
                                                    <div className="text-slate-400 text-[10px] font-medium">{positionLabels[p.position]}</div>
                                                </div>
                                                <span className="font-display text-xl text-brand-blue shrink-0">{p.goals}</span>
                                            </div>
                                            <div className="ml-[44px] h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                                    className={`h-full rounded-full ${i === 0 ? 'bg-amber-400' : 'bg-brand-blue/50'}`}
                                                />
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                        </div>
                    </aside>
                </div>
            </section>

            {/* Player modal */}
            <AnimatePresence>
                {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </div>
    )
}
