const NGL_SRC = "https://cdn.jsdelivr.net/npm/ngl@2.0.0-dev.37/dist/ngl.js";

export type NglComponent = {
  addRepresentation: (type: string, params: Record<string, unknown>) => void;
  autoView: () => void;
};

export type NglStage = {
  loadFile: (url: string) => Promise<NglComponent>;
  handleResize: () => void;
  dispose: () => void;
};

export type NglNamespace = {
  Stage: new (
    el: string | HTMLElement,
    params?: { backgroundColor?: string },
  ) => NglStage;
};

declare global {
  interface Window {
    NGL?: NglNamespace;
  }
}

let loading: Promise<NglNamespace> | null = null;

export function loadNgl(): Promise<NglNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("NGL is browser-only"));
  }
  if (window.NGL) return Promise.resolve(window.NGL);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${NGL_SRC}"]`);
    if (existing && window.NGL) {
      resolve(window.NGL);
      return;
    }
    const script = existing ?? document.createElement("script");
    script.src = NGL_SRC;
    script.async = true;
    script.onload = () => {
      if (window.NGL) resolve(window.NGL);
      else reject(new Error("NGL failed to initialize"));
    };
    script.onerror = () => reject(new Error("Failed to load NGL"));
    if (!existing) document.head.appendChild(script);
  });

  return loading;
}
