import { siteUrl, socials } from '~/data/site'

interface StructuredDataInput {
  name: string
  fullName: string
  jobTitle: string
  language: string
}

const profileLinks = socials.filter(({ href }) => href.startsWith('https')).map(({ href }) => href)

export const buildStructuredData = ({
  name,
  fullName,
  jobTitle,
  language,
}: StructuredDataInput) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name,
      inLanguage: language,
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: fullName,
      alternateName: name,
      jobTitle,
      url: siteUrl,
      image: `${siteUrl}/images/profile.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Morelia',
        addressRegion: 'Michoacán',
        addressCountry: 'MX',
      },
      sameAs: profileLinks,
    },
  ],
})
