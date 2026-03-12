'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, User, Hash, Building, Briefcase, Phone, FileText, ChevronDown, Calendar, Clock, MapPin } from 'lucide-react'
import PageHero from '@/components/PageHero'

interface FormData {
    fullName: string; rollNumber: string; department: string
    position: string; contact: string; statement: string
}
type FormErrors = Partial<Record<keyof FormData, string>>

const positions = ['Goalkeeper (GK)', 'Defender (CD)', 'Defender (RD/LD)', 'Midfielder (CM)', 'Midfielder (DM)', 'Midfielder (AM)', 'Winger (RW/LW)', 'Forward (ST)']
const departments = [
    'AIDS',
    'AIML',
    'BBA',
    'BCS/MCS',
    'CSE',
    'CY',
    'Integrated B.Tech',
    'Integrated M.Tech',
    'M.Com',
    'MBA',
    'MCA/BCA'
]

function validate(d: FormData): FormErrors {
    const e: FormErrors = {}
    if (d.fullName.trim().length < 3) e.fullName = 'Enter your full name (min. 3 chars)'
    if (!d.rollNumber.trim()) e.rollNumber = 'Roll number is required'
    if (!d.department) e.department = 'Select your department'
    if (!d.position) e.position = 'Select your preferred position'
    if (!/^[6-9]\d{9}$/.test(d.contact.trim())) e.contact = 'Enter a valid 10-digit Indian mobile number'

    return e
}

const inputBase = (err?: string) =>
    `w-full bg-slate-50 border ${err ? 'border-red-400 ring-4 ring-red-50' : 'border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-50'} rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none transition-all duration-200 shadow-sm`

function Field({ label, id, icon: Icon, error, children }: { label: string; id: string; icon: React.ElementType; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <Icon className="w-3.5 h-3.5 text-brand-blue" /> {label}
            </label>
            {children}
            <div className="min-h-[16px]">
                <AnimatePresence>
                    {error && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-red-500 text-[11px] font-medium pl-1">
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default function RecruitPage() {
    const blank: FormData = { fullName: '', rollNumber: '', department: '', position: '', contact: '', statement: '' }
    const [form, setForm] = useState<FormData>(blank)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmit] = useState(false)

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        if (errors[name as keyof FormErrors]) setErrors(e => ({ ...e, [name]: undefined }))
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate(form)
        if (Object.keys(errs).length) { setErrors(errs); return }
        
        setIsSubmitting(true)
        try {
            const res = await fetch('/api/recruit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            if (res.ok) {
                setSubmit(true)
            } else {
                const data = await res.json()
                setErrors({ statement: data.error || 'Failed to send application. Please try again later.' })
            }
        } catch (err) {
            setErrors({ statement: 'An error occurred. Please check your connection.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-16">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="bg-white border text-center shadow-soft-lg max-w-sm w-full p-10 rounded-3xl"
                >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25, type: 'spring' }}
                        className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <h2 className="font-display text-4xl text-slate-800 tracking-wider mb-2">Application Sent!</h2>
                    <p className="text-slate-500 text-[13px] font-medium leading-relaxed mb-6">
                        Thank you, <span className="text-slate-800 font-bold">{form.fullName}</span>. Our coaching staff will contact you at <span className="text-brand-blue font-bold">{form.contact}</span> within 5 working days.
                    </p>
                    <div className="card bg-slate-50 border-slate-200 p-4 text-left space-y-2.5 text-[11px] font-medium text-slate-600 mb-8 shadow-inner">
                        <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-brand-blue" /> 5:30 PM – 7:00 PM</div>
                        <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-brand-blue" /> Football Ground, Sanjivani</div>
                    </div>
                    <button onClick={() => { setSubmit(false); setForm(blank) }} className="btn-outline w-full justify-center">
                        Submit Another Application
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div>
            <PageHero eyebrow="Season 2026/27" title="Join the Team" />

            <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 grid lg:grid-cols-5 gap-12 items-start">
                {/* Sidebar */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="section-divider" />
                    <h2 className="font-display text-3xl text-slate-800 tracking-wider mb-2">Trial Info</h2>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                        Bring your university ID and wear appropriate sports attire. All positions are currently open for trials.
                    </p>

                    <div className="space-y-3">
                        {[
                            { Icon: Clock, label: 'Time', v: '5:30 PM – 7:00 PM' },
                            { Icon: MapPin, label: 'Venue', v: 'Football Ground, Sanjivani' },
                            { Icon: User, label: 'Open to', v: 'All enrolled students' },
                        ].map(({ Icon, label, v }) => (
                            <div key={label} className="card p-4 flex gap-4 items-center bg-white border-slate-200">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-brand-blue" />
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
                                    <div className="text-slate-800 text-sm font-bold">{v}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
                    <form onSubmit={submit} noValidate className="card bg-white p-8 md:p-10 border-slate-200 shadow-soft-lg space-y-6">
                        <h3 className="font-display text-3xl text-brand-blue tracking-wider mb-2">Application Form</h3>

                        <Field label="Full Name" id="fullName" icon={User} error={errors.fullName}>
                            <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handle}
                                placeholder="As per university records" className={inputBase(errors.fullName)} />
                        </Field>
                        <Field label="Roll Number" id="rollNumber" icon={Hash} error={errors.rollNumber}>
                            <input id="rollNumber" name="rollNumber" type="text" value={form.rollNumber} onChange={handle}
                                placeholder="e.g. SU2024CS001" className={inputBase(errors.rollNumber)} />
                        </Field>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Field label="Department" id="department" icon={Building} error={errors.department}>
                                <div className="relative">
                                    <select id="department" name="department" value={form.department} onChange={handle}
                                        className={`${inputBase(errors.department)} appearance-none pr-10 cursor-pointer`}>
                                        <option value="" disabled>Select department</option>
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </Field>
                            <Field label="Position" id="position" icon={Briefcase} error={errors.position}>
                                <div className="relative">
                                    <select id="position" name="position" value={form.position} onChange={handle}
                                        className={`${inputBase(errors.position)} appearance-none pr-10 cursor-pointer`}>
                                        <option value="" disabled>Select position</option>
                                        {positions.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </Field>
                        </div>
                        <Field label="Mobile Number" id="contact" icon={Phone} error={errors.contact}>
                            <input id="contact" name="contact" type="tel" value={form.contact} onChange={handle}
                                placeholder="10-digit number" maxLength={10} className={inputBase(errors.contact)} />
                        </Field>
                        <Field label="Brief Statement (Optional)" id="statement" icon={FileText} error={errors.statement}>
                            <textarea id="statement" name="statement" value={form.statement} onChange={handle}
                                rows={4} placeholder="Tell us about your football experience and why you want to join..."
                                className={`${inputBase(errors.statement)} resize-none`} />
                            <div className="text-right text-[10px] font-bold text-slate-400 mt-1">{form.statement.length}/500</div>
                        </Field>

                        <motion.button type="submit" 
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className={`btn-blue w-full justify-center !py-4 !text-base mt-2 shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                        </motion.button>
                        <p className="text-slate-400 text-[11px] font-medium text-center">Your information is used solely for trial selection purposes.</p>
                    </form>
                </div>
            </section>
        </div>
    )
}
