import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import PageHeading from "../components/PageHeading";
import Icon from "../components/Icon";
import "./studio3d.css";

const MAX_MODEL_BYTES = 25 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".glb", ".gltf"];

function parseModelDocument(text: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("The model contains invalid JSON.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("The model document must be a JSON object.");
  }
  return parsed as Record<string, unknown>;
}

function parseGlbDocument(bytes: ArrayBuffer): Record<string, unknown> {
  const view = new DataView(bytes);
  if (bytes.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67 ||
      view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== bytes.byteLength) {
    throw new Error("The GLB header is invalid or the file is not a glTF 2.0 binary.");
  }

  let offset = 12;
  let jsonDocument: Record<string, unknown> | null = null;
  let binaryChunkCount = 0;
  let chunkIndex = 0;

  while (offset < bytes.byteLength) {
    if (offset + 8 > bytes.byteLength) throw new Error("The GLB contains a truncated chunk header.");
    const chunkLength = view.getUint32(offset, true);
    const chunkType = view.getUint32(offset + 4, true);
    const chunkStart = offset + 8;
    const chunkEnd = chunkStart + chunkLength;

    if (chunkLength % 4 !== 0 || chunkEnd > bytes.byteLength) {
      throw new Error("The GLB contains an invalid or truncated chunk.");
    }
    if (chunkIndex === 0 && chunkType !== 0x4e4f534a) {
      throw new Error("The first GLB chunk must contain the JSON document.");
    }
    if (chunkType === 0x4e4f534a) {
      if (jsonDocument) throw new Error("The GLB must contain exactly one JSON chunk.");
      const jsonText = new TextDecoder("utf-8", { fatal: true })
        .decode(new Uint8Array(bytes, chunkStart, chunkLength)).replace(/\\s+$/g, "");
      jsonDocument = parseModelDocument(jsonText);
    } else if (chunkType === 0x004e4942) {
      binaryChunkCount += 1;
      if (binaryChunkCount > 1 || !jsonDocument) {
        throw new Error("The GLB binary chunk is duplicated or incorrectly ordered.");
      }
    }
    offset = chunkEnd;
    chunkIndex += 1;
  }

  if (offset !== bytes.byteLength || !jsonDocument) {
    throw new Error("The GLB container is incomplete or has no JSON document.");
  }
  return jsonDocument;
}

async function validateModelFile(file: File, extension: string): Promise<void> {
  const document = extension === ".glb"
    ? parseGlbDocument(await file.arrayBuffer())
    : parseModelDocument(await file.text());

  const asset = document.asset;
  if (!asset || typeof asset !== "object" || Array.isArray(asset) ||
      (asset as { version?: unknown }).version !== "2.0") {
    throw new Error("Only glTF 2.0 models are supported.");
  }

  for (const collectionName of ["buffers", "images"] as const) {
    const collection = document[collectionName];
    if (collection !== undefined && !Array.isArray(collection)) {
      throw new Error(`The model's ${collectionName} property must be an array.`);
    }
    if (!Array.isArray(collection)) continue;

    for (const entry of collection) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        throw new Error(`The model contains an invalid ${collectionName} entry.`);
      }
      const uri = (entry as { uri?: unknown }).uri;
      if (uri === undefined) continue;
      if (typeof uri !== "string" || !/^data:/i.test(uri)) {
        throw new Error("External model resources are blocked. Use a self-contained GLB or embedded data URIs.");
      }
      const allowedDataUri = collectionName === "buffers"
        ? /^data:application\\/(?:octet-stream|gltf-buffer);base64,/i
        : /^data:image\\/(?:png|jpeg|webp);base64,/i;
      if (!allowedDataUri.test(uri)) {
        throw new Error(`The embedded ${collectionName === "images" ? "image" : "buffer"} data URI uses an unsupported or unsafe format.`);
      }
    }
  }

  for (const [collectionName, maximum] of [["nodes", 10000], ["meshes", 2000]] as const) {
    const collection = document[collectionName];
    if (collection !== undefined && !Array.isArray(collection)) {
      throw new Error(`The model's ${collectionName} property must be an array.`);
    }
    if (Array.isArray(collection) && collection.length > maximum) {
      throw new Error(`The model contains too many ${collectionName} (maximum ${maximum.toLocaleString("en-US")}).`);
    }
  }
}

