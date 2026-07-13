import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Dickson Lo | Senior Product Manager";
const description =
  "Senior product manager with 10 years of experience across SaaS, platform products, admin systems, and AI workflow automation.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const baseUrl = host ? `${protocol}://${host}` : "https://localhost";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      type: "profile",
      locale: "en_US",
      title,
      description,
      url: baseUrl,
      siteName: "Dickson Lo CV",
      images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
