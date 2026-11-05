import { describe, expect, it } from "vitest";
import { cameraDistanceForBounds, cameraPositionForPreset, distanceBetweenPoints, formatDistance } from "./spatialAnalysis";

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
    expect(top[1]).toBe(100);
    expect(cameraPositionForPreset([0, 0, 0], "front", 100_000)[2]).toBe(10_000);
    expect(top[0]).toBe(0);
    expect(top[2]).toBe(0);
  });

  it("fits scene bounds with a safe perspective distance", () => {
    expect(cameraDistanceForBounds([2, 4, 6])).toBeGreaterThan(6);
    expect(cameraDistanceForBounds([0, 0, 0])).toBe(7);
    expect(cameraDistanceForBounds([1e9, 1e9, 1e9])).toBe(10_000);
  });
});
