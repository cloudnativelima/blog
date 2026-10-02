# Publicar en el blog de Cloud Native Perú

## 1. Crea la carpeta

Copia `plantillas/articulo/` a `articulos/nombre-del-articulo/`:

```text
articulos/mi-articulo/
  index.md       # Texto y datos del artículo
  imagenes/      # Portada y diagramas, si los necesitas
  ejemplos/      # Archivos de apoyo, opcionales
```

Usa minúsculas y guiones. La carpeta `mi-articulo` define la URL `/blog/mi-articulo`.

## 2. Escribe

Edita `index.md` con el título, resumen, autor, fecha, etiquetas y texto. Mantén `status: draft` hasta la revisión.

```yaml
---
title: "Título del artículo"
description: "Resumen breve"
author: "Tu nombre"
date: "2026-10-01"
status: draft
tags: [Comunidad]
---
```

Usa la fecha correspondiente entre comillas. Empieza las secciones con `##`; el título ya crea el encabezado principal.

Para imágenes: `![Descripción](./imagenes/diagrama.png)`. Usa PNG, JPG o WebP con nombres en minúsculas. La portada es opcional: añade `cover: "./imagenes/portada.webp"` a los datos solo si ese archivo existe. Los archivos de `ejemplos/` se pueden enlazar desde GitHub.

## 3. Sube a GitHub

Puedes crear y editar los archivos desde GitHub en una rama, o un fork si no tienes permisos. Para hacerlo desde tu equipo, usa una copia del repositorio:

```bash
git switch -c articulo/mi-articulo
cp -R plantillas/articulo articulos/mi-articulo
# Escribe el artículo antes de continuar.
npm ci
npm test
git add articulos/mi-articulo
git commit -m "Añadir mi artículo"
git push -u origin articulo/mi-articulo
```

## 4. Envía a revisión

Abre un pull request hacia `main` en `cloudnativelima/blog`. GitHub valida el formato y el equipo revisa el contenido. Cuando esté aprobado, se cambia a `status: published` y se integra en `main`.

**Después hay que desplegar la web para que aparezca publicado. Ese paso todavía no es automático.** La web está en otro repositorio: `cloudnativelima/cloud-native-pe`.

Para corregir un artículo, conserva su carpeta y envía otro PR.

<details>
<summary>Vista previa local (opcional)</summary>

En el repositorio de la web, copia `articulos/` a `blog/articulos/` y ejecuta `BLOG_SKIP_SYNC=1 npm run dev`. Para ver un borrador, cambia su estado a `published` únicamente en esa copia de prueba. Abre `/blog/mi-articulo`.

</details>
