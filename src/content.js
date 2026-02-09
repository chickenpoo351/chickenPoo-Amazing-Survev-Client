// browser compatability stuff
let browserRuntime;

if (typeof chrome !== "undefined" && chrome.runtime) {
  browserRuntime = chrome.runtime;
  console.log('using chrome API');
} else if (typeof browser !== "undefined" && browser.runtime) {
  browserRuntime = browser.runtime;
  console.log('using browser API');
}


// Inject pageHook.js into the page context
const script = document.createElement("script");
script.src = browserRuntime.getURL("pageHook.js");
(document.head || document.documentElement).appendChild(script);
script.remove();


(() => {
  console.log("[custom-skin] content script active");

  // --- Custom skin definitions ---
  const customPaths = {
    turkey: {
      base: browserRuntime.getURL("skins/Turkey/player-base-outfitTurkey.svg"),
      hands: browserRuntime.getURL("skins/Turkey/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Turkey/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Turkey/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xf0cebb,
        handTint: 0xa51300,
        footTint: 0xa51300,
        backpackTint: 0xa85526,
      },
    },
    developer: {
      base: browserRuntime.getURL("skins/Developr/player-base-outfitDC.svg"),
      hands: browserRuntime.getURL("skins/Developr/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Developr/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Developr/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x348628,
        handTint: 0x69da22,
        footTint: 0x69da22,
        backpackTint: 0x2c4b09,
      },
    },
    designer: {
      base: browserRuntime.getURL("skins/Designr/player-base-outfitDC.svg"),
      hands: browserRuntime.getURL("skins/Designr/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Designr/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Designr/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xab3030,
        handTint: 0xe35f5f,
        footTint: 0xe35f5f,
        backpackTint: 0x6e1010,
      },
    },
    moderator: {
      base: browserRuntime.getURL("skins/Moderatr/player-base-outfitDC.svg"),
      hands: browserRuntime.getURL("skins/Moderatr/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Moderatr/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Moderatr/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x3393db,
        handTint: 0x93c7ee,
        footTint: 0x93c7ee,
        backpackTint: 0x175686,
      },
    },
    wheat: {
      base: browserRuntime.getURL("skins/Wheat/player-base-outfitWheat.svg"),
      hands: browserRuntime.getURL("skins/Wheat/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Wheat/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Wheat/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xffffff,
        handTint: 0xf0dd92,
        footTint: 0xf0dd92,
        backpackTint: 0xcba81d,
      },
    },
    noir: {
      base: browserRuntime.getURL("skins/Noir/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Noir/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Noir/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Noir/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x1b1b1b,
        handTint: 0xffffff,
        footTint: 0xffffff,
        backpackTint: 0x777777,
      },
    },
    weathered: {
      base: browserRuntime.getURL("skins/Weathered/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Weathered/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Weathered/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Weathered/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x9a1818,
        handTint: 0xff0000,
        footTint: 0xff0000,
        backpackTint: 0x530c0c,
      },
    },
    stifled: {
      base: browserRuntime.getURL("skins/Stifled/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Stifled/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Stifled/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Stifled/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x173e99,
        handTint: 0x4eff,
        footTint: 0x4eff,
        backpackTint: 794700,
      },
    },
    siberian: {
      base: browserRuntime.getURL("skins/Siberian/player-base-outfitSpetsnaz.svg"),
      hands: browserRuntime.getURL("skins/Siberian/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Siberian/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Siberian/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xffffff,
        handTint: 0xe4e4e4,
        footTint: 0xe4e4e4,
        backpackTint: 0xd2d2d2,
      },
    },
    green: {
      base: browserRuntime.getURL("skins/Green/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Green/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Green/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Green/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x2aff00,
        handTint: 0xfeffaa,
        footTint: 0xfeffaa,
        backpackTint: 0xee9347,
      },
    },
    tallow: {
      base: browserRuntime.getURL("skins/Tallow/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Tallow/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Tallow/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Tallow/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xc40000,
        handTint: 0x16b900,
        footTint: 0x16b900,
        backpackTint: 0x59300,
      },
    },
    imperial: {
      base: browserRuntime.getURL("skins/Imperial/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Imperial/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Imperial/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Imperial/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xbc002d,
        handTint: 0xffffff,
        footTint: 0xffffff,
        backpackTint: 0xc0a73f,
      },
    },
    woodcutter: {
      base: browserRuntime.getURL("skins/Woodcutter/player-base-outfitLumber.svg"),
      hands: browserRuntime.getURL("skins/Woodcutter/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Woodcutter/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Woodcutter/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xffffff,
        handTint: 0x7e0308,
        footTint: 0x7e0308,
        backpackTint: 0x4a1313,
      },
    },
    poncho: {
      base: browserRuntime.getURL("skins/Poncho/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Poncho/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Poncho/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Poncho/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x1b400c,
        handTint: 0xb5c58b,
        footTint: 0xb5c58b,
        backpackTint: 0xab7c29,
      },
    },
    valiant: {
      base: browserRuntime.getURL("skins/Valiant/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Valiant/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Valiant/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Valiant/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x990000,
        handTint: 0x4c1111,
        footTint: 0x4c1111,
        backpackTint: 0xffcc00,
      },
    },
    tarkhany: {
      base: browserRuntime.getURL("skins/Tarkhany/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Tarkhany/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Tarkhany/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Tarkhany/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x4b2e83,
        handTint: 0xffb400,
        footTint: 0xffb400,
        backpackTint: 0x472060,
      },
    },
    water: {
      base: browserRuntime.getURL("skins/Water/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Water/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Water/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Water/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x6cffe9,
        handTint: 0xf4005c,
        feetTint: 0xf4005c,
        backpackTint: 0x7f84,
      },
    },
    celestial: {
      base: browserRuntime.getURL("skins/Celestial/player-base-outfitHeaven.svg"),
      hands: browserRuntime.getURL("skins/Celestial/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Celestial/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Celestial/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xffffff,
        handTint: 0xd2004f,
        footTint: 0xd2004f,
        backpackTint: 0x8e97,
      },
    },
    falling: {
      base: browserRuntime.getURL("skins/Falling/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Falling/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Falling/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Falling/player-circle-base-02.svg"),
      tints: {
        baseTint: 0x950000,
        handTint: 0xff7800,
        footTint: 0xff7800,
        backpackTint: 0x48231e,
      },
    },
    island: {
      base: browserRuntime.getURL("skins/Island/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Island/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Island/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Island/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xffc600,
        handTint: 0x24600,
        footTint: 0x24600,
        backpackTint: 0x449700,
      },
    },
    aquatic: {
      base: browserRuntime.getURL("skins/Aquatic/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Aquatic/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Aquatic/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Aquatic/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xbaa2,
        handTint: 0xffde,
        footTint: 0xffde,
        backpackTint: 0x8302c,
      },
    },
    coral: {
      base: browserRuntime.getURL("skins/Coral/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Coral/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Coral/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Coral/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xff5f67,
        handTint: 0xff898f,
        footTint: 0xff898f,
        backpackTint: 0xffecca,
      },
    },
    initiative: {
      base: browserRuntime.getURL("skins/Initiative/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Initiative/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Initiative/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Initiative/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xc3ae85,
        handTint: 0x8f8064,
        footTint: 0x8f8064,
        backpackTint: 0x40392c,
      },
    },
    jumpsuit: {
      base: browserRuntime.getURL("skins/Jumpsuit/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Jumpsuit/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Jumpsuit/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Jumpsuit/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x857659,
        handTint: 0xc3ae85,
        footTint: 0xc3ae85,
        backpackTint: 0x40392c,
      },
    },
    core: {
      base: browserRuntime.getURL("skins/Core/player-base-outfitParmaPrestige.svg"),
      hands: browserRuntime.getURL("skins/Core/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Core/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Core/player-circle-base-02.svg"),
      tints: {
        baseTint: 0xe3c081,
        handtint: 0xa9936b,
        footTint: 0xa9936b,
        backpackTint: 0x655231,
      },
    },
    casanova: {
      base: browserRuntime.getURL("skins/Casanova/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Casanova/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Casanova/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Casanova/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x42080c,
        handTint: 0x740007,
        footTint: 0x740007,
        backpackTint: 0x101010,
      },
    },
    newblack: {
      base: browserRuntime.getURL("skins/NewBlack/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/NewBlack/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/NewBlack/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/NewBlack/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xff5c22,
        handTint: 0xfc7523,
        footTint: 0xfc7523,
        backpackTint: 0xffae00,
      },
    },
    jester: {
      base: browserRuntime.getURL("skins/Jester/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Jester/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Jester/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Jester/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x770078,
        handTint: 0x4b004c,
        footTint: 0x4b004c,
        backpackTint: 0xe4c00,
      },
    },
    woodland: {
      base: browserRuntime.getURL("skins/Woodland/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Woodland/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Woodland/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Woodland/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x2b332a,
        handTint: 0x5a6c52,
        footTint: 0x5a6c52,
        backpackTint: 0x4d2600,
      },
    },
    fortune: {
      base: browserRuntime.getURL("skins/Fortune/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Fortune/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Fortune/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Fortune/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x7f2723,
        handTint: 0xe8c22a,
        footTint: 0xe8c22a,
        backpackTint: 0x984f00,
      },
    },
    lime: {
      base: browserRuntime.getURL("skins/Lime/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Lime/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Lime/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Lime/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xc7ff3f,
        handTint: 0xeeff5d,
        footTint: 0xeeff5d,
        backpackTint: 0xbc8737,
      },
    },
    cobalt: {
      base: browserRuntime.getURL("skins/Cobalt/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Cobalt/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Cobalt/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Cobalt/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x2b57,
        handTint: 0x295e7c,
        footTint: 0x295e7c,
        backpackTint: 0x4a95,
      },
    },
    fragtastic: {
      base: browserRuntime.getURL("skins/Fragtastic/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Fragtastic/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Fragtastic/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Fragtastic/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x62591f,
        handTint: 0x7f742a,
        footTint: 0x7f742a,
        backpackTint: 0x999999,
      },
    },
    carbon: {
      base: browserRuntime.getURL("skins/Carbon/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Carbon/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Carbon/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Carbon/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x212121,
        handTint: 0x1c1c1c,
        footTint: 0x1c1c1c,
        backpackTint: 0x363636,
      },
    },
    professional: {
      base: browserRuntime.getURL("skins/Professional/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Professional/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Professional/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Professional/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xf8c574,
        handTint: 0xbe7800,
        footTint: 0xbe7800,
        backpackTint: 0xa36700,
      },
    },
    desert: {
      base: browserRuntime.getURL("skins/Desert/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Desert/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Desert/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Desert/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xd19b4e,
        handTint: 0xaa6d16,
        footTint: 0xaa6d16,
        backpackTint: 0xffcb82,
      },
    },
    forest: {
      base: browserRuntime.getURL("skins/Forest/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Forest/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Forest/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Forest/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x999966,
        handTint: 0x848457,
        footTint: 0x848457,
        backpackTint: 0x666633,
      },
    },
    target: {
      base: browserRuntime.getURL("skins/Target/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Target/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Target/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Target/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xff0000,
        handTint: 0xd40000,
        footTint: 0xd40000,
        backpackTint: 0xb70000,
      },
    },
    arctic: {
      base: browserRuntime.getURL("skins/Arctic/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Arctic/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Arctic/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Arctic/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xe3e3e3,
        handTint: 0xeeeeee,
        footTint: 0xeeeeee,
        backpackTint: 0xdcdcdc,
      },
    },
    beach: {
      base: browserRuntime.getURL("skins/Beach/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Beach/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Beach/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Beach/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xedca7e,
        handTint: 0xfae5b6,
        footTint: 0xfae5b6,
        backpackTint: 0x7c995b,
      },
    },
    coconut: {
      base: browserRuntime.getURL("skins/Coconut/player-base-01.svg"),
      hands: browserRuntime.getURL("skins/Coconut/player-hands-01.svg"),
      feet: browserRuntime.getURL("skins/Coconut/player-feet-01.svg"),
      backpack: browserRuntime.getURL("skins/Coconut/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x765836,
        handTint: 0x362d22,
        footTint: 0xe9edf6,
        backpackTint: 0xe9edf6,
      },
    },
    tidal: {
      base: browserRuntime.getURL("skins/Tidal/player-base-02.svg"),
      hands: browserRuntime.getURL("skins/Tidal/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Tidal/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Tidal/player-circle-base-01.svg"),
      tints: {
        baseTint: 0x1198ec,
        handTint: 0xfdf5f1,
        footTint: 0xfdf5f1,
        backpackTint: 0x2178ae,
      },
    },
    parrot : {
      base: browserRuntime.getURL("skins/Parrot/player-base-outfitParrotfish.svg"),
      hands: browserRuntime.getURL("skins/Parrot/player-hands-02.svg"),
      feet: browserRuntime.getURL("skins/Parrot/player-feet-02.svg"),
      backpack: browserRuntime.getURL("skins/Parrot/player-circle-base-01.svg"),
      tints: {
        baseTint: 0xffffff,
        handTint: 0x3ac6c6,
        footTint: 0x306790,
        backpackTint: 0x37aeab,
      },
    },
  };

  // --- Send message to pageHook ---
  function applyCustomSkin(id) {
    if (!id || id === "none") return restoreOriginal();

    const skin = customPaths[id];
    if (!skin) {
      console.warn(`[custom-skin] Unknown skin ID: ${id}`);
      return;
    }

    try {
      localStorage.setItem('selectedCustomSkin', id);
      localStorage.setItem('customSkinData', JSON.stringify(customPaths));
    } catch (err) {
      console.warn('[custom-skin] localStorage write failed', err);
    }

    window.postMessage({
      source: "ext-skin-replace",
      payload: {
        type: "replace",
        selected: id,
        skins: customPaths,
      },
    });

    console.log(`[custom-skin] Requested skin apply: ${id}`);
  }


  function restoreOriginal() {
    window.postMessage({
      source: "ext-skin-replace",
      payload: { type: "restore" },
    });
    console.log("[custom-skin] Requested skin restore");
  }

  // --- Inject UI stuff ---
  function injectCustomSkinBoxes() {
    const list = document.querySelector("#modal-customize-list");
    if (!list || list.querySelector(".custom-skin")) return;

    const catalog = {
      turkey: {
        name: "Fowl Facade",
        rarity: "Rare",
        desc: "M1100 not included.",
        img: browserRuntime.getURL("skins/Turkey/loot-shirt-outfitTurkey.svg"),
      },
      developer: {
        name: "Developer Swag",
        rarity: "Mythic",
        desc: "The limited edition print.",
        img: browserRuntime.getURL("skins/Developr/loot-shirt-outfitDev.svg"),
      },
      designer: {
        name: "Game Designr",
        rarity: "Epic",
        desc: "For those who know.",
        img: browserRuntime.getURL("skins/Designr/loot-shirt-outfitGD.svg"),
      },
      moderator: {
        name: "Game Moderatr",
        rarity: "Epic",
        desc: "For those who wield the power of the pan.",
        img: browserRuntime.getURL("skins/Moderatr/loot-shirt-outfitMod.svg"),
      },
      wheat: {
        name: "Splintered Wheat",
        rarity: "Stock",
        desc: "Splinter rounds not included.",
        img: browserRuntime.getURL("skins/Wheat/loot-shirt-outfitWheat.svg"),
      },
      noir: {
        name: "Neo Noir",
        rarity: "Epic",
        desc: "The last Nevelskoy...",
        img: browserRuntime.getURL("skins/Noir/loot-shirt-outfitNoir.svg"),
      },
      weathered: {
        name: "Weathered Red",
        rarity: "Rare",
        desc: "Reminder of a glorious army.",
        img: browserRuntime.getURL("skins/Weathered/loot-shirt-outfitWeathered.svg"),
      },
      stifled: {
        name: "Stifled Blue",
        rarity: "Rare",
        desc: "Reminder of a fallen army.",
        img: browserRuntime.getURL("skins/Stifled/loot-shirt-outfitStifled.svg"),
      },
      siberian: {
        name: "Siberian Assualt",
        rarity: "Uncommon",
        desc: "For cold weather operations.",
        img: browserRuntime.getURL("skins/Siberian/loot-shirt-outfitSpetsnaz.svg"),
      },
      green: {
        name: "Greencloak",
        rarity: "Epic",
        desc: "King of the woods.",
        img: browserRuntime.getURL("skins/Green/loot-shirt-outfitGreen.svg"),
      },
      tallow: {
        name: "Tallow's Little Helper",
        rarity: "Uncommon",
        desc: "A nice helping hand.",
        img: browserRuntime.getURL("skins/Tallow/loot-shirt-outfitTallow.svg"),
      },
      imperial: {
        name: "Imperial Seal",
        rarity: "Uncommon",
        desc: "The Chrysanthemum Seal.",
        img: browserRuntime.getURL("skins/Imperial/loot-shirt-outfitImperial.svg"),
      },
      woodcutter: {
        name: "Woodcutter's Wrap",
        rarity: "Common",
        desc: "Fancy a pancake?",
        img: browserRuntime.getURL("skins/Woodcutter/loot-shirt-outfitLumber.svg"),
      },
      poncho: {
        name: "Poncho Verde",
        rarity: "Rare",
        desc: "A touch of green in the desert.",
        img: browserRuntime.getURL("skins/Poncho/loot-shirt-outfitPoncho.svg"),
      },
      valiant: {
        name: "Valiant Pineapple",
        rarity: "Rare",
        desc: "Not your average fruit.",
        img: browserRuntime.getURL("skins/Valiant/loot-shirt-outfitValiant.svg"),
      },
      tarkhany: {
        name: "Tarkhany Regal",
        rarity: "Rare",
        desc: "Only the finest for the finest.",
        img: browserRuntime.getURL("skins/Tarkhany/loot-shirt-outfitTarkhany.svg"),
      },
      water: {
        name: "Water Elemental",
        rarity: "Uncommon",
        desc: "Flow like the river.",
        img: browserRuntime.getURL("skins/Water/loot-shirt-outfitWater.svg"),
      },
      celestial: {
        name: "Celestial Garb",
        rarity: "Epic",
        desc: "Heavenly attire for the divine.",
        img: browserRuntime.getURL("skins/Celestial/loot-shirt-outfitHeaven.svg"),
      },
      falling: {
        name: "Falling Star",
        rarity: "Epic",
        desc: "Like a shooting star.",
        img: browserRuntime.getURL("skins/Falling/loot-shirt-outfitFalling.svg"),
      },
      island: {
        name: "Island Time",
        rarity: "Uncommon",
        desc: "No time like island time.",
        img: browserRuntime.getURL("skins/Island/loot-shirt-outfitIsland.svg"),
      },
      aquatic: {
        name: "Aquatic Avenger",
        rarity: "Rare",
        desc: "Protector of the deep.",
        img: browserRuntime.getURL("skins/Aquatic/loot-shirt-outfitAquatic.svg"),
      },
      coral: {
        name: "Coral Guise",
        rarity: "Uncommon",
        desc: "Now thats coral.",
        img: browserRuntime.getURL("skins/Coral/loot-shirt-outfitCoral.svg"),
      },
      initiative: {
        name: "The Initiative",
        rarity: "Common",
        desc: "For those within the Initiative.",
        img: browserRuntime.getURL("skins/Initiative/loot-shirt-outfitInitiative.svg"),
      },
      jumpsuit: {
        name: "PARMA Jumpsuit",
        rarity: "Common",
        desc: "Next generation inversion.",
        img: browserRuntime.getURL("skins/Jumpsuit/loot-shirt-outfitParma.svg"),
      },
      core: {
        name: "The Core Jumpsuit",
        rarity: "Rare",
        desc: "Special issue for staffers at Bunker 1.",
        img: browserRuntime.getURL("skins/Core/loot-shirt-outfitParmaPrestige.svg"),
      },
      casanova: {
        name: "Casanova Silks",
        rarity: "Common",
        desc: "I tried to warn them.",
        img: browserRuntime.getURL("skins/Casanova/loot-shirt-outfitCasanova.svg"),
      },
      newblack: {
        name: "The New Black",
        rarity: "Common",
        desc: "My lucky day!",
        img: browserRuntime.getURL("skins/NewBlack/loot-shirt-outfitNewBlack.svg"),
      },
      jester: {
        name: "Jesters Folly",
        rarity: "Common",
        desc: "I'm here for a withdrawl.",
        img: browserRuntime.getURL("skins/Jester/loot-shirt-outfitJester.svg"),
      },
      woodland: {
        name: "Woodland Combat",
        rarity: "Common",
        desc: "Common component of PARMA survival caches.",
        img: browserRuntime.getURL("skins/Woodland/loot-shirt-outfitWoodland.svg"),
      },
      fortune: {
        name: "Royal Fortune",
        rarity: "Rare",
        desc: "Fit for a king.",
        img: browserRuntime.getURL("skins/Fortune/loot-shirt-outfitRoyalFortune.svg"),
      },
      lime: {
        name: "Key Lime",
        rarity: "Common",
        desc: "Not for eating.",
        img: browserRuntime.getURL("skins/Lime/loot-shirt-outfitKeyLime.svg"),
      },
      cobalt: {
        name: "Cobalt Shell",
        rarity: "Common",
        desc: "It means bluish.",
        img: browserRuntime.getURL("skins/Cobalt/loot-shirt-outfitCobaltShell.svg"),
      },
      fragtastic: {
        name: "Fragtastic",
        rarity: "Common",
        desc: "Pin not included. Maybe.",
        img: browserRuntime.getURL("skins/Fragtastic/loot-shirt-outfitFragtastic.svg"),
      },
      carbon: {
        name: "Carbon Fiber",
        rarity: "Uncommon",
        desc: "Military-grade, fine spunt filament.",
        img: browserRuntime.getURL("skins/Carbon/loot-shirt-outfitCarbonFiber.svg"),
      },
      professional: {
        name: "The Professional",
        rarity: "Uncommon",
        desc: "True survivrs wear the dark gloves.",
        img: browserRuntime.getURL("skins/Professional/loot-shirt-outfitDarkGloves.svg"),
      },
      desert: {
        name: "Desert Camo",
        rarity: "Common",
        desc: "Stealth in the sand.",
        img: browserRuntime.getURL("skins/Desert/loot-shirt-outfitDesertCamo.svg"),
      },
      forest: {
        name: "Forest Camo",
        rarity: "Common",
        desc: "Be one with the trees.",
        img: browserRuntime.getURL("skins/Forest/loot-shirt-outfitCamo.svg"),
      },
      target: {
        name: "Target Practice",
        rarity: "Common",
        desc: "On the plus side, they won't see you bleed.",
        img: browserRuntime.getURL("skins/Target/loot-shirt-outfitRed.svg"),
      },
      arctic: {
        name: "Arctic Avenger",
        rarity: "Common",
        desc: "No business like snow business.",
        img: browserRuntime.getURL("skins/Arctic/loot-shirt-outfitWhite.svg"),
      },
      beach: {
        name: "Beach Shored",
        rarity: "Common",
        desc: "Stranded!",
        img: browserRuntime.getURL("skins/Beach/loot-shirt-outfitBeachShored.svg"),
      },
      coconut: {
        name: "Coconut Frenzy",
        rarity: "Common",
        desc: "It's the coco fruit!",
        img: browserRuntime.getURL("skins/Coconut/loot-shirt-outfitCoconutFrenzy.svg"),
      },
      tidal: {
        name: "Tidal Wave",
        rarity: "Common",
        desc: "Send them to Davy Jones' locker.",
        img: browserRuntime.getURL("skins/Tidal/loot-shirt-outfitWave.svg"),
      },
      parrot: {
        name: "Parrotfish",
        rarity: "Rare",
        desc: "Show off your scales around the island. Coral, beware!",
        img: browserRuntime.getURL("skins/Parrot/loot-shirt-outfitParrotfish.svg"),
      },
    };

    const rarityColors = {
      Stock: "#c5c5c5",
      Common: "#c5c5c5",
      Uncommon: "#12ff00",
      Rare: "#00deff",
      Epic: "#f600ff",
      Mythic: "#d96100",
    };

    for (const [id, data] of Object.entries(catalog)) {
      const item = document.createElement("div");
      item.className = "customize-list-item customize-list-item-unlocked custom-skin";
      item.dataset.customId = id;
      item.style.cursor = "pointer";

      const imgDiv = document.createElement("div");
      imgDiv.className = "customize-item-image";
      imgDiv.style.backgroundImage = `url(${data.img})`;
      item.appendChild(imgDiv);
      list.appendChild(item);

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        list.querySelectorAll(".custom-skin")
          .forEach((el) => el.classList.remove("customize-list-item-selected-blue"));
        item.classList.add("customize-list-item-selected-blue");

        localStorage.setItem("selectedCustomSkin", id);
        applyCustomSkin(id);

        const nameElem = document.getElementById("modal-customize-item-name");
        const rarityElem = document.getElementById("modal-customize-item-rarity");
        const loreElem = document.getElementById("modal-customize-item-lore");
        const sourceElem = document.getElementById("modal-customize-item-source");

        if (nameElem) nameElem.textContent = data.name;
        if (rarityElem) {
          rarityElem.textContent = data.rarity;
          rarityElem.style.color = rarityColors[data.rarity] || "#c5c5c5";
        }
        if (loreElem) loreElem.textContent = data.desc;
        if (sourceElem) sourceElem.textContent = "Acquired: Chicken's client";
      });
    }

    // None option
    const none = document.createElement("div");
    none.className = "customize-list-item customize-list-item-unlocked custom-skin";
    none.textContent = "None";
    none.style.display = "flex";
    none.style.alignItems = "center";
    none.style.justifyContent = "center";
    none.style.cursor = "pointer";
    list.appendChild(none);

    none.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      list.querySelectorAll(".custom-skin")
        .forEach((el) => el.classList.remove("customize-list-item-selected-blue"));
      localStorage.removeItem("selectedCustomSkin");
      restoreOriginal();
    });

    console.log("[custom-skin] UI injected");
  }

  // --- Apply saved skin on game load ---
  function autoApply() {
    const selected = localStorage.getItem("selectedCustomSkin");
    if (!selected || selected === "none") return;

    console.log("[custom-skin] Queued auto-apply for:", selected);

    const tryApply = setInterval(() => {
      if (window.CustomSkinAPI) {
        console.log("[custom-skin] Found CustomSkinAPI, reapplying saved skin:", selected);

        // Mark as pending for pageHook to pick up
        window.CustomSkinAPI.pendingSkinId = selected;
        window.CustomSkinAPI.enabled = true;

        // Apply the saved skin
        applyCustomSkin(selected);

        console.log("[custom-skin] Auto-applied custom skin:", selected);
        clearInterval(tryApply);
      } else {
        console.log("[custom-skin] Waiting for CustomSkinAPI...");
      }
    }, 1000);

    setTimeout(() => clearInterval(tryApply), 20000);
  }

  // --- Watch for the customization modal ---
  const observer = new MutationObserver(() => {
    const modal = document.getElementById("modal-customize");
    if (!modal) return;
    const visible = window.getComputedStyle(modal).display !== "none";
    if (visible) injectCustomSkinBoxes();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // --- Add selection styling ---
  const style = document.createElement("style");
  style.textContent = `
    .customize-list-item-selected-blue {
      opacity: 1 !important;
      border: 5px solid #3399ff !important;
      box-sizing: border-box !important;
    }`;
  document.head.appendChild(style);

  window.addEventListener("load", autoApply);

  // fps and ping stuff :o
  let lastFrame = performance.now();
  let smoothedFrameTime = 16.67;
  const smoothing = 0.1;

  const fpsUI = document.createElement("div");
  fpsUI.style.cssText = `
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 2147483647;
    background: rgba(0,0,0,0.7);
    color: white;
    font: 12px monospace;
    padding: 4px 8px;
  `;
  document.body.appendChild(fpsUI);

  function frameLoop(now) {
    const delta = now - lastFrame;
    lastFrame = now;

    smoothedFrameTime += (delta - smoothedFrameTime) * smoothing;

    const fps = 1000 / smoothedFrameTime;

    fpsUI.textContent = `${fps.toFixed(1)} FPS`;

    requestAnimationFrame(frameLoop);
  }

  requestAnimationFrame(frameLoop);


  let pingInterval = null;
  let urlInterval = null;


  const pingUI = document.createElement("div");
  pingUI.style.cssText = `
    position: fixed;
    top: 32px;
    left: 8px;
    z-index: 2147483647;
    background: rgba(0,0,0,0.7);
    color: white;
    font: 12px monospace;
    padding: 4px 8px;
  `;
  document.body.appendChild(pingUI);

  function detectServerChange() {
    const currentUrl = location.href;
    const isSpecialUrl = /\/#\w+/.test(currentUrl);

    const teamSelectElement = document.getElementById("team-server-select");
    const mainSelectElement = document.getElementById("server-select-main");

    const region =
      isSpecialUrl && teamSelectElement
        ? teamSelectElement.value
        : mainSelectElement
          ? mainSelectElement.value
          : null;

    if (region) {
      chrome.runtime.sendMessage({
        type: "SET_SERVER",
        region
      });
    }
  }

  function waitForServerSelect() {
    const observer = new MutationObserver(() => {
      const teamSelectElement =
        document.getElementById("team-server-select");
      const mainSelectElement =
        document.getElementById("server-select-main");

      if (teamSelectElement || mainSelectElement) {
        observer.disconnect();
        detectServerChange();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  waitForServerSelect();


  function updatePingUI() {
    try {
      chrome.runtime.sendMessage(
        { type: "GET_PING" },
        (result) => {
          if (chrome.runtime.lastError) {
            stopPingUI();
            return;
          }

          if (!result || result.ping == null) {
            pingUI.textContent = "Ping: --";
            return;
          }

          pingUI.textContent =
            `Ping (${result.region}): ${result.ping} ms`;
        }
      );
    } catch {
      stopPingUI();
    }
  }

  pingInterval = setInterval(updatePingUI, 300);

  document.addEventListener("change", (e) => {
    if (
      e.target.id === "team-server-select" ||
      e.target.id === "server-select-main"
    ) {
      detectServerChange();
    }
  });

  let lastUrl = location.href;
  urlInterval = setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      detectServerChange();
    }
  }, 500);

  // kill counter
  const killUI = document.createElement("div");
  killUI.style.cssText = `
    position: fixed;
    top: 56px;
    left: 8px;
    z-index: 2147483647;
    background: rgba(0,0,0,0.7);
    color: white;
    font: 12px monospace;
    padding: 4px 8px;
  `;
  document.body.appendChild(killUI);


  const inGameKillCounter =
    document.querySelector('.ui-player-kills.js-ui-player-kills');

  if (!inGameKillCounter) {
    console.warn('Kill counter not found');
    return;
  }

  function getKillAmount() {
    return inGameKillCounter.textContent.trim();
  }

  let lastKillCount = getKillAmount();
  killUI.textContent = `Kills: ${lastKillCount}`;

  const killObserver = new MutationObserver(() => {
    const currentKillCount = getKillAmount();

    if (currentKillCount !== lastKillCount) {
      lastKillCount = currentKillCount;
      killUI.textContent = `Kills: ${currentKillCount}`;
    }
  });

  killObserver.observe(inGameKillCounter, {
    characterData: true,
    childList: true,
    subtree: true
  });

  // UI stuff
  const modalSettingsBody = document.querySelector('#modal-settings-body');

  modalSettingsBody.style.cssText = `
    max-height: 80vh;
    overflow-y: auto;
  `

  function createSectionHeader(text) {
    const p = document.createElement('p');
    p.className = 'modal-settings-checkbox-text';
    p.textContent = text;
    return p;
  }

  function createUIToggle(checkBoxId, textContent) {
    if (document.getElementById(checkBoxId)) return null;

    let tempUIToggleCreation = document.createElement('div');
    tempUIToggleCreation.className = 'modal-settings-item';

    let tempCheckBox = document.createElement('input');
    tempCheckBox.type = 'checkbox';
    tempCheckBox.id = checkBoxId;

    const tempText = document.createElement('p');
    tempText.className = 'modal-settings-checkbox-text';
    tempText.textContent = textContent;

    tempUIToggleCreation.appendChild(tempCheckBox);
    tempUIToggleCreation.appendChild(tempText);

    return { tempCheckBox, tempUIToggleCreation }
  }

  let settingUINodes = [];

  const checkBoxModHeader = createSectionHeader('Chicken\'s Client Options');
  settingUINodes.push(checkBoxModHeader);

  const fpsToggle = createUIToggle('fps-checkbox', 'FPS Counter');
  const fpsToggleDiv = fpsToggle.tempUIToggleCreation;
  const fpsCheckBox = fpsToggle.tempCheckBox;
  settingUINodes.push(fpsToggleDiv);

  const pingToggle = createUIToggle('ping-checkbox', 'Ping Counter');
  const pingToggleDiv = pingToggle.tempUIToggleCreation;
  const pingCheckBox = pingToggle.tempCheckBox;
  settingUINodes.push(pingToggleDiv);

  const killToggle = createUIToggle('kill-checkbox', 'Kill Counter');
  const killToggleDiv = killToggle.tempUIToggleCreation;
  const killCheckBox = killToggle.tempCheckBox;
  settingUINodes.push(killToggleDiv);

  function injectModSettingsUI({ containerSelector, findAnchor, nodes }) {
    const container = document.querySelector(containerSelector);
    if (!container) return false;

    const anchor = findAnchor(container);
    if (!anchor) return false;

    anchor.after(...nodes);
    return true;
  }

  injectModSettingsUI({ containerSelector: '#modal-settings-body', findAnchor: (container) => [...container.children].find(div => div.querySelector('input#anonPlayerNames')), nodes: settingUINodes });

  function updateFPSVisibility() {
    fpsUI.style.display = fpsCheckBox.checked ? '' : 'none';
  }
  function updatePingVisibility() {
    pingUI.style.display = pingCheckBox.checked ? '' : 'none';
  }
  function updateKillVisibility() {
    killUI.style.display = killCheckBox.checked ? '' : 'none';
  }

  updateFPSVisibility();
  updatePingVisibility();
  updateKillVisibility();

  fpsCheckBox.addEventListener('change', updateFPSVisibility);
  pingCheckBox.addEventListener('change', updatePingVisibility);
  killCheckBox.addEventListener('change', updateKillVisibility);

})();