type Annotation = { id: string; title: string; detail: string; position: [number, number, number] };

const annotations: Annotation[] = [
  { id: "01", title: "Primary structure", detail: "A visual reference point for understanding the model's overall form.", position: [0, 1.05, 0] },
  { id: "02", title: "External module", detail: "An illustrative modular element. This label does not describe an operational function.", position: [1.05, 0.35, 0.2] },
  { id: "03", title: "Support assembly", detail: "A generic supporting structure included for spatial orientation.", position: [-0.9, -0.35, 0.1] }
];

class ModelErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn("SPECTRA model viewer could not render this asset.", error, info); }
  render() {
    if (this.state.failed) return <Html center><div className="studio-canvas-error" role="alert">This model could not be rendered. Check the file and try another GLB/glTF asset.</div></Html>;
    return this.props.children;
  }
}

function DemoModel({ showAnnotations, selectedAnnotation, onSelect }: {
  showAnnotations: boolean; selectedAnnotation: string; onSelect: (id: string) => void;
}) {
  const accent = "#72b8a4";
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.42, 1.25]} />
        <meshStandardMaterial color="#526c78" metalness={0.42} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.92, 0.62, 0.82]} />
        <meshStandardMaterial color="#78909b" metalness={0.28} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.84, 0]} castShadow>
        <boxGeometry args={[0.52, 0.12, 0.52]} />
        <meshStandardMaterial color={accent} metalness={0.3} roughness={0.5} />
      </mesh>
      {[-0.82, 0.82].map((x) => [-0.48, 0.48].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, -0.36, z]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.18, 24]} />
          <meshStandardMaterial color="#283e49" metalness={0.25} roughness={0.7} />
        </mesh>
      )))}
      {showAnnotations && annotations.map((item) => (
        <Html key={item.id} position={item.position} distanceFactor={9} style={{ pointerEvents: "auto" }}>
          <button className={`studio-hotspot ${selectedAnnotation === item.id ? "studio-hotspot-active" : ""}`}
            onClick={() => onSelect(item.id)} aria-label={`Show annotation: ${item.title}`}>{item.id}</button>
        </Html>
      ))}
    </group>
  );
}

function ImportedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} />;
}

function Scene({ modelUrl, showAnnotations, selectedAnnotation, onSelect, resetKey, dark }: {
  modelUrl: string | null; showAnnotations: boolean; selectedAnnotation: string;
  onSelect: (id: string) => void; resetKey: number; dark: boolean;
}) {
  return (
    <Canvas camera={{ position: [4.2, 3.1, 5.2], fov: 42 }} dpr={[1, 1.7]}
      shadows gl={{ antialias: true, alpha: true }} fallback={<div className="studio-canvas-error">WebGL is unavailable in this browser. Use the text-based model notes below.</div>}>
      <color attach="background" args={[dark ? "#111b22" : "#e8eef0"]} />
      <ambientLight intensity={dark ? 1.15 : 1.5} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#8bb9d0" />
      <gridHelper args={[12, 24, dark ? "#334b56" : "#c1d0d4", dark ? "#263943" : "#d2dcdf"]} position={[0, -0.8, 0]} />
      <Suspense fallback={<Html center><div className="studio-loader">Loading model…</div></Html>}>
        <ModelErrorBoundary>
          {modelUrl ? <Center><ImportedModel url={modelUrl} /></Center> : <DemoModel showAnnotations={showAnnotations} selectedAnnotation={selectedAnnotation} onSelect={onSelect} />}
        </ModelErrorBoundary>
      </Suspense>
      <OrbitControls key={resetKey} makeDefault enableDamping dampingFactor={0.08} minDistance={2} maxDistance={18} />
    </Canvas>
  );
}

