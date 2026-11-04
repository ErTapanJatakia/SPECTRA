export type SpatialPoint = readonly [number, number, number];

export function distanceBetweenPoints(a: SpatialPoint, b: SpatialPoint): number {
  const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  return Number.isFinite(distance) ? distance : 0;
}

export function formatDistance(distance: number, unit: "m" | "cm" = "m"): string {
  if (!Number.isFinite(distance) || distance < 0) return "Unavailable";
  if (unit === "cm") return `${(distance * 100).toFixed(1)} cm`;
  return `${distance.toFixed(3)} m`;
}

export const CAMERA_PRESETS = {
  front: [0, 0, 1] as SpatialPoint,
  back: [0, 0, -1] as SpatialPoint,
  left: [-1, 0, 0] as SpatialPoint,
  right: [1, 0, 0] as SpatialPoint,
  top: [0, 1, 0] as SpatialPoint,
  bottom: [0, -1, 0] as SpatialPoint,
  isometric: [1, 0.75, 1] as SpatialPoint
} as const;

export type CameraPreset = keyof typeof CAMERA_PRESETS;

export function cameraPositionForPreset(
  target: SpatialPoint,
  preset: CameraPreset,
  distance = 7
): SpatialPoint {
  const direction = CAMERA_PRESETS[preset];
  const length = Math.hypot(...direction);
  const safeDistance = Number.isFinite(distance) ? Math.min(18, Math.max(2, distance)) : 7;
  return [
    target[0] + direction[0] / length * safeDistance,
    target[1] + direction[1] / length * safeDistance,
    target[2] + direction[2] / length * safeDistance
  ];
}
