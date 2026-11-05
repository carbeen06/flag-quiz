# 🌍 Flag Quiz

Quiz de banderas del mundo en el que **escribes el nombre del país**, sin opciones múltiples.
Disponible en **español** e **inglés**.

**Jugar:** https://aprendebanderas.vercel.app

## ✨ Características

- Elige qué practicar: **rango de letras** (A–D), **continente** o **todos los países**.
- Las banderas salen en orden aleatorio.
- **Respuestas flexibles**: no importan mayúsculas, tildes ni puntuación. Acepta el nombre en español y en inglés, además de variantes habituales (`EEUU`, `Holanda`, `Czechia`...).
- Si fallas, ves la respuesta correcta y la bandera vuelve en la siguiente ronda.
- **Pantalla de repaso** entre rondas con las banderas falladas.
- Se repite hasta acertar todas.
- **Cronómetro** por ronda y resumen final con el tiempo de cada una.
- Interfaz bilingüe (ES/EN) que recuerda tu elección.
- Banderas guardadas en local (SVG): funciona rápido y sin depender de servicios externos.

## 🛠️ Tecnologías

- HTML, CSS y JavaScript
- [Vite](https://vitejs.dev/)
- Desplegado en [Vercel](https://vercel.com/)

## 🚀 Ejecutarlo en local

Necesitas [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/carbeen06/flag-quiz.git
cd flag-quiz
npm install
npm run dev
```

Abre la dirección que aparece en la terminal.

| Comando           | Qué hace                                   |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo con recarga         |
| `npm run build`   | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` en local          |

## 📁 Estructura

```
flag-quiz/src
├── public/
│   └── assets/flags/        # Banderas en SVG (es.svg, fr.svg...)
├── src/
│   ├── data/
│   │   ├── countries.json       # Países: nombre, código y continente
│   │   ├── aliases.json         # Nombres alternativos (por nombre en español)
│   │   ├── aliases-en.json      # Nombres alternativos en inglés (por código)
│   │   ├── names-en.json        # Nombres en inglés (por código)
│   │   └── translations.json    # Textos de la interfaz ES/EN
│   ├── script.js
│   └── style.css
├── index.html
├── package-lock.json
├── package.json
└── vercel.json
```

## ➕ Cómo ampliar el proyecto

### Añadir un país

1. Guarda su bandera en `public/assets/flags/<codigo>.svg` (código ISO en minúsculas).
2. Añádelo a `src/data/countries.json`:
   ```json
   {"name":"Portugal","code":"po","continent":"Europa"}
   ```
3. Añade su nombre en inglés en `src/data/names-en.json`:
   ```json
   "po": "Portugal"
   ```

### Añadir nombres alternativos

- En `aliases.json`, la clave es el nombre del país **en minúsculas y sin tildes**.

### Añadir un idioma

1. Copia el bloque `"en"` de `translations.json` con un nuevo código (por ejemplo `"fr"`) y traduce los textos.
2. Añade el nombre de los países en ese idioma en los aliases
3. Añade la opción en el selector `#language` de `index.html`.

## 🗺️ Próximos pasos

- [ ] Guardar historial de sesiones
- [ ] Inicio de sesión
- [ ] Analíticas: evolución de tiempos y fallos
- [ ] Modo "repasar mis puntos débiles"
- [ ] Modo capitales

## 🙌 Créditos

- Desarrollado por [catalinacatalinacatalina](https://github.com/catalinacatalinacatalina) y [carbeen06](https://github.com/carbeen06).
- Banderas: SVG de dominio público