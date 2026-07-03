import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "EcoPatrulla — Recicla jugando",
  description:
    "La app donde los niños aprenden a reciclar jugando: escanea residuos con IA, gana EcoPuntos y descubre el impacto de tu distrito.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e9e6b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%232e9e6b"/><text x="50" y="68" font-size="52" text-anchor="middle">🌱</text></svg>'
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
