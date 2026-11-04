import { describe, expect, it } from "vitest";
import { domains } from "../data/domains";
import { normaliseSearchText, searchDomains } from "./search";

describe("SPECTRA domain search", () => {
  it("normalises case, whitespace and diacritics", () => {
    expect(normaliseSearchText("  Défence  SYSTEMS ")).toBe("defence systems");
  });
  it("returns matching domains for multi-word queries", () => {
    expect(searchDomains("cyber defence", domains).map((item) => item.slug)).toContain("cyber-digital-defence");
  });
  it("returns no results for an empty query", () => {
    expect(searchDomains("   ", domains)).toEqual([]);
  });
  it("does not return unrelated domains", () => {
    expect(searchDomains("peacekeeping radar", domains)).toEqual([]);
  });
});
