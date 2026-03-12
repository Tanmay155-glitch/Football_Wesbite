'use client'

import { motion } from 'framer-motion'
import { formations, FormationKey, FormationPlayer } from '@/lib/data'

const W = 600, H = 400

function PitchMarkings() {
    const line = 'pitch-line'
    return (
        <g>
            <rect x="10" y="10" width={W - 20} height={H - 20} className={line} />
            <line x1={W / 2} y1="10" x2={W / 2} y2={H - 10} className={line} />
            <circle cx={W / 2} cy={H / 2} r="50" className={line} />
            <circle cx={W / 2} cy={H / 2} r="3" className="fill-white/80" />
            <rect x="10" y={H / 2 - 60} width="90" height="120" className={line} />
            <rect x="10" y={H / 2 - 28} width="30" height="56" className="stroke-white/50 stroke-[1.5px] fill-none" />
            <circle cx="68" cy={H / 2} r="3" className="fill-white/80" />
            <rect x={W - 100} y={H / 2 - 60} width="90" height="120" className={line} />
            <rect x={W - 40} y={H / 2 - 28} width="30" height="56" className="stroke-white/50 stroke-[1.5px] fill-none" />
            <circle cx={W - 68} cy={H / 2} r="3" className="fill-white/80" />
            <rect x="1" y={H / 2 - 18} width="9" height="36" className="stroke-white/80 stroke-2 fill-white/20" />
            <rect x={W - 10} y={H / 2 - 18} width="9" height="36" className="stroke-white/80 stroke-2 fill-white/20" />
        </g>
    )
}

function PlayerMarker({ player, delay }: { player: FormationPlayer; delay: number }) {
    const cx = (player.x / 100) * (W - 20) + 10
    const cy = (player.y / 100) * (H - 20) + 10

    return (
        <motion.g
            animate={{ x: cx, y: cy }}
            initial={{ x: cx, y: cy }}
            transition={{ type: 'spring', stiffness: 130, damping: 22, delay }}
        >
            <circle r="16" fill="rgba(0,0,0,0.15)" cy="2" />
            <circle r="13" fill="#ffffff" stroke="#003087" strokeWidth="2.5" />
            <text x="0" y="0.5" textAnchor="middle" dominantBaseline="middle"
                fill="#003087" fontSize="11" fontFamily="Bebas Neue,Impact,sans-serif" fontWeight="bold">
                {player.number}
            </text>
            <rect x="-24" y="16" width="48" height="11" rx="2" fill="rgba(255,255,255,0.95)" />
            <text x="0" y="23.5" textAnchor="middle"
                fill="#0f172a" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="700">
                {player.name.split(' ')[0]}
            </text>
            <text x="0" y="-18" textAnchor="middle"
                fill="#ffffff" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.5"
                style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}>
                {player.position}
            </text>
        </motion.g>
    )
}

export default function PitchGraphic({ players, formation }: { players: FormationPlayer[], formation: string }) {
    return (
        <div className="bg-white p-3 border border-slate-200 rounded-[2rem] shadow-soft-lg">
            <div className="rounded-3xl overflow-hidden shadow-inner relative border border-black/5"
                style={{ background: 'linear-gradient(175deg, #1e6b32 0%, #29823c 40%, #29823c 60%, #1e6b32 100%)' }}>
                <div className="absolute inset-0 pointer-events-none opacity-40 hover:opacity-100 transition-opacity"
                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 36px, rgba(0,0,0,0.06) 36px, rgba(0,0,0,0.06) 72px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full relative z-10" style={{ aspectRatio: `${W}/${H}` }}
                    aria-label={`Football pitch — ${formation} formation`}>
                    <PitchMarkings />
                    {players.map((p, i) => (
                        <PlayerMarker key={p.id} player={p} delay={i * 0.025} />
                    ))}
                </svg>
            </div>
        </div>
    )
}
