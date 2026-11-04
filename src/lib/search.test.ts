import { describe, expect, it } from "vitest";
import { domains } from "../data/domains";
import { equipmentRecords, organisations } from "../data/knowledgeBase";
import { filterEquipment, normaliseSearchText, searchDomains } from "./search";

describe("SPECTRA domain search", () => {
  it("normalises case, repeated whitespace and diacritics", () => {
    expect(normaliseSearchText("  Défence  SYSTEMS ")).toBe("defence systems");
  });
  it("returns matching domains for multi-word queries", () => {
    expect(searchDomains("cyber defence", domains).map((item) => item.slug)).toContain("cyber-digital-defence");
  });
  it("returns no results for an empty domain query", () => {
    expect(searchDomains("   ", domains)).toEqual([]);
  });
});

describe("SPECTRA equipment search and filtering", () => {
  it("finds equipment by alias and designation", () => {
    expect(filterEquipment(equipmentRecords, { query:"Tejas" }, organisations).map((record) => record.id)).toContain("eqp-lca-tejas");
    expect(filterEquipment(equipmentRecords, { query:"DDG 51" }, organisations).map((record) => record.id)).toContain("eqp-ddg51-arleigh-burke");
  });
  it("filters by ISO country code", () => {
    const results = filterEquipment(equipmentRecords, { countryId:"IN" }, organisations);
    expect(results).toHaveLength(2);
    expect(results.every((record) => record.originCountryIds.includes("IN"))).toBe(true);
  });
  it("filters by taxonomy domain and category together", () => {
    const results = filterEquipment(equipmentRecords, { domainId:"domain-land", categoryId:"cat-main-battle-tank" }, organisations);
    expect(results.length).toBeGreaterThan(1);
    expect(results.every((record) => record.classification.domainIds.includes("domain-land") && record.classification.categoryId === "cat-main-battle-tank")).toBe(true);
  });
  it("filters by the branch of a documented operator organisation", () => {
    const results = filterEquipment(equipmentRecords, { branch:"naval" }, organisations);
    expect(results.map((record) => record.id)).toContain("eqp-mogami-class");
    expect(results.map((record) => record.id)).not.toContain("eqp-char-leclerc");
  });
  it("does not infer operator branch when a record has no operator attribution", () => {
    const results = filterEquipment(equipmentRecords, { branch:"land" }, organisations);
    expect(results.map((record) => record.id)).not.toContain("eqp-arjun-mbt-mk1a");
  });
  it("filters on public status", () => {
    const results = filterEquipment(equipmentRecords, { status:"unknown" }, organisations);
    expect(results.map((record) => record.id)).toContain("eqp-arjun-mbt-mk1a");
  });
  it("returns no results when filters do not intersect", () => {
    expect(filterEquipment(equipmentRecords, { countryId:"IN", domainId:"domain-naval" }, organisations)).toEqual([]);
  });
});
