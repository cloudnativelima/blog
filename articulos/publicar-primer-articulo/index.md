---
title: "Cómo publicar tu primer artículo en Cloud Native Perú"
description: "Prepara una carpeta con tu artículo y sus recursos, envía un pull request y conoce qué falta para publicarlo en la web."
author: "Cloud Native Perú"
date: "2026-10-01"
status: draft
tags:
  - Comunidad
  - GitHub
---
Puedes compartir una guía o una experiencia de la comunidad mediante un artículo Markdown. El contenido se propone en GitHub, se revisa y después se publica en la web. Esta guía sigue el README del repositorio del blog.

## Requisitos

Necesitas una copia del repositorio del blog y permisos para subir una rama. Si no tienes esos permisos, trabaja desde un fork y envía el pull request a `cloudnativelima/blog`.

También puedes escribir desde GitHub: crea `articulos/mi-tema/index.md` con **Add file → Create new file**, pega la plantilla y usa **Preview** para revisar el texto.

## Paso a paso

### Crea la carpeta del artículo

Desde la copia del repositorio, crea una rama y copia la plantilla completa:

```bash
git switch -c articulo/mi-tema
cp -R plantillas/articulo articulos/mi-tema
```

La carpeta reúne todo el material:

```text
articulos/mi-tema/
  index.md
  imagenes/
  ejemplos/
```

`index.md` contiene el texto y los metadatos. El nombre `mi-tema` define la futura URL `/blog/mi-tema`; usa minúsculas y guiones, sin espacios ni tildes.

### Completa el contenido

Edita el título, el resumen, el autor, la fecha y las etiquetas. Mantén `status: draft` durante la preparación. La fecha debe estar entre comillas y ser válida.

Comienza las secciones con `##`: el título ya genera el encabezado principal. Puedes incluir listas, tablas y bloques de código con su lenguaje.

Si necesitas imágenes, guárdalas en `imagenes/` dentro de tu artículo y enlázalas así:

```md
![Descripción del diagrama](./imagenes/diagrama.png)
```

La portada es opcional. Añade `cover: "./imagenes/portada.webp"` solo cuando exista esa imagen. Los archivos de apoyo pueden guardarse en `ejemplos/` y enlazarse desde GitHub.

### Valida y sube la rama

```bash
npm ci
npm test
git add articulos/mi-tema
git commit -m "Añadir artículo sobre mi tema"
git push -u origin articulo/mi-tema
```

Abre un pull request de esa rama hacia `main`. GitHub Actions comprueba el formato y el equipo revisa el contenido. Antes de integrar el artículo aprobado, se establece `status: published` y la fecha de publicación.

### Comprueba la publicación

Integrar el PR guarda el contenido en `main`, pero todavía no lo publica automáticamente en la web. El responsable de la web debe reconstruir y desplegar el sitio. Después se revisa `https://blog.cloud-native.pe/blog/mi-tema` y se comprueba que las imágenes carguen.

## Lo que aprendimos

Una carpeta por artículo mantiene juntos el texto y los recursos. La rama permite preparar cambios y el PR facilita la revisión. El despliegue es el paso que hace visible el contenido aprobado.

Para corregir un artículo, conserva el nombre de la carpeta y envía otro PR. Así mantienes su URL y su historial.

## Referencias

- [README del blog de Cloud Native Perú](https://github.com/cloudnativelima/blog/blob/main/README.md), única fuente utilizada para esta guía.
