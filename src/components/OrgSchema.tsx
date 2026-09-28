import { ADDRESS, BRAND, CONTACT_EMAIL, SOCIAL } from '../content/site'

// Site-wide Organization structured data (copy v7 section 09): name, logo,
// Canadian address, contact email, social profiles. Built from
// content/site.ts so it fills in as those details are confirmed. Absolute
// URLs use the canonical origin (the production domain, set at build time).
export default function OrgSchema() {
  const canonical = typeof document !== 'undefined' ? document.querySelector<HTMLLinkElement>('link[rel="canonical"]') : null
  const origin = canonical ? new URL(canonical.href).origin : ''
  const address: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'CA' }
  if (ADDRESS.street) address.streetAddress = ADDRESS.street
  if (ADDRESS.city) address.addressLocality = ADDRESS.city
  if (ADDRESS.region) address.addressRegion = ADDRESS.region
  if (ADDRESS.postalCode) address.postalCode = ADDRESS.postalCode
  const sameAs = [SOCIAL.instagram, SOCIAL.linkedin].filter((u): u is string => !!u)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: `${origin}/`,
    logo: `${origin}/brand/linkglobal-logo.svg`,
    email: CONTACT_EMAIL,
    address,
    ...(sameAs.length ? { sameAs } : {}),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
