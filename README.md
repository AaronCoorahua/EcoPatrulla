# 🌱 EcoPatrulla — Recicla jugando

App web de gamificación del reciclaje **para niños**, construida para la Hackathon QuipuSoft 2026.
Los niños escanean residuos con IA, aprenden en qué tacho va cada cosa (código de colores NTP 900.058),
ganan EcoPuntos, insignias y rangos, conversan con Kusi (la llama guía con IA), compiten con su
familia y ven el impacto de su distrito en un mapa.

## Desafíos QuipuSoft que cubre

| # | Desafío | Cómo lo cubre |
|---|---------|---------------|
| 01 | Identificación automática de residuos | Escáner con foto/cámara + API Gemini (con simulador de respaldo) |
| 02 | Agente conversacional educativo | Chat con Kusi: opciones guiadas tipo chips + texto libre con Gemini |
| 03 | Gamificación del reciclaje | EcoPuntos, rangos, insignias, misiones diarias, racha, reto semanal |
| 04 | Integración con datos locales | Puntos de acopio con horarios y materiales en el mapa |
| 05 | Personalización por hábitos | Misiones y consejos según lo que escanea el niño |
| 06 | Medición del impacto ambiental | CO₂ y agua por usuario + mapa de impacto por distrito (vista municipalidades) |
| 07 | Experiencias simples e inclusivas | Lenguaje para niños, mascota guía (Kusi), responsive a distintos dispositivos |

## Cómo correr

```bash
npm install
npm run dev
```

Abre http://localhost:3000. **No necesita nada más**: toda la data está mockeada en
memoria local (`localStorage`), sin base de datos ni login.

- El botón **"Reiniciar demo"** (pie de página) restaura el estado inicial de demostración.
- El estado inicial ya trae historia (295 puntos, racha de 4 días, insignias) para que
  la demo se sienta viva. Está calibrado para que **el primer vidrio escaneado** dispare
  celebraciones en cadena: insignia "Cristalino", misión cumplida (+15), "¡Superaste a Mamá!"
  e insignia "Estrella de casa".

## IA con Gemini (escáner y chat)

Por defecto, tanto el escáner como el chat de Kusi usan un **simulador** (el escáner
adivina por el nombre del archivo; el chat responde con reglas por palabras clave)
para que la demo funcione sin internet y sin claves.

Para usar **Gemini real** (identifica la foto de verdad y conversa libremente):

1. Consigue una API key en https://aistudio.google.com/apikey
2. Crea `.env.local` en la raíz del proyecto:
   ```
   GEMINI_API_KEY=tu_clave_aqui
   ```
3. Reinicia `npm run dev`. Si Gemini falla o no hay red, cae automáticamente al simulador.

Las llamadas viven en [app/api/identificar/route.ts](app/api/identificar/route.ts) (visión,
JSON estructurado) y [app/api/kusi/route.ts](app/api/kusi/route.ts) (chat con personalidad
de Kusi), ambas con `gemini-2.5-flash`.

## Guión sugerido para el video (3 min)

| Tiempo | Escena | Qué mostrar |
|--------|--------|-------------|
| 0:00–0:15 | Onboarding | Escribir nombre, elegir compañero (la figura cambia), "¡A patrullar!" — sin login |
| 0:15–0:40 | Inicio | Saludo de Kusi (animada), EcoPuntos, racha, rango, misiones del día |
| 0:40–1:25 | **Escanear** (la estrella) | Subir foto de una botella (o cámara / ejemplo "Frasco"). Análisis IA → "Va en el tacho verde" + consejo → "¡Ya lo puse en su tacho!" → confeti + celebraciones en cadena (insignia, misión, superaste a Mamá) |
| 1:25–2:00 | **Chat con Kusi** | Clic en la mascota o en "Habla con Kusi": opciones guiadas ("¿En qué tacho va…?" → Pilas) y una pregunta libre escrita. Misión "Pregúntale algo a Kusi" se completa |
| 2:00–2:25 | Retos | Reto semanal, insignias, ranking familiar con el niño en 1er puesto |
| 2:25–2:50 | Mapa | Burbujas de impacto por distrito, ranking (clic vuela al distrito), puntos de acopio con horarios |
| 2:50–3:00 | Cierre | Volver a Inicio: puntos subieron, misiones completadas |

**Tips de grabación:** empieza con `localStorage` limpio (botón "Reiniciar demo" y recarga,
o ventana de incógnito). Para el momento "wow", escanea un **vidrio primero**.
Si grabas en desktop, arrastra una foto llamada `botella.jpg` / `frasco-vidrio.jpg` —
el simulador reconoce palabras clave en el nombre del archivo.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Leaflet** para el mapa (teselas CARTO/OpenStreetMap)
- CSS propio (sin frameworks) — estilo "cuaderno de explorador"
- Estado en `localStorage` — cero backend, cero configuración
- Mascota Kusi y todos los iconos: SVG dibujados a mano

## Estructura

```
app/            páginas: / (inicio), /escanear, /retos, /mapa + APIs /api/identificar y /api/kusi
components/     Mascota (Kusi animada), ChatKusi, Nav, Confeti, Toasts, CamaraCaptura, MapaVista…
lib/            residuos (catálogo NTP), gamificacion (rangos/insignias/misiones),
                kusi-guiones (chat guiado), mock-kusi (respuestas simuladas),
                datos (distritos, acopio, familia — mock), store (estado + localStorage)
```
