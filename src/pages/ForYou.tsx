import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { CheckIcon } from '../components/icons/LineIcons'

interface Audience {
  eyebrow: string
  title: string
  image: string
  color: string
  points: string[]
  cta: { label: string; to: string }
}

const AUDIENCES: Audience[] = [
  {
    eyebrow: 'For Learners',
    title: 'Learn the way a language is actually spoken.',
    image: '/photos/learners.jpg',
    color: '#1ba3e0',
    points: [
      'Personalized pacing built around your goals and schedule',
      '1:1 sessions with real, native-speaking tutors',
      'AI-supported practice reports that track real progress',
    ],
    cta: { label: 'Explore For Learners', to: '/learners' },
  },
  {
    eyebrow: 'For Educators',
    title: 'Teach on your own schedule, from anywhere.',
    image: '/photos/educators.jpg',
    color: '#f5a623',
    points: [
      'Set your own hours and rates',
      'Get paid reliably for sessions you already love giving',
      'Connect with motivated learners across 120+ countries',
    ],
    cta: { label: 'Explore For Educators', to: '/educators' },
  },
  {
    eyebrow: 'For Institutions',
    title: 'Bring real conversation practice to your classroom or team.',
    image: '/gallery/dashboard.png',
    color: '#2dd4bf',
    points: [
      'Bulk seats for schools, companies, and language programs',
      'Admin dashboards to track cohort progress at a glance',
      'Dedicated onboarding support for your organization',
    ],
    cta: { label: 'Get in Touch', to: '/contact' },
  },
]

export default function ForYou() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Who It's For"
        title={
          <>
            Made for learners, tutors, <span className="text-gradient-brand">and institutions alike.</span>
          </>
        }
        description="Whoever you are in the language-learning equation, LinkGlobal Network was built with your side of it in mind."
        image={{ src: '/photos/hero-learner.jpg', alt: 'A student learning with LinkGlobal Network' }}
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {AUDIENCES.map((a, i) => (
            <motion.div
              key={a.eyebrow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(19,41,82,0.15)]">
                <img src={a.image} alt={a.title} className="aspect-[4/3] w-full object-cover" />
              </div>

              <div className="rounded-3xl bg-white px-6 py-8 sm:px-9 sm:py-9 shadow-[0_15px_40px_rgba(19,41,82,0.1)]">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white"
                  style={{ background: a.color }}
                >
                  {a.eyebrow}
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-navy-950">{a.title}</h2>
                <ul className="mt-6 space-y-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-navy-700/80">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: a.color }}
                      >
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={a.cta.to}
                  className="mt-8 inline-block rounded-full border-2 px-7 py-3 text-sm font-semibold transition-colors hover:text-white"
                  style={{ borderColor: a.color, color: a.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = a.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {a.cta.label}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        description="Jump straight in and try a session, or talk to us about what would work best for you."
        primary={{ label: 'Start Your Journey', to: '/try-now' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageShell>
  )
}
