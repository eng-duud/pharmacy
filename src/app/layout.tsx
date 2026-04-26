import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "صيدلية القدس | رعاية صحية متكاملة لثقتكم",
  description: "صيدلية القدس في صنعاء - خدمة التوصيل متوفرة لجميع المناطق. أجهزة طبية، أدوية، مستلزمات العناية بالبشرة والأطفال.",
  keywords: "صيدلية، صنعاء، أدوية، إرسال وصفة، رعاية صحية، صيدلية القدس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${tajawal.variable} font-tajawal bg-white dark:bg-slate-950 transition-colors duration-300`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
