import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClientBody } from "./client-body";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Me Tira Daqui!",
  description:
    "Vote anonimamente pra ir embora do rolê sem ser o chatão. Quando a maioria votar, todo mundo fica sabendo!",
  icons: {
    icon: "/favicon.svg",
    apple: "/api/icon?size=192",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Me Tira Daqui!",
  },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('metiradaqui-theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

const localeScript = `
(function(){
  try {
    var l = localStorage.getItem('metiradaqui-locale');
    if (l === 'en' || l === 'pt-BR') {
      document.documentElement.lang = l;
    } else if (!navigator.language.startsWith('pt')) {
      document.documentElement.lang = 'en';
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
