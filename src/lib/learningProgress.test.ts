import { describe, expect, it } from "vitest";
import { emptyLearningProgress, getPathwayProgress, parseLearningProgress, recordLessonAttempt } from "./learningProgress";
import { learningPathways } from "../data/academy";

describe("learning progress", () => {
  it("returns an empty versioned state for missing or malformed storage", () => {
    expect(parseLearningProgress(null)).toEqual(emptyLearningProgress());
    expect(parseLearningProgress("{broken")).toEqual(emptyLearningProgress());
    expect(parseLearningProgress(JSON.stringify({ version: 2, lessons: {} }))).toEqual(emptyLearningProgress());
  });

  it("sanitises invalid entries and clamps stored scores", () => {
    const parsed = parseLearningProgress(JSON.stringify({ version: 1, lessons: {
      good: { completed: true, bestScore: 140, attempts: 2 },
      bad: { completed: "yes", bestScore: 50, attempts: 1 },
      negative: { completed: false, bestScore: 40, attempts: -1 }
    } }));
    expect(parsed.lessons.good).toEqual({ completed: true, bestScore: 100, attempts: 2 });
    expect(parsed.lessons.bad).toBeUndefined();
    expect(parsed.lessons.negative).toBeUndefined();
  });

  it("requires 70 percent to complete a lesson and retains the best score", () => {
    let progress = recordLessonAttempt(emptyLearningProgress(), "lesson-a", 50);
    expect(progress.lessons["lesson-a"]).toEqual({ completed: false, bestScore: 50, attempts: 1 });
    progress = recordLessonAttempt(progress, "lesson-a", 75);
    expect(progress.lessons["lesson-a"]).toEqual({ completed: true, bestScore: 75, attempts: 2 });
    progress = recordLessonAttempt(progress, "lesson-a", 60);
    expect(progress.lessons["lesson-a"]).toEqual({ completed: true, bestScore: 75, attempts: 3 });
  });

  it("calculates pathway progress from its own lesson identifiers", () => {
    const pathway = learningPathways[0];
    let progress = emptyLearningProgress();
    progress = recordLessonAttempt(progress, pathway.lessons[0].id, 100);
    expect(getPathwayProgress(pathway, progress)).toEqual({ completed: 1, total: 2, percent: 50 });
  });

  it("ignores invalid attempts without mutating the previous state", () => {
    const progress = emptyLearningProgress();
    expect(recordLessonAttempt(progress, "", 100)).toBe(progress);
    expect(recordLessonAttempt(progress, "lesson", Number.NaN)).toBe(progress);
  });
});
