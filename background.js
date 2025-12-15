// background.js

chrome.runtime.onInstalled.addListener(updateRules);
chrome.runtime.onStartup.addListener(updateRules);

async function updateRules() {
  try {
    // Remove existing dynamic rules
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

    console.log("[Survev Patch] Redirect rules installed successfully.");
  } catch (err) {
    console.error("[Survev Patch] Failed to apply redirect rules:", err);
  }
}
