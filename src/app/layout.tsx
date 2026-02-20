import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "공간임대 수익률 계산기",
  description:
    "에어비앤비, 단기임대 투자 수익률을 쉽고 빠르게 계산하세요. 총수익률, 순수익률, 투자회수기간 등 상세 분석을 제공합니다.",
  openGraph: {
    title: "공간임대 수익률 계산기",
    description:
      "에어비앤비, 단기임대 투자 수익률을 쉽고 빠르게 계산하세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
