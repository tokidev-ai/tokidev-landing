# Design System & Arquitectura de Proyecto — Tokidev Landing

Este documento detalla la estructura técnica, arquitectura de componentes, sistema de diseño, tokens CSS y decisiones de desarrollo del proyecto **Tokidev Landing**, integrando oficialmente las especificaciones de los 24 diseños del **Manual de Marca de Tokidev** obtenidos de Figma.

---

## 1. Resumen de Tecnologías y Stack

- **Framework principal**: [Astro v6](https://astro.build/) (Renderizado ultra-rápido, SSG/SSR, arquitectura basada en componentes e islas de hidratación).
- **Sistema de Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` integrado mediante `@theme` en CSS global).
- **Tipografía**: Google Fonts — **Inter** (`400`, `500`, `600`, `700`, `800`) como tipografía principal web.
- **Iconografía**: [Lucide Astro](https://lucide.dev/) (`lucide-astro`).
- **Animaciones**: Engine de animaciones con [Motion](https://motion.dev/) (Framer Motion para JS/TS en `src/scripts/animations.ts`).
- **Tipado y Lenguaje**: TypeScript (`tsconfig.json`) y Astro syntax (`.astro`).

---

## 2. Manual de Marca Tokidev (Especificaciones Figma)

### 🌟 Esencia y Concepto de Marca
- **Propósito**: Transformar conceptos tecnológicos complejos en contenido claro, útil y accesible.
- **Misión**: Convertirse en una referencia digital sobre inteligencia artificial, desarrollo y herramientas tecnológicas.
- **Visión**: Compartir conocimiento que permita a más personas aprender, adaptarse y crecer profesionalmente en un entorno impulsado por la tecnología.
- **Pilares del Concepto Visual**: Intersección entre **Tecnología**, **Aprendizaje** y **Creatividad**, transmitiendo innovación sin perder cercanía humana.

---

## 3. Sistema de Diseño & Tokens CSS (`src/styles/global.css`)

El proyecto utiliza Tailwind CSS v4 con directivas `@theme` para exponer variables CSS nativas que alimentan tanto las clases utilitarias de Tailwind como los estilos personalizados.

### 🎨 Paleta Oficial de Colores & Tokens
| Token / Variable CSS | Valor Hex / RGB | Descripción |
| :--- | :--- | :--- |
| `--color-brand-bg` | `#030126` | Fondo principal profundo (Dark Slate / Deep Navy) |
| `--color-brand-red` | `#F43753` | Rojo de marca principal (Cool Red) |
| `--color-brand-orange` | `#FF6B35` | Naranja de acento vibrante (Vibrant Orange) |
| `--color-brand-yellow` | `#DFB546` | Amarillo dorado de acento |
| `--color-brand-purple` | `#73388F` | Púrpura medio de transición |
| `--color-dark-purple` | `#410840` | Púrpura oscuro profundo para degradados de fondo |
| `--color-brand-glass` | `rgba(26, 16, 41, 0.6)` | Fondo para tarjetas con efecto glassmorphism |
| `--color-brand-border` | `rgba(244, 55, 83, 0.2)` | Bordes sutiles traslúcidos en tono de marca |
| `--color-brand-text` | `#ffffff` | Texto principal (máximo contraste) |
| `--color-brand-text-dim` | `rgba(255, 255, 255, 0.7)` | Texto secundario o descriptivo |

### 🌈 Degradados Oficiales (Gradients)
- **`--background-image-brand-bg-gradient`**: `linear-gradient(152deg, #030126 6%, #410840 58%, #AE421A 125%)`
  *(Degradado atmosférico de fondo presente en la portada y secciones principales)*.
- **`--background-image-hero-title`**: `linear-gradient(90deg, #F43753 0%, #FF6B35 100%)`
  *(Gradiente distintivo para títulos principales y números destacables)*.
- **`--background-image-hero-card`**: `linear-gradient(107.6deg, rgba(255, 255, 255, 0.12) 1.2%, rgba(196, 196, 196, 0.03) 100%)`
  *(Efecto de cristal reflectivo para tarjetas hero y contenedores)*.

### 📐 Espaciados y Geometría de UI
- `--spacing-social-size`: `54px` (Dimensión de botones de redes sociales).
- `--spacing-btn-px`: `52px` (Padding horizontal en botones principales).
- `--spacing-btn-py`: `18px` (Padding vertical en botones principales).

---

## 4. Estructura del Proyecto (`src/`)

```text
src/
├── components/       # Componentes UI modulares e independientes (20 componentes)
├── data/             # Archivos JSON de datos estáticos (ej. technologies.json)
├── layouts/          # Layouts base (Layout.astro)
├── pages/            # Rutas y páginas principales (index, blog, links, etc.)
├── posts/            # Artículos en Markdown (.md) para el blog
├── scripts/          # Scripts del cliente (animations.ts)
└── styles/           # Archivos CSS globales (global.css)
```

---

## 5. Reglas de Código y Mantenibilidad

1. **SOLID y Principio de Responsabilidad Única**:
   - Cada sección landing delega la representación de sus elementos repetitivos a tarjetas dedicadas (ej. `Experience.astro` utiliza `ExperienceCard.astro`).
2. **Comentarios en Español**:
   - Todo código complejo o decisión técnica debe explicarse mediante comentarios que detallen el *por qué* de la solución en idioma español.
3. **Animaciones Fluidas**:
   - `src/scripts/animations.ts` desacopla la lógica de animación con `Motion` del maquetado HTML, ejecutándose dinámicamente al cargar el DOM.
