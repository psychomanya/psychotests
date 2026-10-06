import { getTestById } from '@/data/tests';
import { RawAnswerRecord, SavedSubmission } from '@/types/test';

export interface EncodedPayload {
  t: string; // testId
  a: Record<number, number>; // answers
  c: number; // createdAt timestamp (ms)
  k: string; // token
}

export function buildSubmissionFromAnswers(
  testId: string,
  answers: Record<number, number>,
  token?: string,
  createdAtMs?: number
): { submission: SavedSubmission; encodedPayload: string } | null {
  const test = getTestById(testId);
  if (!test) return null;

  const calculated = test.calculateResult(answers);

  const rawAnswers: RawAnswerRecord[] = test.questions.map((q) => {
    const selectedValue = answers[q.id] ?? 0;
    const option = q.options.find((o) => o.value === selectedValue);
    const isCriticalHit =
      Boolean(q.isCritical) && selectedValue >= (q.criticalThreshold ?? 1);

    return {
      questionId: q.id,
      questionText: q.text,
      subscale: q.subscale,
      selectedLabel: option ? option.label : `Балл: ${selectedValue}`,
      score: selectedValue,
      isCritical: isCriticalHit,
      criticalAlertMessage: isCriticalHit ? q.criticalAlertMessage : undefined,
    };
  });

  const nowMs = createdAtMs || Date.now();
  const shareToken =
    token ||
    (typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36));
  const expiresAtMs = nowMs + 30 * 24 * 60 * 60 * 1000; // 30 days

  const submission: SavedSubmission = {
    shareToken,
    testId: test.id,
    testTitle: test.title,
    createdAt: new Date(nowMs).toISOString(),
    expiresAt: new Date(expiresAtMs).toISOString(),
    totalScore: calculated.totalScore,
    maxPossibleScore: calculated.maxPossibleScore,
    level: calculated.range.level,
    levelLabel: calculated.range.label,
    description: calculated.range.description,
    levelColor: calculated.range.color,
    subscaleScores: calculated.subscaleScores,
    criticalFlags: calculated.criticalFlags,
    rawAnswers,
  };

  const payload: EncodedPayload = {
    t: test.id,
    a: answers,
    c: nowMs,
    k: shareToken,
  };

  const encodedPayload = encodePayload(payload);

  return { submission, encodedPayload };
}

export function encodePayload(payload: EncodedPayload): string {
  try {
    const json = JSON.stringify(payload);
    if (typeof btoa !== 'undefined') {
      return btoa(unescape(encodeURIComponent(json)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    } else {
      return Buffer.from(json, 'utf8').toString('base64url');
    }
  } catch (e) {
    console.error('Error encoding payload', e);
    return '';
  }
}

export function decodePayload(encoded: string): EncodedPayload | null {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    let json: string;
    if (typeof atob !== 'undefined') {
      json = decodeURIComponent(escape(atob(base64)));
    } else {
      json = Buffer.from(base64, 'base64').toString('utf8');
    }
    return JSON.parse(json) as EncodedPayload;
  } catch (e) {
    console.error('Error decoding payload', e);
    return null;
  }
}

const STORAGE_PREFIX = 'psychotest_submission_';

export function saveToLocalStorage(submission: SavedSubmission, encoded: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${submission.shareToken}`, JSON.stringify(submission));
    localStorage.setItem(`${STORAGE_PREFIX}${submission.shareToken}_enc`, encoded);
    cleanExpiredLocalStorage();
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
}

export function getFromLocalStorage(token: string): SavedSubmission | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${token}`);
    if (!data) return null;
    const sub = JSON.parse(data) as SavedSubmission;
    if (new Date(sub.expiresAt).getTime() < Date.now()) {
      removeFromLocalStorage(token);
      return null;
    }
    return sub;
  } catch (e) {
    return null;
  }
}

export function getEncodedFromLocalStorage(token: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${token}_enc`);
  } catch {
    return null;
  }
}

export function removeFromLocalStorage(token: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${token}`);
    localStorage.removeItem(`${STORAGE_PREFIX}${token}_enc`);
  } catch (e) {
    console.error('Error removing from localStorage', e);
  }
}

export function cleanExpiredLocalStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX) && !key.endsWith('_enc')) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < now) {
              localStorage.removeItem(key);
              localStorage.removeItem(`${key}_enc`);
            }
          } catch {}
        }
      }
    }
  } catch {}
}
