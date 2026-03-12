'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/squad', label: 'Squad' },
    { href: '/coach', label: 'Coach' },
    { href: '/matches', label: 'Matches' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/virtual-pitch', label: 'Pitch' },
    { href: '/recruit', label: 'Join Us' },
]

export default function Header() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Determine if we're on the home page which has a dark hero image
    const isHome = pathname === '/'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        // Check initial scroll position
        setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close drawer on navigation
    useEffect(() => { setOpen(false) }, [pathname])

    // Header styles logic
    const headerBg = scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
        : 'bg-transparent border-b border-transparent'

    const textColor = scrolled ? 'text-slate-600' : (isHome ? 'text-white/90' : 'text-slate-600')
    const textColorHover = scrolled ? 'hover:text-brand-blue' : (isHome ? 'hover:text-white' : 'hover:text-brand-blue')
    const logoText = scrolled ? 'text-brand-blue border-brand-blue' : (isHome ? 'text-white border-white/20' : 'text-brand-blue border-brand-blue/20')
    const subLogoText = scrolled ? 'text-slate-500' : (isHome ? 'text-white/70' : 'text-slate-500')

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-300 ${headerBg}`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="hidden sm:block leading-tight">
                            <div className={`font-display text-[17px] tracking-widest transition-colors ${logoText}`}>SANJIVANI FC</div>
                            <div className={`text-[9px] tracking-[0.2em] uppercase transition-colors ${subLogoText}`}>University Football</div>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const active = pathname === link.href
                            const isJoin = link.href === '/recruit'

                            if (isJoin) {
                                return (
                                    <Link key={link.href} href={link.href} className="btn-blue ml-2 text-xs !px-4 !py-2 shadow-none">
                                        {link.label}
                                    </Link>
                                )
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200
                    ${active ? (scrolled || !isHome ? 'text-brand-blue' : 'text-brand-gold') : `${textColor} ${textColorHover}`}`}
                                >
                                    {link.label}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${scrolled || !isHome ? 'bg-brand-blue' : 'bg-brand-gold'}`}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setOpen(v => !v)}
                        aria-label="Toggle navigation"
                        className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors
              ${scrolled || !isHome ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                            className="fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-2xl flex flex-col md:hidden"
                        >
                            <div className="h-16 flex items-center px-5 border-b border-slate-100">
                                <span className="font-display text-lg tracking-widest text-brand-blue">SANJIVANI FC</span>
                            </div>
                            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                                {navLinks.map((link, i) => {
                                    const active = pathname === link.href
                                    const isJoin = link.href === '/recruit'
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04, duration: 0.25 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                          ${isJoin
                                                        ? 'bg-brand-blue text-white text-center mt-3 shadow-sm'
                                                        : active
                                                            ? 'bg-blue-50 text-brand-blue'
                                                            : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
