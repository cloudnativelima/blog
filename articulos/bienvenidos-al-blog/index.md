---
title: "Escribe tu primer artículo en Cloud Native Perú"
description: "Una guía para publicar, con ejemplos de código, avisos e imágenes que puedes reutilizar."
author: "Equipo Cloud Native Perú"
date: "2026-10-01"
status: published
tags: [Comunidad, Guía]
cover: "./imagenes/ecosistema-cloud-native.png"
---
Comparte un problema que resolviste, un laboratorio o una idea que ayude a otras personas. Esta guía muestra cómo preparar tu artículo y cómo se verá en el blog.

> [!NOTE]
> La plantilla y las instrucciones de publicación están en el [repositorio del blog](https://github.com/cloudnativelima/blog). Cada artículo reúne su texto, imágenes y ejemplos en una sola carpeta.

## 1. Prepara tu artículo

Copia `plantillas/articulo/` a `articulos/mi-articulo/`. El nombre de la carpeta define la dirección `/blog/mi-articulo`.

```text
articulos/mi-articulo/
├── index.md
├── imagenes/
│   └── diagrama.png
└── ejemplos/
    └── hola.py
```

Las carpetas `imagenes/` y `ejemplos/` son opcionales. Empieza `index.md` con estos datos y reemplázalos por los tuyos:

```yaml
---
title: "Título de tu artículo"
description: "Lo que aprenderá quien lea tu artículo."
author: "Tu nombre"
date: "2026-10-02"
status: draft
tags: [Comunidad]
---
```

Después escribe el contenido. Usa `##` para las secciones y `###` para los pasos; el título principal se genera automáticamente.

> [!TIP]
> Cuenta primero qué vas a resolver, indica los requisitos y termina mostrando cómo comprobar el resultado.

## 2. Código que se pueda copiar

Indica el lenguaje después de las tres comillas invertidas: `bash`, `yaml`, `python`, `json` o `text`. El bloque muestra el lenguaje y un botón **Copiar**. Conserva la indentación y separa los comandos de su salida.

Este ejemplo funciona con **Python 3**, sin paquetes adicionales. Guarda lo siguiente en `ejemplos/hola.py`:

```python
import json

mensaje = {"comunidad": "Cloud Native Perú", "estado": "ok"}
print(json.dumps(mensaje, ensure_ascii=False))
```

Desde la carpeta del artículo, ejecuta:

```bash
python3 ejemplos/hola.py
```

Salida esperada:

```text
{"comunidad": "Cloud Native Perú", "estado": "ok"}
```

Puedes consultar el [archivo completo del ejemplo](https://github.com/cloudnativelima/blog/blob/main/articulos/bienvenidos-al-blog/ejemplos/hola.py). En tus tutoriales, incluye los requisitos, la versión usada y los pasos de limpieza cuando crees recursos.

> [!IMPORTANT]
> El botón copia todo el bloque. Escribe los comandos sin el prefijo `$` y deja los resultados en otro bloque para que puedan pegarse directamente.

## 3. Notas, consejos y advertencias

Usa los avisos de Markdown de GitHub. Se muestran con un título y color propios tanto en el repositorio como en el blog.

```markdown
> [!NOTE]
> Información que ayuda a entender el paso.

> [!TIP]
> Una sugerencia para facilitar el trabajo.

> [!IMPORTANT]
> Un requisito necesario para continuar.

> [!WARNING]
> Explica el riesgo antes del paso que lo provoca.

> [!CAUTION]
> Señala una acción irreversible y su alcance.
```

> [!WARNING]
> Antes de compartir una captura o configuración, revisa que no contenga contraseñas, tokens ni datos privados.

> [!CAUTION]
> Si un comando elimina recursos o datos, explica exactamente qué elimina y cómo preparar una copia antes de ejecutarlo.

Una cita normal usa `>` sin marcador y conserva un estilo diferente:

> Compartir lo que aprendemos ayuda a que otras personas puedan construir sobre esa experiencia.

## 4. Imágenes y enlaces

Guarda las imágenes en `imagenes/` usando PNG, JPG o WebP. Usa nombres en minúsculas y sin espacios.

```markdown
![Ilustración de la comunidad cloud native](./imagenes/ecosistema-cloud-native.png)
```

![Ilustración de la comunidad cloud native](./imagenes/ecosistema-cloud-native.png)

El texto entre corchetes describe la imagen y aparece como pie de figura. Para una portada opcional, añade `cover: "./imagenes/portada.webp"` a los datos iniciales, solo si ese archivo existe.

Enlaza archivos de `ejemplos/` mediante su URL de GitHub. Las imágenes locales se copian al sitio durante la compilación; no necesitas un servicio externo para alojarlas.

## 5. Tablas y listas

Una tabla breve ayuda a comparar opciones. En móvil, las tablas anchas se pueden desplazar horizontalmente.

| Elemento | Cuándo usarlo |
| --- | --- |
| Código | Comandos, configuración o un ejemplo ejecutable |
| Aviso | Requisitos, consejos o precauciones concretas |
| Imagen | Diagramas, capturas y resultados visuales |
| Enlace | Documentación oficial y archivos de apoyo |

Antes de pedir una revisión, comprueba:

- [ ] Reemplacé los datos de la plantilla y usé la fecha correspondiente.
- [ ] Expliqué los requisitos y probé los pasos que propongo.
- [ ] Separé comandos y resultados.
- [ ] Las imágenes se ven y los enlaces funcionan.
- [ ] No incluí credenciales ni información privada.
- [ ] Ejecuté `npm test` en el repositorio del blog.

Las pruebas automáticas validan el formato; la comprobación técnica de tu tutorial sigue siendo parte de la revisión.

## 6. Envía tu propuesta

Necesitas Git y Node.js 22 o posterior. Si no tienes permiso de escritura, crea primero un **fork** en GitHub y clona tu fork. Si eres colaborador, puedes clonar el repositorio de la comunidad:

```bash
git clone https://github.com/cloudnativelima/blog.git
cd blog
git switch -c articulo/mi-articulo
cp -R plantillas/articulo articulos/mi-articulo
npm ci
```

Edita `articulos/mi-articulo/index.md`, añade los archivos que necesites y conserva `status: draft` mientras se revisa. Después:

```bash
npm test
git add articulos/mi-articulo
git commit -m "Añadir mi artículo"
git push -u origin articulo/mi-articulo
```

Abre un **pull request hacia `main` de `cloudnativelima/blog`**. El equipo revisa el contenido y, al aprobarlo, cambia el estado a `published` e integra el artículo.

> [!IMPORTANT]
> Integrar el artículo en GitHub no lo publica por sí solo en la web. Después se debe desplegar el repositorio `cloudnativelima/cloud-native-pe`; ese paso todavía no es automático.

Para corregir un artículo publicado, conserva su carpeta y envía otro pull request. Así mantienes la misma URL.

Consulta el [README del blog](https://github.com/cloudnativelima/blog#readme) para la guía de publicación y la vista previa local.
