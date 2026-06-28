// Generated at build time (predev/prebuild). Pulls active products + published articles
// from Supabase via the public anon key, writes public/sitemap.xml.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://scoly.ci";
const SUPABASE_URL = "https://duxbzpsezdhvhprwjwmk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1eGJ6cHNlemRodmhwcndqd21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDQ3NzksImV4cCI6MjA4NTg4MDc3OX0.2PnaHtqm4j_PKc7yQaiQ3OJoAD4lHsYkfEfV8bJa5-w";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  hreflang?: { lang: string; href: string }[];
}

const today = new Date().toISOString().slice(0, 10);

const staticRoutes: Entry[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/shop", changefreq: "daily", priority: "0.95" },
  { path: "/kits", changefreq: "weekly", priority: "0.85" },
  { path: "/actualites", changefreq: "daily", priority: "0.85" },
  { path: "/ecoles", changefreq: "weekly", priority: "0.7" },
  { path: "/ressources", changefreq: "weekly", priority: "0.7" },
  { path: "/parrainage", changefreq: "monthly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.5" },
  { path: "/livraison-retours", changefreq: "monthly", priority: "0.5" },
  { path: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

async function rest<T>(path: string): Promise<T[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    console.warn(`[sitemap] ${path} → ${res.status}`);
    return [];
  }
  return (await res.json()) as T[];
}

async function fetchProducts(): Promise<Entry[]> {
  const rows = await rest<{ id: string; updated_at: string | null }>(
    "products?select=id,updated_at&is_active=eq.true&limit=2000"
  );
  return rows.map((r) => ({
    path: `/shop/product/${r.id}`,
    lastmod: (r.updated_at ?? new Date().toISOString()).slice(0, 10),
    changefreq: "weekly" as const,
    priority: "0.7",
  }));
}

async function fetchArticles(): Promise<Entry[]> {
  const rows = await rest<{ id: string; updated_at: string | null }>(
    "articles?select=id,updated_at&status=eq.published&limit=2000"
  );
  return rows.map((r) => ({
    path: `/actualites/${r.id}`,
    lastmod: (r.updated_at ?? new Date().toISOString()).slice(0, 10),
    changefreq: "weekly" as const,
    priority: "0.6",
  }));
}

function xmlEscape(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c === "'" ? "&apos;" : "&quot;"
  );
}

function renderEntry(e: Entry) {
  const loc = `${BASE_URL}${e.path}`;
  const hreflangs = (e.hreflang ?? [
    { lang: "fr-CI", href: loc },
    { lang: "fr", href: loc },
    { lang: "x-default", href: loc },
  ])
    .map((h) => `    <xhtml:link rel="alternate" hreflang="${h.lang}" href="${xmlEscape(h.href)}" />`)
    .join("\n");
  return [
    `  <url>`,
    `    <loc>${xmlEscape(loc)}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    hreflangs,
    `  </url>`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  let dynamicEntries: Entry[] = [];
  try {
    const [products, articles] = await Promise.all([fetchProducts(), fetchArticles()]);
    dynamicEntries = [...products, ...articles];
  } catch (err) {
    console.warn("[sitemap] dynamic fetch failed, falling back to static:", err);
  }

  const allEntries = [
    ...staticRoutes.map((r) => ({ ...r, lastmod: r.lastmod ?? today })),
    ...dynamicEntries,
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...allEntries.map(renderEntry),
    `</urlset>`,
  ].join("\n");

  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(
    `[sitemap] wrote ${allEntries.length} entries (static=${staticRoutes.length}, dynamic=${dynamicEntries.length})`
  );
}

main().catch((err) => {
  console.error("[sitemap] fatal:", err);
  process.exit(0); // don't break build
});
