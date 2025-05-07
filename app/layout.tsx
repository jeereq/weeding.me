import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: 'Weeding.me | Invitations Électroniques Élégantes et Personnalisables',
  description: 'Créez des invitations électroniques élégantes et personnalisables pour vos mariages, anniversaires et événements spéciaux. Simple, écologique et mémorable.',
};

const candara = localFont({
  src: [
    {
      path: "../fonts/Candara.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Candara_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Candara_Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lovers+Quarrel&family=Pinyon+Script&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet" />
      </head>
      <body className={candara.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}