import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { SavedSubmission } from '@/types/test';

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'tests.db');
  dbInstance = new DatabaseSync(dbPath);

  // Initialize table
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      share_token TEXT PRIMARY KEY,
      test_id TEXT NOT NULL,
      test_title TEXT NOT NULL,
      total_score INTEGER NOT NULL,
      max_possible_score INTEGER NOT NULL,
      level TEXT NOT NULL,
      level_label TEXT NOT NULL,
      level_color TEXT NOT NULL,
      description TEXT NOT NULL,
      subscale_scores_json TEXT NOT NULL,
      critical_flags_json TEXT NOT NULL,
      raw_answers_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_expires_at ON submissions (expires_at);
  `);

  return dbInstance;
}

// Clean up expired submissions (older than expires_at)
function purgeExpired(db: DatabaseSync) {
  try {
    const nowIso = new Date().toISOString();
    const stmt = db.prepare('DELETE FROM submissions WHERE expires_at < ?');
    stmt.run(nowIso);
  } catch (err) {
    console.error('Error purging expired submissions:', err);
  }
}

export function saveSubmission(submission: SavedSubmission): void {
  const db = getDb();
  purgeExpired(db);

  const stmt = db.prepare(`
    INSERT INTO submissions (
      share_token,
      test_id,
      test_title,
      total_score,
      max_possible_score,
      level,
      level_label,
      level_color,
      description,
      subscale_scores_json,
      critical_flags_json,
      raw_answers_json,
      created_at,
      expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    submission.shareToken,
    submission.testId,
    submission.testTitle,
    submission.totalScore,
    submission.maxPossibleScore,
    submission.level,
    submission.levelLabel,
    submission.levelColor,
    submission.description,
    JSON.stringify(submission.subscaleScores),
    JSON.stringify(submission.criticalFlags),
    JSON.stringify(submission.rawAnswers),
    submission.createdAt,
    submission.expiresAt
  );
}

export function getSubmission(shareToken: string): SavedSubmission | null {
  const db = getDb();
  purgeExpired(db);

  const stmt = db.prepare('SELECT * FROM submissions WHERE share_token = ?');
  const row = stmt.get(shareToken) as any;

  if (!row) {
    return null;
  }

  // Double check expiration
  if (new Date(row.expires_at) < new Date()) {
    deleteSubmission(shareToken);
    return null;
  }

  return {
    shareToken: row.share_token,
    testId: row.test_id,
    testTitle: row.test_title,
    totalScore: row.total_score,
    maxPossibleScore: row.max_possible_score,
    level: row.level,
    levelLabel: row.level_label,
    levelColor: row.level_color,
    description: row.description,
    subscaleScores: JSON.parse(row.subscale_scores_json),
    criticalFlags: JSON.parse(row.critical_flags_json),
    rawAnswers: JSON.parse(row.raw_answers_json),
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}

export function deleteSubmission(shareToken: string): boolean {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM submissions WHERE share_token = ?');
  const res = stmt.run(shareToken) as any;
  return res && res.changes > 0;
}
