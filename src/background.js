
let isChrome = false;
let isFirefox = false;

if (typeof chrome !== "undefined" && chrome.declarativeNetRequest) {
  isChrome = true;
  console.log("[Background] Running in Chrome.");
} else if (typeof browser !== "undefined" && browser.runtime) {
  isFirefox = true;
  console.log("[Background] Running in Firefox.");
} else {
  console.error("[Background] Unknown browser environment!");
}

async function setupChromeRules() {
  if (!isChrome) return;

  try {
    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("[Background] Existing rules:", existing.map(r => r.id));

    const addRules = [
      // ---- Redirects ----
      {
        id: 1,
        priority: 1,
        action: { type: "redirect", redirect: { extensionPath: "/C3zlxoP4.patched.js" } },
        condition: { urlFilter: "||survev.io/js/C3zlxoP4.js", resourceTypes: ["script"] },
      },
      {
        id: 2,
        priority: 1,
        action: { type: "redirect", redirect: { extensionPath: "/ZR85mxzY.patched.js" } },
        condition: { urlFilter: "||survev.io/js/ZR85mxzY.js", resourceTypes: ["script"] },
      },
      // ---- Ad blocking ----
      {
        id: 1001,
        priority: 1,
        action: { type: "block" },
        condition: { requestDomains: ["fuseplatform.net"], resourceTypes: ["script", "xmlhttprequest", "sub_frame"] },
      },
      {
        id: 1002,
        priority: 1,
        action: { type: "block" },
        condition: { requestDomains: ["cloudflareinsights.com"], resourceTypes: ["script"] },
      },
    ];

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existing.map(r => r.id),
      addRules,
    });

    console.log("[Background] Chrome declarativeNetRequest rules installed successfully.");
  } catch (err) {
    console.error("[Background] Failed to install Chrome rules:", err);
  }
}




function setupFirefoxRules() {
  if (!isFirefox) return;

  try {
    browser.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.url.includes("survev.io/js/DW7nj_xY.js")) {
          return { redirectUrl: browser.runtime.getURL("DW7nj_xY.patched.js") };
        } else if (details.url.includes("survev.io/js/L5e7910t.js")) {
          return { redirectUrl: browser.runtime.getURL("L5e7910t.patched.js") };
        }
      },
      {
        urls: ["*://survev.io/js/DW7nj_xY.js", "*://survev.io/js/L5e7910t.js"],
        types: ["script"],
      },
      ["blocking"]
    );

    console.log("[Background] Firefox webRequest redirect rules installed.");
  } catch (err) {
    console.error("[Background] Failed to install Firefox rules:", err);
  }
}

function init() {
  if (isChrome) {
    chrome.runtime.onInstalled.addListener(setupChromeRules);
    chrome.runtime.onStartup.addListener(setupChromeRules);
    setupChromeRules();
  }

  if (isFirefox) {
    browser.runtime.onInstalled.addListener(setupFirefoxRules);
    browser.runtime.onStartup.addListener(setupFirefoxRules);
    setupFirefoxRules();
  }
}

init();

// ping stuff
const SERVERS = {NA: "wss://usr.mathsiscoolfun.com:8001/ptc", EU: "wss://eur.mathsiscoolfun.com:8001/ptc", ASIA: "wss://asr.mathsiscoolfun.com:8001/ptc", SA: "wss://sa.mathsiscoolfun.com:8001/ptc"};

let currentRegion = null;
let latestPing = null;
let sessionStop = null;

function startSession(region) {
  const url = SERVERS[region];
  if (!url) return;

  let ws = null;
  let lastSend = 0;
  let active = true;
  const payload = new Uint8Array([0]).buffer;

  function stop() {
    active = false;
    try { ws?.close(); } catch {}
  }

  function connect() {
    ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";

    ws.onmessage = () => {
      if (!lastSend) return;
      latestPing = Math.round(performance.now() - lastSend);
    };

    ws.onclose = () => {
      if (active) {
        latestPing = null;
        setTimeout(connect, 1000);
      }
    };

    ws.onerror = () => ws.close();
  }

  connect();

  const ticker = setInterval(() => {
    if (!active) {
      clearInterval(ticker);
      return;
    }

    if (ws?.readyState === WebSocket.OPEN) {
      lastSend = performance.now();
      ws.send(payload);
    }
  }, 200);

  return stop;
}

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === "SET_SERVER") {
    const region = msg.region?.toUpperCase();
    if (!SERVERS[region]) return;

    currentRegion = region;
    latestPing = null;

    sessionStop?.();
    sessionStop = startSession(region);
  }

  if (msg.type === "GET_PING") {
    sendResponse(
      currentRegion
        ? { region: currentRegion, ping: latestPing }
        : null
    );
  }

  return true;
});
