'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { galleryImages } from '@/lib/data'

const categories = ['All', 'Match', 'Training', 'Celebration', 'Stadium', 'Club']

export default function GalleryPage() {
    const [filter, setFilter] = useState('All')
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

    const filtered = filter === 'All' ? galleryImages : galleryImages.filter(g => g.category === filter)

    const prev = () => setLightboxIdx(i => i === null ? null : (i - 1 + filtered.length) % filtered.length)
    const next = () => setLightboxIdx(i => i === null ? null : (i + 1) % filtered.length)

    return (
        <div>
            <PageHero eyebrow="Visual Stories" title="Gallery" />

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                {/* Filter */}
                <div className="flex flex-wrap gap-2.5 mb-14 justify-center">
                    {categories.map(cat => (
                        <button key={cat} id={`gcat-${cat.toLowerCase()}`} onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 shadow-sm
                ${filter === cat
                                    ? 'bg-brand-blue text-white border-brand-blue'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-brand-blue/30 hover:text-brand-blue'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filtered.map((img, i) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-soft-lg hover:border-brand-blue/30 transition-all duration-500 bg-slate-50"
                            onClick={() => setLightboxIdx(i)}
                        >
                            <Image
                                src={img.url}
                                alt={img.caption}
                                width={400}
                                height={300}
                                className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-brand-blue/20 transition-all duration-500 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm scale-90 group-hover:scale-100">
                                    <ZoomIn className="w-5 h-5 text-brand-blue" />
                                </div>
                            </div>
                            {/* Caption */}
                            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3.5 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500">
                                <span className="badge-gold text-[9px] mb-1.5 inline-flex">{img.category}</span>
                                <p className="text-slate-800 text-xs font-bold leading-tight">{img.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setLightboxIdx(null)}
                    >
                        <button onClick={() => setLightboxIdx(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors z-10">
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <button onClick={e => { e.stopPropagation(); prev() }}
                            className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-brand-gold/80 rounded-full flex items-center justify-center z-10 transition-colors">
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        <motion.div
                            key={lightboxIdx}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="max-w-5xl w-full px-16 md:px-24 flex flex-col items-center"
                        >
                            <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                <Image
                                    src={filtered[lightboxIdx].url}
                                    alt={filtered[lightboxIdx].caption}
                                    width={1200} height={800}
                                    className="object-contain max-h-[75vh]"
                                />
                            </div>
                            <div className="mt-5 text-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                <p className="text-white text-[15px] font-medium">{filtered[lightboxIdx].caption}</p>
                                <p className="text-white/50 text-xs font-bold mt-1 tracking-widest uppercase">{lightboxIdx + 1} / {filtered.length}</p>
                            </div>
                        </motion.div>

                        <button onClick={e => { e.stopPropagation(); next() }}
                            className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-brand-gold/80 rounded-full flex items-center justify-center z-10 transition-colors">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
