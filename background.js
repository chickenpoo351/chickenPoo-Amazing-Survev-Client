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
            redirect: { extensionPath: "/DZtQAHha.patched.js" }
          },
          condition: {
            urlFilter: "||survev.io/js/DZtQAHha.js",
            resourceTypes: ["script"]
          }
        },
        {
          id: 2,
          priority: 1,
          action: {
            type: "redirect",
            redirect: { extensionPath: "/C7Vkn0uv.patched.js" }
          },
          condition: {
            urlFilter: "||survev.io/js/C7Vkn0uv.js",
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
