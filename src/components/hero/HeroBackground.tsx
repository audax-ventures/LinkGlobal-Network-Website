import { motion } from 'framer-motion'

/**
 * Lightweight, performant hero backdrop — animated gradient orbs and a slowly
 * drifting grid, no WebGL. Keeps the "tech-forward, in motion" feel without a
 * second globe scene stacked right after the loading sequence's.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #030407 0%, #0a1128 45%, #132952 100%)' }}
      />

      <motion.div
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(62,198,255,0.35), transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-160px] top-1/3 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(143,224,255,0.25), transparent 70%)' }}
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-1/3 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(27,163,224,0.3), transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(143,224,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(143,224,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 30%, transparent 30%, #030407 100%)' }}
      />
    </div>
  )
}
