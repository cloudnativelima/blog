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
