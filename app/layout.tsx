// app/layout.tsx - Root layout that wraps everything
import "./globals.css";
import type { Metadata } from "next";
import {
  Montserrat,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Thai,
  Poppins,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  preload: false,
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
  preload: false,
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

const setColorSchemeScript = `
(function() {
  try {
    var savedScheme = localStorage.getItem('color-scheme');
    var scheme = savedScheme === 'light' || savedScheme === 'dark'
      ? savedScheme
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('color-scheme', scheme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`no-touch ${poppins.variable} ${montserrat.variable} ${notoSansJp.variable} ${notoSansKr.variable} ${notoSansTc.variable} ${notoSansThai.variable} ${notoSansSc.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setColorSchemeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
