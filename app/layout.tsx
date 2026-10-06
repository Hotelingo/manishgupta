import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/public-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getContent } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#0e2240" };

const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const showSampleBanner = content.source === "sample" && process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {showSampleBanner && <div className="sample-banner">Showing built-in sample content. Connect Supabase to edit it.</div>}
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter content={content} />
        {ga4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{linker:{domains:['camanishgupta.com','book.ehotelmanagementschool.com','app.ehotelmanagementschool.com']}});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
