'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Calendar, ArrowUpRight, Zap, Target, TrendingUp, Trophy } from 'lucide-react'
import { newsItems, matches, players } from '@/lib/data'


/* ── Score card ───────────────────────────────────────────── */
function ScoreCard() {
    const last = matches.find(m => !m.isUpcoming)
    if (!last) return null
    const us = last.venue === 'Home' ? last.homeScore! : last.awayScore!
    const them = last.venue === 'Home' ? last.awayScore! : last.homeScore!
    const res = us > them ? 'WIN' : us < them ? 'LOSS' : 'DRAW'
    const col = res === 'WIN' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : res === 'LOSS' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'
    return (
        <div className="card p-5 space-y-3 w-72 relative z-20">
            <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-brand-gold" />
                <span className="label-sm text-slate-500">Latest Result</span>
                <span className="ml-auto label-sm text-slate-400">{last.competition}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-center">
                    <p className="font-display text-xs tracking-widest text-slate-400 mb-1">SANJIVANI</p>
                    <p className="font-display text-5xl text-brand-blue leading-none">{us}</p>
                </div>
                <div className={`font-display text-lg tracking-widest border px-3 py-1 rounded-xl ${col}`}>{res}</div>
                <div className="text-center">
                    <p className="font-display text-xs tracking-widest text-slate-400 mb-1 truncate max-w-[80px]">{last.opponent.split(' ')[0].toUpperCase()}</p>
                    <p className="font-display text-5xl text-slate-300 leading-none">{them}</p>
                </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium text-center">
                {new Date(last.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                &nbsp;·&nbsp;{last.venue === 'Home' ? '🏟 Home' : '✈ Away'}
            </p>
        </div>
    )
}

/* ── Dynamic News Section ─────────────────────────────────── */
function DynamicNewsSection() {
    const [news, setNews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Using BBC Sport Football RSS - Highly reliable for football specific news
                const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/football/rss.xml')
                const data = await res.json()
                if (data.status === 'ok') {
                    // Filter for items that definitely have a valid article image
                    // BBC RSS via rss2json typically provides images in 'thumbnail' or 'enclosure'
                    const processedItems = data.items
                        .map((item: any) => {
                            const imageUrl = item.thumbnail || (item.enclosure && item.enclosure.link);
                            return { ...item, displayImage: imageUrl };
                        })
                        .filter((item: any) => item.displayImage && !item.displayImage.includes('bbc_sport_logo'));

                    setNews(processedItems.slice(0, 4))
                }
            } catch (err) {
                console.error("Failed to fetch news", err)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <div className="section-divider" />
                    <h2 className="heading-section">Latest News</h2>
                </div>
                <Link href="#" className="btn-outline text-xs !px-4 !py-2">View All</Link>
            </div>
            {loading ? (
                <div className="h-40 flex items-center justify-center text-slate-400">Loading latest football news...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
                    {news.map((item, i) => {
                        const isFeatured = i === 0
                        return (
                            <motion.div key={item.guid || i}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className={isFeatured ? 'md:col-span-2' : ''}>
                                <motion.a href={item.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} transition={{ duration: 0.22 }}
                                    className={`card-hover overflow-hidden cursor-pointer group block ${isFeatured ? 'md:row-span-2' : ''} h-full`}>
                                    <div className={`relative overflow-hidden ${isFeatured ? 'h-56' : 'h-40'} bg-slate-100`}>
                                        <Image src={item.displayImage} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
                                        <span className="absolute top-3 left-3 shadow-sm badge bg-blue-100 text-blue-700 text-xs px-2.5 py-1">Global Football</span>
                                    </div>
                                    <div className="p-5 flex flex-col justify-between" style={{ height: isFeatured ? 'calc(100% - 14rem)' : 'calc(100% - 10rem)' }}>
                                        <div>
                                            <p className="text-slate-400 font-medium text-[11px] mb-2">{new Date(item.pubDate.replace(' ', 'T')).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-brand-blue transition-colors mb-2.5">{item.title}</h3>
                                            {isFeatured && <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>}
                                        </div>
                                        <div className="flex items-center gap-1 text-brand-blue text-xs font-bold mt-4">
                                            Read article <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </motion.a>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}


/* ── Top Scorers mini-widget ──────────────────────────────── */
function TopScorersSection() {
    const scorers = [...players].filter(p => (p.goals ?? 0) > 0).sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0)).slice(0, 5)
    if (scorers.length === 0) return null
    const max = scorers[0]?.goals ?? 1
    return (
        <section className="bg-white border-y border-slate-200 py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: heading + description */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="section-divider" />
                        <h2 className="heading-section mb-4">Top Scorers</h2>
                        <p className="text-slate-500 font-medium text-[15px] leading-relaxed max-w-sm mb-8">
                            Our attack has been relentless this season. {scorers[0]?.name} leads the charts with an outstanding <span className="text-brand-blue font-bold">{scorers[0]?.goals} goals</span> from {scorers[0]?.appearances} appearances.
                        </p>
                        <Link href="/squad" className="btn-blue inline-flex">
                            View Full Squad <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Right: leaderboard */}
                    <div className="space-y-5">
                        {scorers.map((p, i) => {
                            const pct = ((p.goals ?? 0) / max) * 100
                            return (
                                <motion.div key={p.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <span className={`font-display text-2xl w-7 shrink-0 ${i === 0 ? 'text-amber-500' : 'text-slate-300'}`}>{i + 1}</span>
                                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shrink-0 relative bg-slate-100">
                                        <Image src={p.imageUrl} alt={p.name} fill sizes="44px"
                                            className="object-cover object-top"
                                            placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-800 font-bold text-sm truncate group-hover:text-brand-blue transition-colors">{p.name}</span>
                                            <span className={`font-display text-xl ml-3 shrink-0 ${i === 0 ? 'text-amber-500' : 'text-brand-blue'}`}>{p.goals}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.09, duration: 0.7 }}
                                                className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-brand-blue/40 to-brand-blue'}`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── Sunday Announcement ──────────────────────────────────── */
function SundayAnnouncement() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 -mt-12 relative z-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-1 bg-gradient-to-br from-brand-blue to-blue-900 border-none shadow-2xl overflow-hidden"
            >
                <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[1.4rem] border border-white/10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center shrink-0 border border-brand-gold/20">
                        <Trophy className="w-10 h-10 text-brand-gold" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <span className="badge bg-brand-gold text-amber-950 font-bold px-3 py-1 text-[10px] tracking-widest shadow-sm border-none">WEEKLY EVENT</span>
                            <span className="text-blue-100 font-display text-sm tracking-widest uppercase">Sunday Showdown</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-4">THE SUNDAY SERIES</h2>
                        <p className="text-blue-100/80 font-medium text-lg leading-relaxed max-w-3xl">
                            Sanjivani Sunday Series: High-intensity inter-college and school football matches conducted every Sunday at the Sanjivani Football Ground. Experience the thrill of local competition live.
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 min-w-[200px]">
                        <Calendar className="w-8 h-8 text-brand-gold mb-3" />
                        <span className="text-white font-display text-2xl tracking-widest uppercase">EVERY SUNDAY</span>
                        <span className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">Sanjivani Ground</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

/* ── Page ─────────────────────────────────────────────────── */
export default function HomePage() {

    return (
        <div>
            {/* ═══ HERO ═══════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center">
                <div className="absolute inset-0">
                    <Image src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=80" alt="Sanjivani Stadium" fill priority className="object-cover" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
                    <div className="hero-overlay absolute inset-0" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="badge shadow-md bg-brand-blue text-white border-none px-3 py-1.5 mb-6 inline-flex">
                            ⚽ New Season 2026 Trialing
                        </motion.span>
                        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-[0.9] tracking-wider mb-5 drop-shadow-md">
                            SANJIVANI<br />
                            <span className="text-brand-gold">FOOTBALL</span><br />
                            CLUB
                        </h1>
                        <p className="text-blue-50 text-base font-medium leading-relaxed mb-8 max-w-sm drop-shadow-sm">
                            Blue & Gold. Passion & Purpose. The official football team of Sanjivani University.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/squad" className="btn-blue !bg-white !text-brand-blue hover:!bg-slate-50">
                                Meet the Squad <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link href="/matches" className="btn-outline !bg-brand-blue !text-white !border-transparent hover:!bg-brand-blue-light hover:!text-white">
                                <Calendar className="w-4 h-4" /> Fixtures
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
                        className="flex flex-col gap-5 items-start lg:items-end">
                        <ScoreCard />
                    </motion.div>
                </div>
            </section>


            {/* ═══ SUNDAY SERIES ═══════════════════════════════════ */}
            <SundayAnnouncement />

            {/* ═══ TOP SCORERS ════════════════════════════════════ */}
            <TopScorersSection />

            {/* ═══ NEWS ═══════════════════════════════════════════ */}
            <DynamicNewsSection />

            {/* ═══ CTA ════════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden bg-brand-blue shadow-soft-lg">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10 text-center py-20 px-6">
                        <span className="badge bg-white text-brand-blue mb-5 inline-flex shadow-sm">Season 2026/27 Trials Open</span>
                        <h2 className="font-display text-4xl md:text-6xl text-white tracking-wider mb-4 drop-shadow-sm">
                            THINK YOU HAVE WHAT IT TAKES?
                        </h2>
                        <p className="text-blue-100 font-medium max-w-md mx-auto mb-10 text-sm leading-relaxed">
                            Trials open to all enrolled Sanjivani University students. Join the legacy.<br />
                            <span className="mt-2 block font-bold text-white">March 30, 2026 · Main Ground · 7:00 AM</span>
                        </p>
                        <Link href="/recruit" className="btn-blue !bg-brand-gold !text-amber-950 hover:!bg-brand-gold-light !text-base !px-8 !py-3.5 shadow-xl">
                            Apply for Trials <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
