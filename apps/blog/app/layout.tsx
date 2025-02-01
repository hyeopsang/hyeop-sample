import "@nettee-sample/ui/globals.css";

import localFont from "next/font/local";
import { Metadata } from "next";
import Header from "./_components/Header";
import { Providers } from "@/components/providers";

const pretendard = localFont({
  src: "./font/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "게시판",
  description: "내 마음대로 글쓰기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="font-pretendard bg-[#4A7DFF] flex flex-wrap">
        <header>
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
