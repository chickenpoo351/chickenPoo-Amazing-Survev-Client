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

  // --- Message handler ---
  window.addEventListener("message", (e) => {
    if (!e.data || e.data.source !== "ext-skin-replace") return;

    const { type, selected, skins } = e.data.payload;

    if (!window.CustomSkinAPI || !window.PIXITexture || !window.PIXIBaseTexture) {
      console.warn("[pageHook] Hooks not ready yet");
      return;
    }

    const cache = getPixiCache();
    if (!cache) {
      console.warn("[pageHook] PIXI cache not ready");
      return;
    }

    // --- Apply new custom skin ---
    if (type === "replace" && selected) {
      const skin = skins?.[selected] || window.CustomSkinAPI.pendingSkinId && skins?.[window.CustomSkinAPI.pendingSkinId];
      if (!skin) {
        console.warn("[pageHook] No skin data available for:", selected);
        return;
      }

      window.CustomSkinAPI.currentSkin = skin;
      window.CustomSkinAPI.pendingSkinId = selected;
      window.CustomSkinAPI.enabled = true;

      console.log(`[pageHook] Set active custom skin: ${selected}`);

      // Preload and cache textures
      const parts = {
        base: skin.base,
        hands: skin.hands,
        feet: skin.feet,
        backpack: skin.backpack,
      };

      Object.entries(parts).forEach(([key, url]) => {
        const img = new Image();
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
      });
    }

    if (type === "restore") {
      window.CustomSkinAPI.enabled = false;
      window.CustomSkinAPI.currentSkin = null;
      window.CustomSkinAPI.pendingSkinId = null;
      console.log("[pageHook] Restored default visuals");
    }
  });

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