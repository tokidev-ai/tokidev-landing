# Skill: Create Blog Post

## Cuándo usar este skill

Cuando el usuario escriba `/create-blog-post` seguido del contenido bruto del artículo (o pegue todo el contenido en el prompt), ejecuta este skill completo.

---

## Paso 1 — Leer el proyecto para determinar el filename

Antes de cualquier otra cosa:

1. Lista los archivos en `src/posts/` con `list_dir`.
2. Cuenta cuántos archivos `post-N.md` existen.
3. El nuevo archivo será `post-{N+1}.md`.

---

## Paso 2 — Extraer el frontmatter del contenido bruto

Del contenido que entregó el usuario, infiere o extrae:

| Campo | Tipo | Reglas |
|---|---|---|
| `title` | string | Título principal del artículo. Si no está explícito, inferirlo del contenido. |
| `excerpt` | string | Resumen de 1-2 oraciones para la tarjeta del blog y el meta SEO. Máx. 160 chars. |
| `date` | string | Formato `"Month DD, YYYY"` — ej. `"April 28, 2026"`. Si no está en el contenido, usa la fecha actual. |
| `readTime` | string | Calcula ~200 palabras/min. Redondea hacia arriba. Formato: `"N MIN READ"`. |
| `category` | string | Elige la más apropiada: `Engineering`, `Distributed Systems`, `Career`, `Open Source`, `Thoughts`. Si el tema no encaja, propone una nueva categoría en 1-2 palabras. |
| `color` | string | Elige el color HEX del acento visual según el tono del post: naranja `"#ef6c4a"` (técnico/sistemas), amarillo `"#f5a623"` (carrera/soft skills), morado `"#7b5ea7"` (comunidad/open source). |

El frontmatter debe quedar así al inicio del archivo:

```markdown
---
title: "Título del artículo"
excerpt: "Resumen corto del contenido."
date: "April 28, 2026"
readTime: "8 MIN READ"
category: "Engineering"
color: "#ef6c4a"
---
```

---

## Paso 3 — Transformar el contenido al formato del blog

Convierte el contenido bruto del usuario usando las siguientes reglas de transformación:

### 3.1 — Párrafos normales

Texto simple sin marcado especial → párrafos de Markdown normales, separados por línea en blanco.

```markdown
Este es un párrafo normal. No necesita etiquetas HTML.

Este es otro párrafo.
```

### 3.2 — Títulos de sección

Usa `##` para secciones principales. No uses `#` (ya existe en el `<h1>` del frontmatter). Usa `###` solo para sub-secciones dentro de una sección.

```markdown
## Título de la sección

### Sub-sección opcional
```

### 3.3 — Listas con bullets

Usa HTML, no Markdown estándar para listas, para que los estilos globales `.article-prose` apliquen correctamente:

```html
<ul>
  <li>Primer punto del artículo</li>
  <li>Segundo punto del artículo</li>
  <li>Tercer punto con <strong>énfasis</strong> si aplica</li>
</ul>
```

### 3.4 — Texto en negrita / énfasis inline

Dentro de párrafos o listas, usa `<strong>texto</strong>` para resaltar. El estilo global lo colorea blanco.

```markdown
Este párrafo tiene un término <strong>importante</strong> resaltado.
```

### 3.5 — Bloque de alerta / callout

Úsalo cuando quieras destacar una advertencia, dato importante o nota contextual. Dispara esto cuando el usuario marque contenido con palabras como "nota:", "⚠️", "heads up", "importante", o si el agente considera que un punto merece destacarse.

```html
<div class="bg-brand-orange/10 border border-brand-orange/25 border-solid flex gap-4 md:gap-5 items-start md:items-center px-4 py-4 md:px-5 md:py-5 rounded-2xl w-full my-4 flex-col sm:flex-row">
  <div class="bg-brand-orange/20 shrink-0 flex items-center justify-center rounded-full w-9 h-9">
    <span class="font-bold text-brand-orange text-lg leading-none mt-0.5">!</span>
  </div>
  <div class="flex flex-col items-start text-sm md:text-base">
    <p class="font-semibold text-white m-0">Heads up</p>
    <p class="font-normal leading-relaxed text-brand-text/70 m-0">Texto de la alerta aquí.</p>
  </div>
</div>
```

> El título del callout puede cambiarse: "Heads up", "Note", "Warning", "Pro tip", etc. según el contexto.

