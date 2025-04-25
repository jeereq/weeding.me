import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: 'InviteVite | Invitations Électroniques Élégantes et Personnalisables',
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
      <body  className={candara.className}>
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