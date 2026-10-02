import test from 'node:test';
import assert from 'node:assert/strict';
import { getArticles, parseArticle } from '../scripts/blog-content.mjs';
const source = `---
title: "Una guía"
description: "Una descripción"
author: "Autor"
date: "2026-10-01"
status: published
tags: [Kubernetes]
---
## Introducción
Contenido.
`;
test('parses metadata and body independently', () => {
 const article = parseArticle(source, 'una-guia.md');
 assert.equal(article.slug, 'una-guia'); assert.equal(article.readingMinutes, 1); assert.match(article.content, /^## Introducción/);
});
test('rejects invalid dates, statuses, tags, empty bodies and headings', () => {
 for (const input of [source.replace('2026-10-01','2026-02-30'), source.replace('published','private'), source.replace('[Kubernetes]','[]'), source.replace('## Introducción\nContenido.',''), source.replace('## Introducción','# Introducción')]) assert.throws(() => parseArticle(input,'una-guia.md'));
 assert.throws(() => parseArticle(source,'../private.md'));
});
test('public content contains only published posts and newest first', async () => {
 const posts = await getArticles(); assert.ok(posts.length > 0);
 assert.ok(posts.every(post => post.status === 'published'));
 assert.deepEqual(posts.map(p => p.date), posts.map(p => p.date).sort().reverse());
});

test('optional cover accepts public local images and rejects external paths', () => {
 const withCover = source.replace('status: published', 'status: published\ncover: "/public/blog/una-guia/portada.webp"');
 assert.equal(parseArticle(withCover, 'una-guia.md').cover, '/public/blog/una-guia/portada.webp');
 assert.throws(() => parseArticle(withCover.replace('/public/blog/una-guia/portada.webp', 'https://example.com/image.webp'), 'una-guia.md'));
});

test('folder articles use the folder slug, including relative covers', () => {
 const article = parseArticle(source.replace('status: published', 'status: published\ncover: "./imagenes/portada.webp"'), 'una-guia/index.md');
 assert.equal(article.slug, 'una-guia');
 assert.equal(article.cover, '/public/blog/una-guia/imagenes/portada.webp');
 assert.throws(() => parseArticle(source, 'una-guia/anidado/index.md'));
});
test('relative images stay inside their article folder', async () => {
 const { articleAssetUrl } = await import('../scripts/blog-content.mjs');
 assert.equal(articleAssetUrl('./imagenes/diagrama.png', 'una-guia'), '/public/blog/una-guia/imagenes/diagrama.png');
 assert.throws(() => articleAssetUrl('../otro/diagrama.png', 'una-guia'));
 assert.throws(() => articleAssetUrl('imagenes/%2e%2e/secreto.png', 'una-guia'));
});
test('reads folder articles, filters drafts and rejects duplicate or incomplete folders', async () => {
 const { mkdtemp, mkdir, writeFile, rm } = await import('node:fs/promises');
 const { tmpdir } = await import('node:os');
 const { join } = await import('node:path');
 const dir = await mkdtemp(join(tmpdir(), 'blog-folders-'));
 try {
  for (const slug of ['una-guia','borrador']) {
   await mkdir(join(dir,slug));
   await writeFile(join(dir,slug,'index.md'), slug === 'borrador' ? source.replace('published','draft') : source);
  }
  assert.deepEqual((await getArticles({directory:dir})).map(a=>a.slug), ['una-guia']);
  assert.equal((await getArticles({directory:dir,includeDrafts:true})).length,2);
  await writeFile(join(dir,'una-guia.md'),source);
  await assert.rejects(getArticles({directory:dir}), /duplicado/);
  await rm(join(dir,'una-guia.md'));
  await mkdir(join(dir,'sin-indice'));
  await assert.rejects(getArticles({directory:dir}), /ENOENT/);
 } finally { await rm(dir,{recursive:true,force:true}); }
});
