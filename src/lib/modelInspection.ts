import * as THREE from "three";

export type ModelNodeSnapshot = {
  id: string;
  parentId: string | null;
  name: string;
  type: string;
  visible: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  isMesh: boolean;
  geometryType?: string;
  vertexCount?: number;
  indexCount?: number;
  materials?: string[];
};

const finiteTuple = (values: number[]): [number, number, number] => [
  Number.isFinite(values[0]) ? values[0] : 0,
  Number.isFinite(values[1]) ? values[1] : 0,
  Number.isFinite(values[2]) ? values[2] : 0
];

/**
 * Creates a bounded, read-only snapshot of a loaded Three.js object hierarchy.
 * IDs are derived from child-index paths, not untrusted or potentially duplicate names.
 */
export function inspectModelHierarchy(root: THREE.Object3D, maxNodes = 2500): ModelNodeSnapshot[] {
  const limit = Number.isSafeInteger(maxNodes) && maxNodes > 0 ? Math.min(maxNodes, 2500) : 2500;
  const result: ModelNodeSnapshot[] = [];
  const stack: Array<{ object: THREE.Object3D; id: string; parentId: string | null }> = [
    { object: root, id: "0", parentId: null }
  ];

  while (stack.length > 0 && result.length < limit) {
    const current = stack.pop()!;
    const object = current.object;
    const mesh = object as THREE.Mesh;
    const isMesh = mesh.isMesh === true;
    const materials = isMesh
      ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material])
          .filter(Boolean)
          .map((material) => material.name?.trim() || material.type)
      : undefined;
    const position = finiteTuple(object.position.toArray().slice(0, 3));
    const rotation = finiteTuple([object.rotation.x, object.rotation.y, object.rotation.z]);
    const scale = finiteTuple(object.scale.toArray().slice(0, 3));

    result.push({
      id: current.id,
      parentId: current.parentId,
      name: object.name?.trim() || `${object.type} ${current.id}`,
      type: object.type,
      visible: object.visible,
      position,
      rotation,
      scale,
      isMesh,
      ...(isMesh ? {
        geometryType: mesh.geometry?.type || "Unknown geometry",
        vertexCount: mesh.geometry?.attributes?.position?.count ?? 0,
        indexCount: mesh.geometry?.index?.count ?? mesh.geometry?.attributes?.position?.count ?? 0,
        materials
      } : {})
    });

    for (let index = object.children.length - 1; index >= 0; index -= 1) {
      stack.push({
        object: object.children[index],
        id: `${current.id}.${index}`,
        parentId: current.id
      });
    }
  }

  return result;
}
