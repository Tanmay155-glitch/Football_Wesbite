'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, User, ArrowLeft, Phone } from 'lucide-react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { coach } from '@/lib/data'

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const subjects = [
  'General Inquiry',
  'Trial Questions',
  'Player Development',
  'Sponsorship & Partnership',
  'Other'
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: subjects[0],
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'Failed to send message')

      setStatus('success')
      setFormData({ fullName: '', email: '', subject: subjects[0], message: '' })
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <PageHero eyebrow="Message Sent" title="Get In Touch" />
        <section className="max-w-xl mx-auto px-4 py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 bg-blue-50/50 border-blue-100"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="font-display text-4xl text-slate-900 tracking-wider mb-4">MESSAGE RECEIVED!</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-10">
              Thank you for reaching out. Coach Neha has received your message and will get back to you as soon as possible via email.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg hover:shadow-brand-blue/20 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Back to About
            </Link>
          </motion.div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageHero eyebrow="Leadership" title="Contact Coach" />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* 左侧: Coach Info */}
          <div className="w-full lg:w-1/3 shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card overflow-hidden bg-white border-slate-200"
            >
              <div className="h-64 relative">
                <img 
                  src={coach.imageUrl} 
                  alt={coach.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-display text-2xl tracking-wider leading-none">{coach.name}</h3>
                  <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mt-2">{coach.title}</p>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Official Channels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                        <Mail className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.05em]">Email Address</p>
                        <p className="text-slate-700 font-bold text-sm">nehakoli987@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-[13px] text-slate-500 font-medium leading-relaxed">
                  "I am dedicated to finding and nurturing the next generation of football talent at Sanjivani. Whether you have questions about trials, training, or a future in recruitment, don't hesitate to reach out."
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右侧: Form */}
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8 md:p-12 bg-white border-slate-200 shadow-soft-xl"
            >
              <div className="mb-10">
                <div className="section-divider mb-4" />
                <h2 className="font-display text-3xl text-slate-900 tracking-wider">SEND A MESSAGE</h2>
                <p className="text-slate-500 font-medium text-sm mt-2">Fill out the form below and Coach Neha will get back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label-sm flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input 
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="form-input"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-sm flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <input 
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="form-input"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-sm flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Subject
                  </label>
                  <select 
                    className="form-input appearance-none bg-no-repeat bg-[right_1.5rem_center]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundSize: '1rem' }}
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="label-sm flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Your Message
                  </label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="form-input resize-none"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center gap-3 text-rose-700 text-sm font-semibold"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue text-white py-5 rounded-2xl font-bold tracking-widest uppercase shadow-lg shadow-brand-blue/20 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
