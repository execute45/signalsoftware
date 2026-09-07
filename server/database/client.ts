import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const require = createRequire(import.meta.url)
const Database = require('better-sqlite3') as typeof import('better-sqlite3')

const dbPath = process.env.NUXT_DATABASE_URL || join(process.cwd(), '.data', 'signal.db')

mkdirSync(dirname(dbPath), { recursive: true })

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    project_type TEXT,
    goal TEXT,
    timeline TEXT,
    budget TEXT,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    published INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`)

function ensureLeadColumns() {
  const columns = sqlite.prepare('PRAGMA table_info(leads)').all() as Array<{ name: string }>
  const names = new Set(columns.map((column) => column.name))
  const additions: Array<[string, string]> = [
    ['project_type', 'TEXT'],
    ['goal', 'TEXT'],
    ['timeline', 'TEXT'],
    ['budget', 'TEXT'],
  ]

  for (const [name, type] of additions) {
    if (!names.has(name)) {
      sqlite.exec(`ALTER TABLE leads ADD COLUMN ${name} ${type}`)
    }
  }
}

ensureLeadColumns()

export const db = drizzle(sqlite, { schema })
