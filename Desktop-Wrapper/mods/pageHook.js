(() => {
  console.log("[pageHook] active");

  // --- Initialize global API and persist selection (I think...) ---
  window.CustomSkinAPI = window.CustomSkinAPI || {};
  window.CustomSkinAPI.enabled = true;

  try {
    const saved = localStorage.getItem("selectedCustomSkin");
    if (saved && saved !== "none") {
      window.CustomSkinAPI.pendingSkinId = saved;
      console.log("[pageHook] Pending skin found:", saved);
    }
  } catch (err) {
    console.warn("[pageHook] localStorage unavailable:", err);
  }

  // --- PIXI Cache Helper ---
  function getPixiCache() {
    return (
      window.PIXI?.TextureCache ||
      window.PIXI?.BaseTextureCache ||
      null
    );
  }

  // --- Message handler and IPC integration ---

  function applySkinById(selected, skins) {
    if (!selected) {
      console.warn('[pageHook] applySkin called without selected id');
      return;
    }

    const skin = skins?.[selected] || (window.CustomSkinAPI.pendingSkinId && skins?.[window.CustomSkinAPI.pendingSkinId]);
    if (!skin) {
      console.warn('[pageHook] No skin data available for:', selected);
      return;
    }

    window.CustomSkinAPI = window.CustomSkinAPI || {};
    window.CustomSkinAPI.pendingSkinId = selected;
    window.CustomSkinAPI.enabled = true;

    try { localStorage.setItem('selectedCustomSkin', selected); } catch (e) { }
    try { localStorage.setItem('customSkinData', JSON.stringify(skins)); } catch (e) { }


    const cache = getPixiCache();
    if (!cache) {
      console.warn('[pageHook] PIXI cache not ready');
      return;
    }

    window.CustomSkinAPI.currentSkin = skin;
    window.CustomSkinAPI.pendingSkinId = selected;
    window.CustomSkinAPI.enabled = true;

    console.log(`[pageHook] Set active custom skin: ${selected}`);

    const parts = {
      base: skin.base,
      hands: skin.hands,
      feet: skin.feet,
      backpack: skin.backpack,
    };

    Object.entries(parts).forEach(([key, url]) => {
      if (!url) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        try {
          const base = new window.PIXIBaseTexture(img);
          const tex = new window.PIXITexture(base);
          cache[`player-${key}.custom`] = tex;
          console.log(`[pageHook] Cached: player-${key}.custom`);
        } catch (err) {
          console.warn(`[pageHook] Failed to cache ${key}:`, err);
        }
      };
      img.onerror = () => {
        console.warn(`[pageHook] Failed to load image for ${key}:`, url);
      };
    });
  }

  function restoreSkin() {
    window.CustomSkinAPI.enabled = false;
    window.CustomSkinAPI.currentSkin = null;
    window.CustomSkinAPI.pendingSkinId = null;
    console.log('[pageHook] Restored default visuals');
  }

  // Listen for in-page messages 
  window.addEventListener('message', (e) => {
    if (!e.data || e.data.source !== 'ext-skin-replace') return;
    const { type, selected, skins } = e.data.payload || {};

    if (type === 'replace' && selected) applySkinById(selected, skins);
    if (type === 'restore') restoreSkin();
  });

  // Listen for IPC calls from the main/renderer via preload
  if (window.survevCustomSkinMessenger && window.survevCustomSkinMessenger.receiveMessage) {
    try {
      window.survevCustomSkinMessenger.receiveMessage('apply-skin', ({ id, customPaths }) => {
        let skins = customPaths;
        if (skins && typeof skins.base === 'string') {
          skins = { [id]: skins };
        }
        applySkinById(id, skins);
      });

      window.survevCustomSkinMessenger.receiveMessage('restore-skin', () => {
        restoreSkin();
      });


      window.survevCustomSkinMessenger.receiveMessage('restore-skin', () => restoreSkin());

      // For debugging / confirmation, listen for replies from main
      window.survevCustomSkinMessenger.receiveMessage('skin-applied', (data) => {
        console.log('[pageHook] IPC: skin-applied', data);
      });
      window.survevCustomSkinMessenger.receiveMessage('skin-restored', () => {
        console.log('[pageHook] IPC: skin-restored');
      });

      console.log('[pageHook] IPC listeners registered');
    } catch (err) {
      console.warn('[pageHook] Failed to register IPC listeners:', err);
    }
  }

  setInterval(() => {
    const c = window.CustomSkinAPI;
    if (!c || c.currentSkin) return;

    let pendingId = c.pendingSkinId || null;
    try {
      if (!pendingId) pendingId = localStorage.getItem('selectedCustomSkin');
    } catch (err) {
    }
    if (!pendingId) return;

    let skin = null;
    try {
      const raw = localStorage.getItem('customSkinData');
      if (raw) {
        const map = JSON.parse(raw);
        skin = map?.[pendingId] || null;
        if (!skin && map && typeof map.base === 'string') skin = map;
      }
    } catch (err) {
      console.warn('[pageHook] Could not read customSkinData from localStorage', err);
    }
    if (!skin) return;

    // PIXI caches availability
    const cache = getPixiCache();
    if (!cache || !window.PIXIBaseTexture || !window.PIXITexture) return;

    // set currentSkin so updateVisuals sees it
    c.currentSkin = skin;
    c.pendingSkinId = pendingId;
    c.enabled = true;
    console.log('[pageHook] Re-applying persisted skin:', pendingId);

    // Preload & cache textures exactly like the message handler does
    const parts = {
      base: skin.base,
      hands: skin.hands,
      feet: skin.feet,
      backpack: skin.backpack,
    };

    Object.entries(parts).forEach(([key, url]) => {
      if (!url) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        try {
          const base = new window.PIXIBaseTexture(img);
          const tex = new window.PIXITexture(base);
          cache[`player-${key}.custom`] = tex;
          console.log(`[pageHook] Cached (watcher): player-${key}.custom`);
        } catch (err) {
          console.warn(`[pageHook] Failed to cache (watcher) ${key}:`, err);
        }
      };
      img.onerror = () => {
        console.warn(`[pageHook] Failed to load image for watcher ${key}:`, url);
      };
    });
  }, 750);

})();