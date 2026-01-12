const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('survevCustomSkinMessenger', {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receiveMessage: (channel, callback) => {
    ipcRenderer.on(channel, (event, data) => callback(data));
  }
});

function setupAdBlocker() {
  const removeAds = () => {
    document
      .querySelectorAll(".ad-block-header, iframe.ad-frame")
      .forEach(el => el.remove());
  };
  removeAds();

  if (document.body) {
    const observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10_000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const script2 = document.createElement('script');
  script2.src = 'http://127.0.0.1:31337/mods/pageHook.js';
  script2.onload = () => {
    console.log("[preload] pageHook.js injected successfully.");
  };
  script2.onerror = (error) => {
    console.error("[preload] Error loading pageHook.js:", error);
  };
  document.body.appendChild(script2);
  
  const script = document.createElement('script');
  script.src = 'http://127.0.0.1:31337/mods/content.js';
  script.onload = () => {
    console.log("[preload] content.js injected successfully.");
  };
  script.onerror = (error) => {
    console.error("[preload] Error loading content.js:", error);
  };
  document.body.appendChild(script);

  setupAdBlocker();  
});
