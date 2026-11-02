# Flag Quiz

Aplicación web para aprender a reconocer las banderas del mundo. Está
construida con JavaScript y Vite, y se puede desarrollar y publicar
directamente en Vercel.

## Estructura

- `index.html`: punto de entrada de Vite.
- `src/style.css`: estilos, responsive y estados visuales.
- `src/script.js`: catálogo de países y lógica del quiz.
- `public/assets/flags/`: banderas SVG servidas localmente.
- `package.json`: scripts de desarrollo y build con Node.js.
- `vercel.json`: configuración de caché y salida para Vercel.

## Requisitos

- Node.js 18 o superior.
- npm, incluido con Node.js.

## Ejecutar en local

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Después visita la URL que muestre Vite, normalmente
`http://localhost:5173`.

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Publicar en Vercel

1. Importa el repositorio desde el panel de Vercel.
2. Vercel detectará Vite automáticamente.
3. Usa el directorio raíz como carpeta de proyecto.
4. El comando de build será `npm run build`.
5. El directorio de salida será `dist`.

Las banderas se distribuyen dentro del repositorio, así que el quiz sigue
funcionando aunque el visitante tenga bloqueadas las CDNs externas.
