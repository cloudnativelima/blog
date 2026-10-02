---
title: "Cómo publicar tu primer artículo en Cloud Native Perú"
description: "Cuatro pasos para preparar un artículo, subirlo a GitHub y enviarlo a revisión."
author: "Cloud Native Perú"
date: "2026-10-01"
status: draft
tags: [Comunidad, GitHub]
---
Publicar empieza con una carpeta que reúne el texto y los recursos del artículo.

## 1. Crea tu carpeta

Copia `plantillas/articulo/` a `articulos/mi-articulo/`. Dentro tendrás `index.md` para el texto e `imagenes/` para la portada y los diagramas. Puedes añadir `ejemplos/` si necesitas archivos de apoyo.

El nombre de la carpeta define la URL: `/blog/mi-articulo`. Usa minúsculas y guiones.

## 2. Escribe el artículo

Completa el título, resumen, autor, fecha y etiquetas en `index.md`. Mantén `status: draft` durante la preparación y empieza las secciones con `##`.

Las imágenes se enlazan así: `![Descripción](./imagenes/diagrama.png)`. La portada es opcional: añade `cover: "./imagenes/portada.webp"` solo si ese archivo existe.

## 3. Sube los cambios

Puedes editar los archivos desde GitHub en una rama o un fork. Desde tu equipo, crea una rama, ejecuta `npm ci` y `npm test`, y guarda y sube el artículo con `git commit` y `git push`.

## 4. Envía a revisión

Abre un pull request hacia `main` en `cloudnativelima/blog`. GitHub valida el formato y el equipo revisa el contenido. Una vez aprobado, se cambia a `status: published` y se integra.

Después hay que reconstruir y desplegar la web para verlo publicado; ese paso todavía no es automático. Para corregirlo más adelante, conserva la carpeta y envía otro PR.

## Referencia

Esta guía usa únicamente el [README del blog](https://github.com/cloudnativelima/blog/blob/main/README.md).
