import { describe, expect, it } from "vitest";
import { parseThemeMode, resolveTheme } from "./theme";

describe("SPECTRA theme preferences", () => {
  it("resolves system preference to light", () => expect(resolveTheme("system", false)).toBe("light"));
  it("resolves system preference to dark", () => expect(resolveTheme("system", true)).toBe("dark"));
  it("preserves explicit contrast mode", () => expect(resolveTheme("contrast", true)).toBe("contrast"));
  it("falls back safely for invalid stored values", () => {
    expect(parseThemeMode("neon")).toBe("system");
    expect(parseThemeMode(null)).toBe("system");
  });
});
