# Publicar en el blog

Este repositorio público contiene los artículos Markdown de Cloud Native Perú. La web y el portal se mantienen por separado en `cloudnativelima/cloud-native-pe`. La web importa este contenido al reconstruirse.

## Estructura

```text
./
  README.md
  plantilla.md
  articulos/
    mi-articulo.md
  imagenes/
    mi-articulo/
      diagrama.png
```

## Escribir y revisar

1. Crea una rama o un fork del repositorio.
2. Copia `plantilla.md` a `articulos/mi-articulo.md`.
3. Usa un nombre único en minúsculas, sin tildes, con guiones. Ese nombre define la URL `/blog/mi-articulo`.
4. Completa los metadatos YAML y escribe el contenido en Markdown.
5. Ejecuta `npm ci` y `npm run check:blog`. Para ver tu artículo en la web local, consulta la sección de vista previa.
6. Abre un pull request. El equipo revisa el contenido y establece `status: published` antes de integrarlo.
7. El artículo aparece cuando se reconstruye y despliega el sitio. Integrar el archivo por sí solo no despliega esta web.

## Metadatos obligatorios

| Campo | Formato |
| --- | --- |
| `title` | Texto, máximo 140 caracteres |
| `description` | Resumen, máximo 300 caracteres |
| `author` | Nombre público, máximo 100 caracteres |
| `date` | Fecha real `"YYYY-MM-DD"`, siempre entre comillas |
| `status` | `draft` o `published` |
| `tags` | Lista de entre 1 y 6 etiquetas, máximo 40 caracteres cada una |

Los borradores se validan, pero no aparecen en el listado ni generan páginas públicas. Los artículos se ordenan por fecha descendente. No uses un encabezado `#`: el título ya genera el encabezado principal; comienza con `##`.

## Portada opcional

Añade `cover: "/public/blog/mi-articulo/portada.webp"` a los metadatos para mostrar una portada en el carrusel y listado. Si se omite, el blog usa una ilustración del sistema visual de la comunidad.

## Contenido e imágenes

Se admiten párrafos, enlaces, listas, citas, código con lenguaje, tablas y listas de tareas. El HTML incrustado se omite y los enlaces peligrosos se filtran. No se ejecuta JavaScript ni MDX desde los artículos.

Guarda imágenes PNG, JPG o WebP con nombres en minúsculas y enlázalas con una ruta pública:

```md
![Descripción del diagrama](/public/blog/mi-articulo/diagrama.png)
```

Incluye texto alternativo útil, fuentes y atribución de imágenes. Evita imágenes pesadas, datos personales y credenciales en ejemplos. El contenido debe ser original o contar con permiso de publicación.

## Comprobaciones

```bash
npm run check:blog
npm run test:blog
npm test
```

El build valida metadatos, genera las rutas y empaqueta las páginas. El Worker solo permite los slugs publicados; el sitemap incluye sus URLs.

## Vista previa en la web

En el repositorio de la web, ejecuta `npm run sync:blog` para importar la rama principal pública. Para probar una rama local de artículos, copia las carpetas `articulos/` e `imagenes/` a `blog/articulos/` y `blog/imagenes/` de la web y ejecuta `BLOG_SKIP_SYNC=1 npm run dev`. Cambia `status` a `published` en esa copia para revisar la página.

Las comprobaciones de pull requests validan el formato. La integración de un PR aquí no despliega automáticamente la web; el sitio toma la versión actual cuando se reconstruye.
