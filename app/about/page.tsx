'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'

const milestones = [
    { year: '2025', title: 'The Founding', desc: 'Sanjivani University officially establishes the football program and begins the recruitment of its first squad.' },
    { year: '2026', title: 'Official Launch', desc: 'The club enters the competitive arena, ready to set the benchmark for university football.' },
]

export default function AboutPage() {
    return (
        <div>
            <PageHero
                eyebrow="Our Journey"
                title="A New Era of Football"
            />

            {/* ── The Vision ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid lg:grid-cols-2 gap-20 items-start">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="section-divider" />
                    <h2 className="heading-section mb-6">A New Chapter</h2>
                    <div className="space-y-5 text-slate-600 font-medium text-[15px] leading-relaxed">
                        <p>Sanjivani University Football Club is more than just a team; it is a movement. Founded in 2025, we are building a world-class football culture that merges high-level athletic performance with academic rigor.</p>
                        <p>We aren't looking for just any players. We are looking for <strong>pioneers</strong>—individuals who want to be the first to lift trophies, the first to set records, and the first to establish a legacy that will last for generations.</p>
                        <p>Under the tactical leadership of Head Coach Neha Koli, Sanjivani FC is starting from a blank slate. This is your chance to write the first page of our history. Whether you are an experienced national-level athlete or a hidden talent on campus, there is a place for those with the heart of a champion.</p>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-0 relative">
                    <div className="absolute left-[17px] top-4 bottom-12 w-px bg-slate-200" />

                    {milestones.map((m, i) => (
                        <motion.div
                            key={m.year}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex gap-6 relative z-10"
                        >
                            <div className="flex flex-col items-center shrink-0">
                                <div className="w-[34px] h-[34px] rounded-full bg-white border-2 border-brand-blue flex items-center justify-center shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                                </div>
                            </div>
                            <div className="pb-10 pt-1.5">
                                <div className="text-[15px] font-bold text-slate-900 mb-1 leading-none">
                                    {m.title} <span className="text-brand-blue font-semibold text-[13px] ml-2">{m.year}</span>
                                </div>
                                <div className="text-slate-500 text-sm font-medium leading-relaxed">{m.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Why Join Us? ─────────────────────────── */}
            <section className="bg-slate-50 border-y border-slate-200 py-20 px-4 shadow-inner">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <div className="section-divider mx-auto" />
                    <h2 className="heading-section">Why Play for Sanjivani FC?</h2>
                </div>
                
                <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
                    {[
                        { icon: '🚀', title: 'Build a Legacy', desc: 'Be a founding member. Every goal you score and every match you win will stay in our history forever.' },
                        { icon: '⚽', title: 'Pro Coaching', desc: 'Train under professional coaches with experience at the state and national levels.' },
                        { icon: '🏟️', title: 'Premium Units', desc: 'Access top-tier university facilities, equipment, and a dedicated support team.' },
                    ].map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            viewport={{ once: true }}
                            className="card-hover p-8 text-center bg-white"
                        >
                            <div className="text-4xl mb-5">{icon}</div>
                            <h3 className="font-display text-2xl text-slate-900 tracking-wider mb-2.5">{title}</h3>
                            <p className="text-slate-500 font-medium text-[13px] leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Call to Action ───────────────────── */}
            <section className="max-w-4xl mx-auto px-4 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-brand-blue rounded-[32px] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden"
                >
                    {/* Background decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    
                    <h2 className="font-display text-4xl md:text-5xl tracking-widest mb-6 relative z-10">THE FUTURE IS YOURS</h2>
                    <p className="text-blue-100 text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
                        We are building more than a team; we are building a family. If you have the passion, the grit, and the talent—then you belong on this pitch.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <motion.a 
                            href="/recruit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-brand-gold text-slate-900 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg hover:bg-yellow-400 transition-colors"
                        >
                            Apply for Trials
                        </motion.a>
                        <motion.a 
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white/20 transition-colors"
                        >
                            Contact Coaching Staff
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
