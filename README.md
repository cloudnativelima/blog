# Blog de Cloud Native Perú

Este repositorio guarda los artículos y sus recursos. La web se mantiene por separado en `cloudnativelima/cloud-native-pe` y toma el contenido de `main` cuando se reconstruye.

## Una carpeta por artículo

```text
articulos/
  primeros-pasos-kubernetes/
    index.md
    imagenes/
      portada.webp
      diagrama.png
    ejemplos/
      deployment.yaml
  gitops-con-argo/
    index.md
    imagenes/
      portada.webp
plantillas/
  articulo/
    index.md
    imagenes/
```

`index.md` contiene los metadatos y el texto. La carpeta define la URL: `primeros-pasos-kubernetes` se publica en `/blog/primeros-pasos-kubernetes`. Usa nombres en minúsculas, sin espacios ni tildes, separados con guiones. Conserva el nombre de la carpeta al corregir un artículo para mantener su enlace.

Todo el material se organiza junto al artículo. Las imágenes PNG, JPG y WebP de los artículos publicados se copian a la web. Los archivos de `ejemplos/` quedan disponibles en GitHub; puedes enlazarlos desde el artículo o copiar fragmentos en bloques de código. No se ejecutan scripts de los artículos.

## Escribir desde GitHub

1. Crea una rama, o un fork si no tienes permisos de escritura.
2. Copia el contenido de [la plantilla](https://github.com/cloudnativelima/blog/blob/main/plantillas/articulo/index.md). En **Add file → Create new file**, crea `articulos/mi-tema/index.md` y pega la plantilla.
3. Completa los metadatos y escribe el artículo. Usa **Preview** para revisar el Markdown.
4. Sube sus imágenes a `articulos/mi-tema/imagenes/`. Añade los ejemplos a `articulos/mi-tema/ejemplos/` si los necesitas.
5. Guarda los cambios en la rama y abre un pull request hacia `main`.
6. GitHub Actions valida el formato. El equipo revisa el contenido, establece `status: published` y la fecha real de publicación antes de integrar el PR.
7. El responsable de la web reconstruye y despliega el sitio. Verifica el artículo y sus imágenes en `https://blog.cloud-native.pe/blog/mi-tema`.

Desde tu equipo, los cambios se guardan con `git commit` y se suben con `git push` a la rama del artículo. Después abres el PR. Desde la interfaz de GitHub no necesitas ejecutar estos comandos.

## Escribir desde tu equipo

```bash
git switch -c articulo/mi-tema
cp -R plantillas/articulo articulos/mi-tema
# Edita articulos/mi-tema/index.md y agrega sus recursos.
npm ci
npm test
git add articulos/mi-tema
git commit -m "Añadir artículo sobre mi tema"
git push -u origin articulo/mi-tema
```

Abre un PR de esa rama hacia `main`. Para colaborar desde un fork, el destino del PR debe ser `cloudnativelima/blog`.

## Metadatos

```yaml
---
title: "Primeros pasos con Kubernetes"
description: "Qué aprenderás con esta guía."
author: "Tu nombre"
date: "2026-10-01"
status: draft
tags:
  - Kubernetes
cover: "./imagenes/portada.webp"
---
```

`cover` es opcional: añádelo solo cuando exista esa imagen. `date` debe ser una fecha válida entre comillas. Usa `draft` mientras escribes y `published` cuando esté aprobado. Los borradores se validan, pero no aparecen en la web. El título admite hasta 140 caracteres, el resumen hasta 300 y el autor hasta 100. Usa de 1 a 6 etiquetas, de hasta 40 caracteres cada una.

No añadas un encabezado `#`: el título ya genera el encabezado principal. Empieza las secciones con `##`.

## Imágenes y ejemplos

Las imágenes se enlazan desde la carpeta del artículo:

```md
![Descripción útil del diagrama](./imagenes/diagrama.png)
```

La web convierte esa ruta a `/public/blog/mi-tema/imagenes/diagrama.png`. Las mismas imágenes siguen siendo legibles desde GitHub. Usa nombres en minúsculas, evita imágenes pesadas e incluye atribución cuando corresponda. Las rutas no pueden salir de la carpeta del artículo. Las imágenes con rutas públicas anteriores siguen funcionando durante la migración.

Para un ejemplo descargable en GitHub:

```md
[Ver deployment.yaml](https://github.com/cloudnativelima/blog/blob/main/articulos/mi-tema/ejemplos/deployment.yaml)
```

Se admiten texto, listas, tablas y bloques de código con lenguaje. El HTML incrustado se omite y los enlaces peligrosos se filtran. No se ejecuta MDX ni JavaScript del contenido.

## Comprobaciones y vista previa

```bash
npm run check:blog
npm test
```

Los PR ejecutan estas comprobaciones automáticamente. Para ver una rama local en la web, copia `articulos/` a `blog/articulos/` del repositorio de la web y ejecuta allí `BLOG_SKIP_SYNC=1 npm run dev`. Solo los artículos `published` se muestran; cambia el estado en esa copia de prueba, no en el borrador original.

## Estrategia de publicación

Proponemos dos artículos al mes, según la disponibilidad del equipo: una guía práctica y una experiencia real de la comunidad. El autor prepara el borrador; un mantenedor revisa claridad, fuentes y ejemplos; el responsable de la web publica y comprueba las URLs. Las correcciones se envían por PR al mismo artículo.

**Integrar un PR en `main` todavía no despliega automáticamente la web.** Hoy se valida el contenido en GitHub y después se reconstruye y despliega Cloudflare Pages. La siguiente mejora será conectar ambos repositorios para activar ese despliegue al integrar cambios en artículos o imágenes. Las credenciales se guardarán en GitHub Secrets; esa automatización aún no está configurada.

Los archivos Markdown sueltos anteriores siguen siendo compatibles con la web durante la migración. Para artículos nuevos usa siempre una carpeta con `index.md`; no combines un archivo y una carpeta con el mismo nombre.
