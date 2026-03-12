'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

const variants = {
    hidden: { opacity: 0, y: 12 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-slate-200 border-t-brand-blue rounded-full animate-spin" /></div>}>
                    {children}
                </Suspense>
            </motion.div>
        </AnimatePresence>
    )
}
