/** Picks a random item from a list, optionally excluding one (e.g. "don't repeat the last case"). */
export function pickRandom<T>(items: T[], exclude?: T): T {
  const pool = exclude ? items.filter((i) => i !== exclude) : items;
  const source = pool.length > 0 ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}
