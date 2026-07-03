"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { IconoCasa, IconoEscanear, IconoTrofeo, IconoMapa, IconoHoja } from "./Icons";
import { CountUp } from "./CountUp";

const ENLACES = [
  { href: "/", nombre: "Inicio", Icono: IconoCasa },
  { href: "/escanear", nombre: "Escanear", Icono: IconoEscanear },
  { href: "/retos", nombre: "Retos", Icono: IconoTrofeo },
  { href: "/mapa", nombre: "Mapa", Icono: IconoMapa },
];

export function Cabecera() {
  const pathname = usePathname();
  const { estado } = useStore();

  return (
    <header className="cabecera">
      <div className="cabecera-inner">
        <Link href="/" className="logo">
          <span className="logo-medalla">
            <IconoHoja style={{ color: "#fff", width: 20, height: 20 }} />
          </span>
          EcoPatrulla
        </Link>
        <nav className="nav-escritorio" aria-label="Principal">
          {ENLACES.map(({ href, nombre }) => (
            <Link key={href} href={href} className={`nav-enlace ${pathname === href ? "activo" : ""}`}>
              {nombre}
            </Link>
          ))}
        </nav>
        <span className="chip-puntos" title="Tus EcoPuntos">
          <IconoHoja style={{ width: 17, height: 17 }} />
          <CountUp valor={estado.puntos} />
        </span>
      </div>
    </header>
  );
}

export function BarraInferior() {
  const pathname = usePathname();
  return (
    <nav className="barra-inferior" aria-label="Principal móvil">
      {ENLACES.map(({ href, nombre, Icono }) => {
        const activo = pathname === href;
        if (href === "/escanear") {
          return (
            <Link key={href} href={href} className="tab tab-escanear">
              <span className="tab-burbuja">
                <Icono />
              </span>
              <span>{nombre}</span>
            </Link>
          );
        }
        return (
          <Link key={href} href={href} className={`tab ${activo ? "activo" : ""}`}>
            <Icono />
            <span>{nombre}</span>
          </Link>
        );
      })}
    </nav>
  );
}
