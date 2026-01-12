
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
        action: { type: "redirect", redirect: { extensionPath: "/DW7nj_xY.patched.js" } },
        condition: { urlFilter: "||survev.io/js/DW7nj_xY.js", resourceTypes: ["script"] },
      },
      {
        id: 2,
        priority: 1,
        action: { type: "redirect", redirect: { extensionPath: "/L5e7910t.patched.js" } },
        condition: { urlFilter: "||survev.io/js/L5e7910t.js", resourceTypes: ["script"] },
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
