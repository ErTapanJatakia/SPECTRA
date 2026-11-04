import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { inspectModelHierarchy } from "./modelInspection";

describe("inspectModelHierarchy", () => {
  it("preserves parent-child relationships and deterministic path identifiers", () => {
    const root = new THREE.Group();
    const branch = new THREE.Group();
    branch.name = "duplicate";
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial());
    mesh.name = "duplicate";
    branch.add(mesh);
    root.add(branch);

    const snapshot = inspectModelHierarchy(root);
    expect(snapshot.map((node) => node.id)).toEqual(["0", "0.0", "0.0.0"]);
    expect(snapshot.map((node) => node.parentId)).toEqual([null, "0", "0.0"]);
    expect(snapshot[2]).toMatchObject({
      name: "duplicate",
      type: "Mesh",
      isMesh: true,
      geometryType: "BoxGeometry",
      vertexCount: 24,
      materials: ["MeshStandardMaterial"]
    });
  });

  it("uses a safe fallback for unnamed objects and bounds traversal", () => {
    const root = new THREE.Group();
    root.add(new THREE.Group(), new THREE.Group(), new THREE.Group());
    const snapshot = inspectModelHierarchy(root, 2);
    expect(snapshot).toHaveLength(2);
    expect(snapshot[1].name).toBe("Group 0.0");
  });

  it("does not expose mutable Three.js objects in its snapshot", () => {
    const root = new THREE.Group();
    root.position.set(1, 2, 3);
    const snapshot = inspectModelHierarchy(root);
    expect(snapshot[0].position).toEqual([1, 2, 3]);
    expect(snapshot[0]).not.toHaveProperty("object");
    expect(snapshot[0]).not.toHaveProperty("geometry");
  });
});
