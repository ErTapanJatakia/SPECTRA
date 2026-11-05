import type { LearningPathway } from "../data/academy";

export const LEARNING_PROGRESS_KEY = "spectra.learning-progress.v1";
export type LessonProgress = { completed: boolean; bestScore: number; attempts: number };
export type LearningProgress = { version: 1; lessons: Record<string, LessonProgress> };

export function emptyLearningProgress(): LearningProgress {
  return { version: 1, lessons: {} };
}

export function parseLearningProgress(raw: string | null): LearningProgress {
  if (!raw) return emptyLearningProgress();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return emptyLearningProgress();
    const candidate = parsed as { version?: unknown; lessons?: unknown };
    if (candidate.version !== 1 || !candidate.lessons || typeof candidate.lessons !== "object" || Array.isArray(candidate.lessons)) {
      return emptyLearningProgress();
    }
    const lessons: Record<string, LessonProgress> = {};
    for (const [id, value] of Object.entries(candidate.lessons)) {
      if (!id.trim() || !value || typeof value !== "object" || Array.isArray(value)) continue;
      const item = value as Record<string, unknown>;
      if (typeof item.completed !== "boolean" || typeof item.bestScore !== "number" || !Number.isFinite(item.bestScore) ||
          typeof item.attempts !== "number" || !Number.isInteger(item.attempts) || item.attempts < 1) continue;

      const bestScore = Math.max(0, Math.min(100, Math.round(item.bestScore)));
      if (item.completed !== (bestScore >= 70)) continue;

      Object.defineProperty(lessons, id, {
        value: { completed: item.completed, bestScore, attempts: item.attempts },
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    return { version: 1, lessons };
  } catch {
    return emptyLearningProgress();
  }
}

export function recordLessonAttempt(progress: LearningProgress, lessonId: string, score: number): LearningProgress {
  if (!lessonId.trim() || !Number.isFinite(score)) return progress;
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const previous = progress.lessons[lessonId];
  return {
    version: 1,
    lessons: {
      ...progress.lessons,
      [lessonId]: {
        completed: Boolean(previous?.completed || safeScore >= 70),
        bestScore: Math.max(previous?.bestScore ?? 0, safeScore),
        attempts: (previous?.attempts ?? 0) + 1
      }
    }
  };
}

export function getPathwayProgress(pathway: LearningPathway, progress: LearningProgress) {
  const lessons = pathway.lessons.map((lesson) => progress.lessons[lesson.id]);
  const completed = lessons.filter((item) => item?.completed).length;
  return { completed, total: lessons.length, percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0 };
}
