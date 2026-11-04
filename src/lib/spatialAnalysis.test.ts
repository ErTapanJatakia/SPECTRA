import { describe, expect, it } from "vitest";
import { cameraPositionForPreset, distanceBetweenPoints, formatDistance } from "./spatialAnalysis";

describe("spatial analysis helpers", () => {
  it("calculates Euclidean distance between world-space points", () => {
    expect(distanceBetweenPoints([0, 0, 0], [3, 4, 0])).toBe(5);
  });

  it("formats metres and centimetres without losing precision", () => {
    expect(formatDistance(1.23456)).toBe("1.235 m");
    expect(formatDistance(1.234, "cm")).toBe("123.4 cm");
  });

  it("returns a safe unavailable label for invalid measurements", () => {
    expect(formatDistance(Number.NaN)).toBe("Unavailable");
    expect(distanceBetweenPoints([0, 0, 0], [Number.POSITIVE_INFINITY, 1, 1])).toBe(0);
  });

  it("creates bounded camera positions around the requested target", () => {
    expect(cameraPositionForPreset([1, 2, 3], "front", 5)).toEqual([1, 2, 8]);
    const top = cameraPositionForPreset([0, 0, 0], "top", 100);
    expect(top[1]).toBe(18);
    expect(top[0]).toBe(0);
    expect(top[2]).toBe(0);
  });
});
