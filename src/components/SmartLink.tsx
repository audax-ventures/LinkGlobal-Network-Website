import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { isExternal } from '../content/site'

// Router <Link> for internal paths, a plain <a> for external URLs (e.g. the
// platform signup once LEARNER_SIGNUP_URL points off-site).
export default function SmartLink({
  to,
  className,
  style,
  children,
}: {
  to: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  if (isExternal(to)) {
    return (
      <a href={to} className={className} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className} style={style}>
      {children}
    </Link>
  )
}
