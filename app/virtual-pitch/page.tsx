'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import PageHero from '@/components/PageHero'
import { formations, FormationKey } from '@/lib/data'

function PitchSkeleton() {
    return (
        <div className="bg-white p-3 border border-slate-200 rounded-[2rem] shadow-soft-lg animate-pulse">
            <div className="rounded-3xl overflow-hidden shadow-inner relative border border-black/5 bg-slate-200" style={{ aspectRatio: `600/400` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-slate-300 border-t-brand-blue rounded-full animate-spin" />
                </div>
            </div>
        </div>
    )
}

const DynamicPitch = dynamic(() => import('@/components/PitchGraphic'), {
    ssr: false,
    loading: () => <PitchSkeleton />
})

export default function VirtualPitchPage() {
    const [formation, setFormation] = useState<FormationKey>('4-4-2')
    const keys: FormationKey[] = ['4-4-2', '4-3-3', '3-5-2']
    const players = formations[formation]

    return (
        <div>
            <PageHero eyebrow="Tactical Board" title="Virtual Pitch" />

            <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                {/* Formation selector */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Formation</span>
                    <div className="flex gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
                        {keys.map(key => (
                            <button
                                key={key}
                                id={`formation-${key.replace(/-/g, '')}`}
                                onClick={() => setFormation(key)}
                                className={`relative px-6 py-2 rounded-xl text-sm font-bold transition-colors duration-200
                  ${formation === key ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                {formation === key && (
                                    <motion.div layoutId="fpill" className="absolute inset-0 bg-brand-blue rounded-xl shadow-md"
                                        transition={{ type: 'spring', stiffness: 250, damping: 25 }} />
                                )}
                                <span className="relative z-10">{key}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Formation title */}
                <AnimatePresence mode="wait">
                    <motion.p key={formation}
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-center font-display text-4xl text-slate-800 tracking-widest mb-8"
                    >
                        {formation} Formation
                    </motion.p>
                </AnimatePresence>

                {/* Pitch */}
                <DynamicPitch formation={formation} players={players} />

                {/* Player legend */}
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {players.map((p, i) => (
                        <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="card px-3 py-2.5 flex items-center gap-3 bg-white"
                        >
                            <div className="w-8 h-8 shrink-0 rounded-[10px] bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                                <span className="font-display text-brand-blue text-[15px]">{p.number}</span>
                            </div>
                            <div className="min-w-0">
                                <div className="text-slate-800 text-xs font-bold truncate">{p.name}</div>
                                <div className="text-slate-400 font-medium text-[9px] uppercase tracking-[0.1em] mt-0.5">{p.position}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-slate-400 font-medium text-xs mt-8">
                    Switch formations above — player markers animate to new positions in real-time.
                </p>
            </section>
        </div>
    )
}
