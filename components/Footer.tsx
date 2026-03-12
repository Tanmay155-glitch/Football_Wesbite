'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Shield, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Clock, Calendar, ChevronRight } from 'lucide-react'

export default function Footer() {
    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/squad', label: 'The Squad' },
        { href: '/matches', label: 'Match Center' },
        { href: '/virtual-pitch', label: 'Tactical Pitch' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/recruit', label: 'Join the Team' },
    ]

    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.includes('@')) {
            setSubscribed(true)
            setEmail('')
        }
    }

    return (
        <footer className="bg-brand-blue-dark border-t border-white/10 mt-auto">

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-md">
                                <Shield className="w-5 h-5 text-brand-blue-dark" />
                            </div>
                            <div>
                                <div className="font-display text-xl tracking-wider text-white">SANJIVANI FC</div>
                                <div className="text-[9px] text-brand-gold/70 tracking-widest uppercase">University Football Club</div>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Representing Sanjivani University with pride, passion, and performance. Est. 2015. Blue & Gold forever.
                        </p>
                        <div className="flex items-center gap-2.5">
                            {[
                                { Icon: Instagram, label: 'Instagram', href: '#' },
                                { Icon: Twitter, label: 'Twitter', href: '#' },
                                { Icon: Youtube, label: 'YouTube', href: '#' },
                            ].map(({ Icon, label, href }) => (
                                <a key={label} href={href} aria-label={label}
                                    className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold text-white/60 hover:text-brand-blue-dark transition-all duration-200 hover:scale-105 hover:shadow-md">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-brand-gold font-bold uppercase tracking-widest text-[11px] mb-5">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}
                                        className="text-white/50 text-sm font-medium hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-white/0 group-hover:bg-brand-gold transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-brand-gold font-bold uppercase tracking-widest text-[11px] mb-5">Contact</h4>
                        <ul className="space-y-4">
                            {[
                                { Icon: MapPin, text: 'Sanjivani University, Kopargaon, Maharashtra 423603' },
                                { Icon: Mail, text: 'football@sanjivani.edu.in' },
                                { Icon: Phone, text: '+91 2423 225 500' },
                            ].map(({ Icon, text }) => (
                                <li key={text} className="flex items-start gap-3 text-white/50 text-sm">
                                    <Icon className="w-4 h-4 mt-0.5 text-brand-gold/60 shrink-0" />
                                    <span className="leading-relaxed font-medium">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-brand-gold font-bold uppercase tracking-widest text-[11px] mb-5">Stay Updated</h4>
                        <p className="text-white/50 text-sm font-medium leading-relaxed mb-5">
                            Get match alerts, results, and news directly to your inbox.
                        </p>
                        {!subscribed ? (
                            <form onSubmit={handleSubscribe} className="space-y-2.5">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 transition-all"
                                />
                                <button type="submit"
                                    className="w-full bg-brand-gold text-amber-950 font-bold text-sm py-3 rounded-xl hover:bg-brand-gold-light transition-all duration-200 shadow-sm hover:shadow-md">
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm font-medium text-center">
                                ✅ You're subscribed! We'll keep you posted.
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs font-medium">
                        © {new Date().getFullYear()} Sanjivani University Football Club. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs font-medium">
                        Built with 💙 by Sanjivani Tech Sports Division
                    </p>
                </div>
            </div>
        </footer>
    )
}
