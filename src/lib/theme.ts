export type ThemeMode = "system" | "light" | "dark" | "contrast";
export type ResolvedTheme = "light" | "dark" | "contrast";
export const THEME_STORAGE_KEY = "spectra.theme";

export function resolveTheme(mode: ThemeMode, systemPrefersDark: boolean): ResolvedTheme {
  if (mode === "system") return systemPrefersDark ? "dark" : "light";
  return mode;
}
export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark" || value === "contrast";
}
export function parseThemeMode(value: string | null): ThemeMode {
  return isThemeMode(value) ? value : "system";
}
