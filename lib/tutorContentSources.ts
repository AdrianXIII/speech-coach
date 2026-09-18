import { getDb, hasDatabase } from "@/lib/db";

export interface ContentSource {
  title: string;
  author: string | null;
  year: string | null;
  url: string | null;
}

/**
 * Sources a completed content review found for this contentKey — populated by
 * app/api/tutor/content-review/run/route.ts once a review reaches a non-
 * needs_expert outcome. This is the one place a future student-facing UI
 * (citation numbers, per-category source PDF — not built yet) will read
 * from; it lives in the database rather than inside the hand-authored
 * lib/tutorTeachingContent.ts, the same "static content + DB-backed extra
 * layer" pattern lib/tutorNews.ts already uses for the news cache.
 */
export async function getContentSources(contentKey: string): Promise<ContentSource[]> {
  if (!hasDatabase()) return [];
  const sql = await getDb();
  const rows = await sql!`
    select title, author, year, url
    from tutor_content_sources
    where content_key = ${contentKey}
    order by id asc
  `;
  return rows.map((row) => ({
    title: row.title,
    author: row.author,
    year: row.year,
    url: row.url,
  }));
}

/**
 * Replaces the stored sources for a contentKey with a fresh, de-duplicated
 * set — called after a review completes with a non-needs_expert outcome.
 * Deduplicates by URL when present, otherwise by title, so re-running a
 * review doesn't pile up repeats of the same source.
 */
export async function saveContentSources(contentKey: string, sources: ContentSource[]): Promise<void> {
  if (!hasDatabase()) return;
  const seen = new Set<string>();
  const deduped = sources.filter((s) => {
    const key = (s.url || s.title).trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const sql = await getDb();
  await sql!`delete from tutor_content_sources where content_key = ${contentKey}`;
  for (const source of deduped) {
    await sql!`
      insert into tutor_content_sources (content_key, title, author, year, url)
      values (${contentKey}, ${source.title}, ${source.author}, ${source.year}, ${source.url})
    `;
  }
}