export default function Studio3DPage() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const importRequestRef = useRef(0);
  const [modelName, setModelName] = useState("SPECTRA illustrative reference model");
  const [sourceNote, setSourceNote] = useState("Original geometric demonstration asset");
  const [licenceNote, setLicenceNote] = useState("SPECTRA demo geometry — original");
  const [fileError, setFileError] = useState("");
  const [selectedAnnotation, setSelectedAnnotation] = useState("01");
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => () => { if (modelUrl) { useGLTF.clear(modelUrl); URL.revokeObjectURL(modelUrl); } }, [modelUrl]);

  async function handleFile(file?: File) {
    if (!file) return;
    const requestId = ++importRequestRef.current;
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!ACCEPTED_EXTENSIONS.includes(extension)) { setFileError("Unsupported file. Select a .glb or .gltf model."); return; }
    if (file.size > MAX_MODEL_BYTES) { setFileError("The selected model exceeds the 25 MB browser-local limit."); return; }
    if (file.size === 0) { setFileError("The selected file is empty."); return; }

    setFileError("");
    try {
      await validateModelFile(file, extension);
      if (requestId !== importRequestRef.current) return;
      const nextUrl = URL.createObjectURL(file);
      setModelUrl(nextUrl);
      setModelName(file.name);
      setSourceNote("User-selected local file — provenance not independently verified");
      setLicenceNote("User must confirm permission to use this asset");
    } catch (error) {
      if (requestId !== importRequestRef.current) return;
      setFileError(error instanceof Error ? error.message : "The selected model could not be validated.");
    }
  }

  const activeAnnotation = annotations.find((item) => item.id === selectedAnnotation) ?? annotations[0];

  return (
    <div className="page-stack studio-page">
      <PageHeading eyebrow="VISUAL LEARNING / MODEL INSPECTION" title="3D Studio"
        description="Explore original demonstration geometry or inspect a properly licensed GLB/glTF model locally in your browser." />
      <div className="studio-governance" role="note">
        <Icon name="shield" size={18} />
        <p><strong>Educational use only.</strong> The studio supports visual familiarisation and general identification. It does not provide weapon operation, assembly, targeting, firing, modification or tactical simulation guidance.</p>
      </div>

      <section className="studio-workspace" aria-label="3D model workspace">
        <div className="studio-viewer-column">
          <div className="studio-toolbar">
            <div><span className="eyebrow">INTERACTIVE VIEWPORT</span><strong>{modelUrl ? "LOCAL MODEL" : "DEMONSTRATION SCENE"}</strong></div>
            <div className="studio-toolbar-actions">
              <button className="studio-tool-button" onClick={() => setShowAnnotations((value) => !value)} aria-pressed={showAnnotations}><Icon name="map" size={15} /> {showAnnotations ? "Hide labels" : "Show labels"}</button>
              <button className="studio-tool-button" onClick={() => setResetKey((value) => value + 1)}><Icon name="arrow" size={15} /> Reset view</button>
              <button className="studio-tool-button" onClick={() => setDark((value) => !value)} aria-pressed={dark}><Icon name="sun" size={15} /> Lighting</button>
            </div>
          </div>
          <div className="studio-canvas-wrap">
            <Scene modelUrl={modelUrl} showAnnotations={showAnnotations} selectedAnnotation={selectedAnnotation}
              onSelect={setSelectedAnnotation} resetKey={resetKey} dark={dark} />
            <div className="studio-viewer-hint"><span>DRAG · ORBIT</span><span>SCROLL · ZOOM</span><span>RIGHT-DRAG · PAN</span></div>
          </div>
          <div className="studio-viewer-caption"><span><i className="studio-status-dot" /> Browser-local rendering</span><span>No model is uploaded to SPECTRA servers</span></div>
        </div>

        <aside className="studio-side-panel">
          <section className="studio-panel-section">
            <span className="eyebrow">MODEL LIBRARY</span>
            <h2>Load a model</h2>
            <p>Choose a self-contained GLB or glTF 2.0 asset. External model resources are blocked; the file remains in this browser session.</p>
            <label className="studio-upload" htmlFor="studio-model-file"><Icon name="file" size={18} /><strong>Select 3D model</strong><span>GLB / glTF 2.0 · 25 MB maximum · Embedded resources only</span></label>
            <input id="studio-model-file" className="studio-file-input" type="file" accept=".glb,.gltf,model/gltf-binary,model/gltf+json" onChange={(event) => { void handleFile(event.target.files?.[0]); event.target.value = ""; }} />
            {fileError && <p className="studio-error" role="alert">{fileError}</p>}
            {modelUrl && <button className="studio-clear-button" onClick={() => { importRequestRef.current += 1; setModelUrl(null); setModelName("SPECTRA illustrative reference model"); setSourceNote("Original geometric demonstration asset"); setLicenceNote("SPECTRA demo geometry — original"); }}>Unload local model</button>}
          </section>

          <section className="studio-panel-section">
            <span className="eyebrow">ANNOTATIONS</span>
            <h2>Explore features</h2>
            {modelUrl ? <p>Demo annotations apply only to the original sample geometry. Imported models are shown without inferred labels.</p> : <div className="studio-annotation-list">
              {annotations.map((item) => <button key={item.id} className={`studio-annotation ${selectedAnnotation === item.id ? "studio-annotation-active" : ""}`} onClick={() => setSelectedAnnotation(item.id)}><span>{item.id}</span><strong>{item.title}</strong><Icon name="chevron" size={15} /></button>)}
            </div>}
            {!modelUrl && <div className="studio-annotation-detail"><strong>{activeAnnotation.title}</strong><p>{activeAnnotation.detail}</p></div>}
          </section>

          <section className="studio-panel-section studio-provenance">
            <span className="eyebrow">PROVENANCE & RIGHTS</span>
            <h2>Asset information</h2>
            <label>Model name<input value={modelName} onChange={(event) => setModelName(event.target.value)} /></label>
            <label>Source / creator<input value={sourceNote} onChange={(event) => setSourceNote(event.target.value)} /></label>
            <label>Licence / permission<input value={licenceNote} onChange={(event) => setLicenceNote(event.target.value)} /></label>
            <p className="studio-rights-note">Metadata is a local session note, not independent rights verification. Confirm the creator, licence, attribution and redistribution terms before publishing or sharing an asset.</p>
          </section>
        </aside>
      </section>

      <section className="studio-bottom-grid">
        <article className="studio-info-card"><span className="eyebrow">CONTROLS</span><h2>Navigate the model</h2><ul><li><strong>Orbit:</strong> drag with the primary pointer.</li><li><strong>Zoom:</strong> use the mouse wheel or trackpad gesture.</li><li><strong>Pan:</strong> right-drag or use the supported touch gesture.</li><li><strong>Reset:</strong> restore the default camera position at any time.</li></ul></article>
        <article className="studio-info-card"><span className="eyebrow">MODEL GOVERNANCE</span><h2>Responsible asset handling</h2><ul><li>Use only assets you are authorised to view and process.</li><li>Do not assume publicly accessible models are openly licensed.</li><li>Keep source, creator, licence and attribution details with every published model.</li><li>Imported assets are processed locally and are not saved to the repository.</li></ul></article>
      </section>
      <p className="studio-accessibility-note">If WebGL is unavailable or a model cannot be rendered, use the model information and annotation text as the accessible learning alternative.</p>
    </div>
  );
}
