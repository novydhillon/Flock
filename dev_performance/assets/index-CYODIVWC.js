const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-b4As-HHC.js","./main-DqPRpCBv.css"])))=>i.map(i=>d[i]);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
function createLoading({
  document: doc = globalThis.document,
  window: win = globalThis.window,
  reload = () => win.location.reload()
} = {}) {
  const overlay = doc.getElementById("loading"), status = doc.getElementById("loading-status"), detail = doc.getElementById("loading-detail"), retry = doc.getElementById("loading-retry");
  let state = "loading", slowTimer, fadeTimer;
  const blocked = [...doc.body.children].filter((node) => node !== overlay && node.tagName !== "SCRIPT").map((node) => [node, node.inert]);
  blocked.forEach(([node]) => {
    node.inert = true;
  });
  const retryNow = () => {
    if (retry.hidden || retry.disabled) return;
    retry.disabled = true;
    status.textContent = "Trying again...";
    reload();
  };
  const block = (event) => {
    if (state === "disposed") return;
    event.stopImmediatePropagation();
    if (overlay.contains(event.target) && !["keydown", "keyup"].includes(event.type)) {
      if (event.target === retry && event.type === "click") {
        event.preventDefault();
        retryNow();
      }
      return;
    }
    event.preventDefault();
    if (event.type === "keydown" && event.key === "Tab" && !retry.hidden) retry.focus();
    if (event.target === retry && (event.type === "click" || event.type === "keydown" && ["Enter", " "].includes(event.key)))
      retryNow();
  };
  const events = ["pointerdown", "pointerup", "click", "keydown", "keyup", "touchstart", "touchend"];
  events.forEach((type) => doc.addEventListener(type, block, { capture: true, passive: false }));
  const visibility = () => overlay.classList.toggle("loading-paused", doc.hidden);
  doc.addEventListener("visibilitychange", visibility);
  visibility();
  const clearSlow = () => win.clearTimeout(slowTimer);
  function stage(message) {
    if (state !== "loading") return;
    if (status.textContent !== message) status.textContent = message;
    detail.textContent = "";
    retry.hidden = true;
    clearSlow();
    slowTimer = win.setTimeout(() => {
      if (state === "loading") {
        detail.textContent = "Still getting things ready. You can wait, or retry.";
        retry.hidden = false;
      }
    }, 12e3);
  }
  function dispose() {
    if (state === "disposed") return;
    state = "disposed";
    clearSlow();
    win.clearTimeout(fadeTimer);
    doc.removeEventListener("visibilitychange", visibility);
    events.forEach((type) => doc.removeEventListener(type, block, true));
    blocked.forEach(([node, inert]) => {
      node.inert = inert;
    });
    overlay.remove();
  }
  function ready() {
    if (state !== "loading") return Promise.resolve();
    state = "revealing";
    clearSlow();
    status.textContent = "The meadow is ready.";
    overlay.setAttribute("aria-busy", "false");
    overlay.classList.add("loading-ready");
    return new Promise((resolve) => {
      const finish = () => {
        dispose();
        resolve();
      };
      if (win.matchMedia?.("(prefers-reduced-motion: reduce)").matches) finish();
      else fadeTimer = win.setTimeout(finish, 320);
    });
  }
  function fail(error) {
    if (state === "disposed") return;
    state = "error";
    clearSlow();
    overlay.setAttribute("aria-busy", "false");
    overlay.classList.add("loading-failed");
    status.textContent = error?.code === "WEBGL_UNAVAILABLE" ? "This browser could not open the 3D meadow." : "The meadow could not finish loading.";
    detail.textContent = error?.code === "WEBGL_UNAVAILABLE" ? "WebGL 2 is unavailable. Enable graphics acceleration or try another browser." : "Check your connection and try again. Your saved progress and upgrades are safe.";
    retry.hidden = false;
    retry.focus();
  }
  retry.addEventListener("click", retryNow);
  stage("Waking up the meadow…");
  return { stage, ready, fail, dispose };
}
function requireWebGL2(canvas) {
  let context;
  try {
    context = canvas.getContext("webgl2", {
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
      depth: true,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false
    });
  } catch {
  }
  if (!context) {
    const error = new Error("WebGL 2 context unavailable");
    error.code = "WEBGL_UNAVAILABLE";
    throw error;
  }
  return context;
}
const loading = createLoading();
async function boot() {
  try {
    loading.stage("Loading meadow essentials…");
    const { initializeMeadow } = await __vitePreload(async () => {
      const { initializeMeadow: initializeMeadow2 } = await import("./main-b4As-HHC.js").then((n) => n.m);
      return { initializeMeadow: initializeMeadow2 };
    }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
    await initializeMeadow(loading);
  } catch (error) {
    loading.fail(error);
    console.error(error);
  }
}
void boot();
export {
  __vitePreload as _,
  requireWebGL2 as r
};
