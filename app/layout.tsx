import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "盧駿軒 Dickson Lo｜資深產品經理";
const description =
  "具備 10 年產品管理經驗，專注 SaaS、平台產品、管理後台與 AI 工作流自動化。";

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
      locale: "zh_TW",
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
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
