'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
    eyebrow?: string
    title: string
    gradient?: boolean
    imageUrl?: string
}

export default function PageHero({ eyebrow, title, imageUrl }: PageHeroProps) {
    return (
        <section className="relative h-64 flex items-end overflow-hidden bg-white border-b border-slate-200">
            {/* Background */}
            {imageUrl ? (
                <div className="absolute inset-0">
                    <img src={imageUrl} alt="" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                </div>
            ) : (
                <>
                    {/* Light clean gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50" />
                    {/* Subtle dot pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(#003087 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />
                </>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {eyebrow && (
                        <p className={`label-sm mb-2 ${imageUrl ? 'text-brand-gold' : 'text-brand-blue'}`}>
                            {eyebrow}
                        </p>
                    )}
                    <h1 className={`heading-section text-4xl md:text-5xl ${imageUrl ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h1>
                </motion.div>
            </div>
        </section>
    )
}
