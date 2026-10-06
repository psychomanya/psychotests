export type SeverityLevel = 'normal' | 'mild' | 'moderate' | 'severe';

export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  subscale?: string;
  isCritical?: boolean;
  criticalThreshold?: number; // e.g., if chosen value >= threshold, flag as critical
  criticalAlertMessage?: string;
  options: QuestionOption[];
}

export interface ScoreRange {
  min: number;
  max: number;
  label: string;
  level: SeverityLevel;
  description: string;
  color: string; // Tailwind color class or hex
}

export interface SubscaleDefinition {
  key: string;
  title: string;
  description?: string;
  maxScore: number;
  ranges?: ScoreRange[];
}

export interface CalculatedSubscaleScore {
  key: string;
  title: string;
  score: number;
  maxScore: number;
  levelLabel?: string;
  color?: string;
}

export interface TestResultCalculated {
  totalScore: number;
  maxPossibleScore: number;
  range: ScoreRange;
  subscaleScores: CalculatedSubscaleScore[];
  criticalFlags: string[];
}

export interface TestDefinition {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  clinicalNote?: string;
  durationMinutes: number;
  questionsCount: number;
  badge: string;
  instructions: string;
  questions: Question[];
  scoreRanges: ScoreRange[];
  subscales?: SubscaleDefinition[];
  calculateResult: (answers: Record<number, number>) => TestResultCalculated;
}

export type ClientTestDefinition = Omit<TestDefinition, 'calculateResult'>;

export interface RawAnswerRecord {
  questionId: number;
  questionText: string;
  subscale?: string;
  selectedLabel: string;
  score: number;
  isCritical?: boolean;
  criticalAlertMessage?: string;
}

export interface SavedSubmission {
  shareToken: string;
  testId: string;
  testTitle: string;
  createdAt: string;
  expiresAt: string;
  totalScore: number;
  maxPossibleScore: number;
  level: SeverityLevel;
  levelLabel: string;
  description: string;
  levelColor: string;
  subscaleScores: CalculatedSubscaleScore[];
  criticalFlags: string[];
  rawAnswers: RawAnswerRecord[];
}