### 3.6 — Bloque de código

Úsalo cuando el usuario incluya código fuente. Adapta `filename.ext` al nombre real del archivo mencionado (o infiere un nombre descriptivo). El código puede estar resaltado con `<span>` para colorear keywords, o en texto plano si el usuario no especificó colores.

**Versión simple (sin highlight manual):**

```html
<div class="bg-[#0a0712]/80 border border-white/10 flex flex-col items-start overflow-hidden rounded-2xl w-full mb-10 mt-6 font-mono">
  <div class="bg-white/5 border-b border-white/10 flex items-center justify-between px-5 py-2.5 w-full">
    <div class="flex gap-1.5 pointer-events-none">
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
    </div>
    <p class="font-medium text-xs text-white/50 m-0 tracking-wide font-sans">filename.ts</p>
    <div class="flex gap-1.5 items-center text-[#c6cad0] text-xs font-sans">
      <p class="m-0 hover:text-white cursor-pointer transition">⧉ Copy</p>
    </div>
  </div>
  <div class="flex flex-col p-5 text-sm w-full bg-[#0a0712] overflow-x-auto">
    <pre class="m-0 bg-transparent p-0 text-[#e3dfe9] leading-6"><code>// El código va aquí, tal como lo pasó el usuario</code></pre>
  </div>
</div>
```

**Reglas para el código:**
- Preserva la indentación exacta del código original.
- Escapa los caracteres especiales: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`.
- No uses Markdown `` ``` `` para bloques de código; usa el bloque HTML de arriba.

### 3.7 — Cita destacada / blockquote

Úsalo cuando el usuario marque una frase con `"`, `>`, `quote:`, o cuando sea una idea central que merece ser destacada visualmente.

```html
<div class="bg-linear-to-r border-brand-orange border-l-4 border-solid flex from-brand-orange/10 items-start px-6 py-6 md:px-10 md:py-8 rounded-r-2xl to-transparent w-full my-10 md:my-12">
  <p class="font-medium leading-snug text-xl md:text-3xl text-white tracking-tight m-0">
    La frase destacada va aquí.
  </p>
</div>
```

### 3.8 — Imágenes

Si el usuario provee una URL de imagen (local o externa), úsala así:

```markdown
![Descripción de la imagen](https://url-de-la-imagen.com/imagen.png)
```

> El estilo global aplica `width: 100%` y `border-radius` a las imágenes dentro de `.article-prose`. No agregues clases ni estilos inline.

---

## Paso 4 — Reglas de calidad del archivo generado

- **Sin `max-w-[...]` arbitrario** en los bloques HTML — el contenedor padre ya limita el ancho.
- **Sin medidas hardcodeadas** como `text-[18px]`, `px-[22px]`, `leading-[1.6]`. Usa utilidades de escala de Tailwind: `text-sm`, `text-base`, `px-5`, `leading-relaxed`.
- **Sin colores hex hardcodeados** en clases — usa `brand-orange`, `brand-yellow`, `brand-purple`, `brand-text`.
- **Sin estilos inline** excepto en el color dinámico del hero visual (que viene del frontmatter `color`).
- El archivo debe iniciar siempre con el frontmatter `---` y terminar con una línea en blanco.

---

## Paso 5 — Crear el archivo

Usa `write_to_file` para crear `src/posts/post-{N}.md` con el contenido generado.

No modifiques ningún otro archivo a menos que el usuario lo solicite explícitamente.

---

## Paso 6 — Confirmación

Una vez creado el archivo, reporta al usuario:

- ✅ Nombre del archivo creado: `post-{N}.md`
- 📂 Ruta: `src/posts/post-{N}.md`
- 🔗 URL del post en dev: `http://localhost:4321/blog/post-{N}`
- 📋 Resumen del frontmatter generado (title, category, readTime, color)
- ⚠️ Cualquier dato que no pudo inferirse y requiere revisión manual.

---

## Referencia rápida de colores

| Color | HEX | Úsalo para |
|---|---|---|
| Brand Orange | `#ef6c4a` | Posts técnicos, sistemas, arquitectura |
| Brand Yellow | `#f5a623` | Carrera, crecimiento, soft skills |
| Brand Purple | `#7b5ea7` | Open source, comunidad, reflexiones |

## Referencia rápida de categorías

`Engineering` · `Distributed Systems` · `Career` · `Open Source` · `Thoughts`
