let browserRuntime;
if (typeof chrome !== "undefined" && chrome.runtime) {
  browserRuntime = chrome.runtime;
} else if (typeof browser !== "undefined" && browser.runtime) {
  browserRuntime = browser.runtime;
} else {
  console.error("Neither chrome.runtime nor browser.runtime is available.");
}

async function updateRules() {
  try {
    if (browserRuntime === chrome.runtime) {
      const existing = await chrome.declarativeNetRequest.getDynamicRules();
      if (existing.length) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: existing.map(r => r.id)
        });
      }

      // Add redirect rules for both patched bundles
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: {
              type: "redirect",
              redirect: { extensionPath: "/DW7nj_xY.patched.js" }
            },
            condition: {
              urlFilter: "||survev.io/js/DW7nj_xY.js",
              resourceTypes: ["script"]
            }
          },
          {
            id: 2,
            priority: 1,
            action: {
              type: "redirect",
              redirect: { extensionPath: "/L5e7910t.patched.js" }
            },
            condition: {
              urlFilter: "||survev.io/js/L5e7910t.js",
              resourceTypes: ["script"]
            }
          }
        ]
      });

      console.log("[Survev Patch] Redirect rules for Chrome installed successfully.");
    } else if (browserRuntime === browser.runtime) {
      browser.webRequest.onBeforeRequest.addListener(
        (details) => {
          if (details.url.includes("survev.io/js/DW7nj_xY.js")) {
            return { redirectUrl: browser.runtime.getURL("/DW7nj_xY.patched.js") };
          } else if (details.url.includes("survev.io/js/L5e7910t.js")) {
            return { redirectUrl: browser.runtime.getURL("/L5e7910t.patched.js") };
          }
        },
        {
          urls: ["*://survev.io/js/DW7nj_xY.js", "*://survev.io/js/L5e7910t.js"],
          types: ["script"]
        },
        ["blocking"]
      );

      console.log("[Survev Patch] Redirect rules installed for Firefox.");
    }
  } catch (err) {
    console.error("[Survev Patch] Failed to apply redirect rules:", err);
  }
}

// Set up the event listeners to trigger the rule update
if (browserRuntime === chrome.runtime) {
  chrome.runtime.onInstalled.addListener(updateRules);
  chrome.runtime.onStartup.addListener(updateRules);
} else if (browserRuntime === browser.runtime) {
  browser.runtime.onInstalled.addListener(updateRules);
  browser.runtime.onStartup.addListener(updateRules);
}
