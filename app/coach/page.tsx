'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, ShieldCheck, BookOpen } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { coach } from '@/lib/data'

export default function CoachPage() {
    return (
        <div>
            <PageHero eyebrow="Leadership" title="The Coach" />

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid lg:grid-cols-5 gap-16 items-start">
                {/* Photo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative lg:col-span-2"
                >
                    <div className="relative h-[560px] rounded-3xl overflow-hidden shadow-soft-lg group">
                        <Image src={coach.imageUrl} alt={coach.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <div className="font-display text-4xl text-white tracking-wider drop-shadow-sm">{coach.name}</div>
                            <div className="text-brand-gold font-bold uppercase tracking-widest text-[11px] mt-1.5">{coach.title}</div>
                        </div>
                    </div>

                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="lg:col-span-3 pt-6"
                >
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                        {coach.stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="card p-5 text-center bg-blue-50/50"
                            >
                                <div className="font-display text-4xl text-brand-blue">{s.value}</div>
                                <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mt-1">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bio text */}
                    <div className="section-divider" />
                    <h2 className="heading-section text-2xl mb-5">Coach Biography</h2>
                    <div className="space-y-4 text-slate-600 font-medium text-[15px] leading-relaxed">
                        {coach.bio.trim().split('\n\n').map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                        ))}
                    </div>

                    {/* Philosophy */}
                    <div className="mt-10 card border-slate-200 bg-white p-7 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03]">
                            <BookOpen className="w-32 h-32 text-brand-blue" />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-[11px] mb-4">
                                <BookOpen className="w-4 h-4" /> Philosophy
                            </div>
                            <p className="text-slate-700 text-[15px] font-medium italic leading-relaxed">&ldquo;{coach.philosophy}&rdquo;</p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="mt-10">
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[11px] mb-4">
                            <ShieldCheck className="w-4 h-4 text-brand-blue" /> Certifications
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {coach.certifications.map(c => (
                                <span key={c} className="badge bg-slate-100 text-slate-700 border border-slate-200 text-xs px-3 py-1.5 shadow-sm">
                                    <Award className="w-3.5 h-3.5 text-amber-500" /> {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
