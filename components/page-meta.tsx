import Head from "next/head"

interface PageMetaProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export function PageMeta({
  title,
  description = "A subscription-based shared cab service for your daily commute",
  keywords = [],
  ogImage = "/images/og-image.png",
}: PageMetaProps) {
  const fullTitle = title ? `${title} | ShareCab` : "ShareCab - Subscription Cab Service"

  const allKeywords = ["cab", "taxi", "ride-sharing", "subscription", "commute", "transportation", ...keywords].join(
    ", ",
  )

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
