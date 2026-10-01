import { readdir, readFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import matter from 'gray-matter';
export const blogDirectory = resolve(process.cwd(), 'articulos');
export function parseArticle(source, filename) {
  const slug = filename.replace(/\.md$/, '');
  const fail = message => { throw new Error(`Blog: ${filename}: ${message}`); };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('nombre de archivo inválido');
  const { data, content } = matter(source);
  for (const key of ['title', 'description', 'author', 'date', 'status']) if (typeof data[key] !== 'string' || !data[key].trim()) fail(`falta ${key} (texto)`);
  if (data.title.length > 140 || data.description.length > 300 || data.author.length > 100) fail('metadatos demasiado largos');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0,10) !== data.date) fail('date debe ser una fecha válida YYYY-MM-DD entre comillas');
  if (!['draft', 'published'].includes(data.status)) fail('status debe ser draft o published');
  if (!Array.isArray(data.tags) || !data.tags.length || data.tags.length > 6 || data.tags.some(tag => typeof tag !== 'string' || !tag.trim() || tag.length > 40)) fail('tags debe contener entre 1 y 6 textos');
  if (data.cover !== undefined && (typeof data.cover !== 'string' || !/^\/public\/blog\/[a-z0-9][a-z0-9/_-]*\.(png|jpg|jpeg|webp)$/.test(data.cover))) fail('cover debe ser una imagen local /public/blog/...');
  if (!content.trim()) fail('contenido vacío');
  if (/^#\s/m.test(content)) fail('usa encabezados desde ##; title ya crea el h1');
  return { ...(data.cover ? { cover: data.cover } : {}), slug, title: data.title.trim(), description: data.description.trim(), author: data.author.trim(), date: data.date, status: data.status, tags: data.tags, content: content.trim(), readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)) };
}
export async function getArticles({ includeDrafts = false } = {}) {
  const files = (await readdir(blogDirectory)).filter(file => file.endsWith('.md'));
  const articles = await Promise.all(files.map(async file => parseArticle(await readFile(`${blogDirectory}/${file}`, 'utf8'), file)));
  return articles.filter(article => includeDrafts || article.status === 'published').sort((a,b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
if (process.argv[1] && basename(process.argv[1]) === 'blog-content.mjs') {
  const articles = await getArticles({ includeDrafts: true });
  console.log(`Blog: ${articles.length} artículos válidos (${articles.filter(a => a.status === 'published').length} publicados).`);
}
