import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="flex justify-end p-3">
            <ThemeToggle />
          </header>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
