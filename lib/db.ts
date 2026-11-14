import "server-only";

import { Pool } from "pg";

declare global {
  var vgDbPool: Pool | undefined;
}

// Made on the first query, not at import, so a missing DATABASE_URL only breaks /api/*,
// never the build of the rest of the site.
export function getPool(): Pool {
  if (globalThis.vgDbPool) {
    return globalThis.vgDbPool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL");
  }

  globalThis.vgDbPool = new Pool({ connectionString });
  return globalThis.vgDbPool;
}
