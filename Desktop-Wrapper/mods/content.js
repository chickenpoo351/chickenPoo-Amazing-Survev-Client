
(() => {
  console.log("[custom-skin] content script active");

  // --- Custom skin definitions ---
  const customPaths = {
    turkey: {
      base: "http://127.0.0.1:31337/skins/Turkey/player-base-outfitTurkey.svg",
      hands: "http://127.0.0.1:31337/skins/Turkey/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Turkey/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Turkey/player-circle-base-02.svg",
      tints: {
        baseTint: 0xf0cebb,
        handTint: 0xa51300,
        footTint: 0xa51300,
        backpackTint: 0xa85526,
      },
    },
    developer: {
      base: "http://127.0.0.1:31337/skins/Developr/player-base-outfitDC.svg",
      hands: "http://127.0.0.1:31337/skins/Developr/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Developr/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Developr/player-circle-base-02.svg",
      tints: {
        baseTint: 0x348628,
        handTint: 0x69da22,
        footTint: 0x69da22,
        backpackTint: 0x2c4b09,
      },
    },
    designer: {
      base: "http://127.0.0.1:31337/skins/Designr/player-base-outfitDC.svg",
      hands: "http://127.0.0.1:31337/skins/Designr/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Designr/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Designr/player-circle-base-02.svg",
      tints: {
        baseTint: 0xab3030,
        handTint: 0xe35f5f,
        footTint: 0xe35f5f,
        backpackTint: 0x6e1010,
      },
    },
    moderator: {
      base: "http://127.0.0.1:31337/skins/Moderatr/player-base-outfitDC.svg",
      hands: "http://127.0.0.1:31337/skins/Moderatr/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Moderatr/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Moderatr/player-circle-base-02.svg",
      tints: {
        baseTint: 0x3393db,
        handTint: 0x93c7ee,
        footTint: 0x93c7ee,
        backpackTint: 0x175686,
      },
    },
    wheat: {
      base: "http://127.0.0.1:31337/skins/Wheat/player-base-outfitWheat.svg",
      hands: "http://127.0.0.1:31337/skins/Wheat/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Wheat/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Wheat/player-circle-base-01.svg",
      tints: {
        baseTint: 0xffffff,
        handTint: 0xf0dd92,
        footTint: 0xf0dd92,
        backpackTint: 0xcba81d,
      },
    },
    noir: {
      base: "http://127.0.0.1:31337/skins/Noir/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Noir/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Noir/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Noir/player-circle-base-02.svg",
      tints: {
        baseTint: 0x1b1b1b,
        handTint: 0xffffff,
        footTint: 0xffffff,
        backpackTint: 0x777777,
      },
    },
    weathered: {
      base: "http://127.0.0.1:31337/skins/Weathered/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Weathered/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Weathered/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Weathered/player-circle-base-02.svg",
      tints: {
        baseTint: 0x9a1818,
        handTint: 0xff0000,
        footTint: 0xff0000,
        backpackTint: 0x530c0c,
      },
    },
    stifled: {
      base: "http://127.0.0.1:31337/skins/Stifled/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Stifled/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Stifled/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Stifled/player-circle-base-02.svg",
      tints: {
        baseTint: 0x173e99,
        handTint: 0x4eff,
        footTint: 0x4eff,
        backpackTint: 794700,
      },
    },
    siberian: {
      base: "http://127.0.0.1:31337/skins/Siberian/player-base-outfitSpetsnaz.svg",
      hands: "http://127.0.0.1:31337/skins/Siberian/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Siberian/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Siberian/player-circle-base-01.svg",
      tints: {
        baseTint: 0xffffff,
        handTint: 0xe4e4e4,
        footTint: 0xe4e4e4,
        backpackTint: 0xd2d2d2,
      },
    },
    green: {
      base: "http://127.0.0.1:31337/skins/Green/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Green/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Green/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Green/player-circle-base-02.svg",
      tints: {
        baseTint: 0x2aff00,
        handTint: 0xfeffaa,
        footTint: 0xfeffaa,
        backpackTint: 0xee9347,
      },
    },
    tallow: {
      base: "http://127.0.0.1:31337/skins/Tallow/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Tallow/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Tallow/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Tallow/player-circle-base-01.svg",
      tints: {
        baseTint: 0xc40000,
        handTint: 0x16b900,
        footTint: 0x16b900,
        backpackTint: 0x59300,
      },
    },
    imperial: {
      base: "http://127.0.0.1:31337/skins/Imperial/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Imperial/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Imperial/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Imperial/player-circle-base-01.svg",
      tints: {
        baseTint: 0xbc002d,
        handTint: 0xffffff,
        footTint: 0xffffff,
        backpackTint: 0xc0a73f,
      },
    },
    woodcutter: {
      base: "http://127.0.0.1:31337/skins/Woodcutter/player-base-outfitLumber.svg",
      hands: "http://127.0.0.1:31337/skins/Woodcutter/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Woodcutter/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Woodcutter/player-circle-base-02.svg",
      tints: {
        baseTint: 0xffffff,
        handTint: 0x7e0308,
        footTint: 0x7e0308,
        backpackTint: 0x4a1313,
      },
    },
    poncho: {
      base: "http://127.0.0.1:31337/skins/Poncho/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Poncho/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Poncho/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Poncho/player-circle-base-02.svg",
      tints: {
        baseTint: 0x1b400c,
        handTint: 0xb5c58b,
        footTint: 0xb5c58b,
        backpackTint: 0xab7c29,
      },
    },
    valiant: {
      base: "http://127.0.0.1:31337/skins/Valiant/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Valiant/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Valiant/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Valiant/player-circle-base-02.svg",
      tints: {
        baseTint: 0x990000,
        handTint: 0x4c1111,
        footTint: 0x4c1111,
        backpackTint: 0xffcc00,
      },
    },
    tarkhany: {
      base: "http://127.0.0.1:31337/skins/Tarkhany/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Tarkhany/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Tarkhany/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Tarkhany/player-circle-base-02.svg",
      tints: {
        baseTint: 0x4b2e83,
        handTint: 0xffb400,
        footTint: 0xffb400,
        backpackTint: 0x472060,
      },
    },
    water: {
      base: "http://127.0.0.1:31337/skins/Water/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Water/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Water/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Water/player-circle-base-02.svg",
      tints: {
        baseTint: 0x6cffe9,
        handTint: 0xf4005c,
        feetTint: 0xf4005c,
        backpackTint: 0x7f84,
      },
    },
    celestial: {
      base: "http://127.0.0.1:31337/skins/Celestial/player-base-outfitHeaven.svg",
      hands: "http://127.0.0.1:31337/skins/Celestial/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Celestial/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Celestial/player-circle-base-02.svg",
      tints: {
        baseTint: 0xffffff,
        handTint: 0xd2004f,
        footTint: 0xd2004f,
        backpackTint: 0x8e97,
      },
    },
    falling: {
      base: "http://127.0.0.1:31337/skins/Falling/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Falling/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Falling/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Falling/player-circle-base-02.svg",
      tints: {
        baseTint: 0x950000,
        handTint: 0xff7800,
        footTint: 0xff7800,
        backpackTint: 0x48231e,
      },
    },
    island: {
      base: "http://127.0.0.1:31337/skins/Island/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Island/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Island/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Island/player-circle-base-01.svg",
      tints: {
        baseTint: 0xffc600,
        handTint: 0x24600,
        footTint: 0x24600,
        backpackTint: 0x449700,
      },
    },
    aquatic: {
      base: "http://127.0.0.1:31337/skins/Aquatic/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Aquatic/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Aquatic/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Aquatic/player-circle-base-01.svg",
      tints: {
        baseTint: 0xbaa2,
        handTint: 0xffde,
        footTint: 0xffde,
        backpackTint: 0x8302c,
      },
    },
    coral: {
      base: "http://127.0.0.1:31337/skins/Coral/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Coral/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Coral/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Coral/player-circle-base-01.svg",
      tints: {
        baseTint: 0xff5f67,
        handTint: 0xff898f,
        footTint: 0xff898f,
        backpackTint: 0xffecca,
      },
    },
    initiative: {
      base: "http://127.0.0.1:31337/skins/Initiative/player-base-02.svg",
      hands: "http://127.0.0.1:31337/skins/Initiative/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Initiative/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Initiative/player-circle-base-02.svg",
      tints: {
        baseTint: 0xc3ae85,
        handTint: 0x8f8064,
        footTint: 0x8f8064,
        backpackTint: 0x40392c,
      },
    },
    jumpsuit: {
      base: "http://127.0.0.1:31337/skins/Jumpsuit/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Jumpsuit/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Jumpsuit/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Jumpsuit/player-circle-base-01.svg",
      tints: {
        baseTint: 0x857659,
        handTint: 0xc3ae85,
        footTint: 0xc3ae85,
        backpackTint: 0x40392c,
      },
    },
    core: {
      base: "http://127.0.0.1:31337/skins/Core/player-base-outfitParmaPrestige.svg",
      hands: "http://127.0.0.1:31337/skins/Core/player-hands-02.svg",
      feet: "http://127.0.0.1:31337/skins/Core/player-feet-02.svg",
      backpack: "http://127.0.0.1:31337/skins/Core/player-circle-base-02.svg",
      tints: {
        baseTint: 0xe3c081,
        handtint: 0xa9936b,
        footTint: 0xa9936b,
        backpackTint: 0x655231,
      },
    },
    casanova: {
      base: "http://127.0.0.1:31337/skins/Casanova/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Casanova/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Casanova/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Casanova/player-circle-base-01.svg",
      tints: {
        baseTint: 0x42080c,
        handTint: 0x740007,
        footTint: 0x740007,
        backpackTint: 0x101010,
      },
    },
    newblack: {
      base: "http://127.0.0.1:31337/skins/NewBlack/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/NewBlack/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/NewBlack/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/NewBlack/player-circle-base-01.svg",
      tints: {
        baseTint: 0xff5c22,
        handTint: 0xfc7523,
        footTint: 0xfc7523,
        backpackTint: 0xffae00,
      },
    },
    jester: {
      base: "http://127.0.0.1:31337/skins/Jester/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Jester/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Jester/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Jester/player-circle-base-01.svg",
      tints: {
        baseTint: 0x770078,
        handTint: 0x4b004c,
        footTint: 0x4b004c,
        backpackTint: 0xe4c00,
      },
    },
    woodland: {
      base: "http://127.0.0.1:31337/skins/Woodland/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Woodland/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Woodland/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Woodland/player-circle-base-01.svg",
      tints: {
        baseTint: 0x2b332a,
        handTint: 0x5a6c52,
        footTint: 0x5a6c52,
        backpackTint: 0x4d2600,
      },
    },
    fortune: {
      base: "http://127.0.0.1:31337/skins/Fortune/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Fortune/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Fortune/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Fortune/player-circle-base-01.svg",
      tints: {
        baseTint: 0x7f2723,
        handTint: 0xe8c22a,
        footTint: 0xe8c22a,
        backpackTint: 0x984f00,
      },
    },
    lime: {
      base: "http://127.0.0.1:31337/skins/Lime/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Lime/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Lime/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Lime/player-circle-base-01.svg",
      tints: {
        baseTint: 0xc7ff3f,
        handTint: 0xeeff5d,
        footTint: 0xeeff5d,
        backpackTint: 0xbc8737,
      },
    },
    cobalt: {
      base: "http://127.0.0.1:31337/skins/Cobalt/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Cobalt/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Cobalt/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Cobalt/player-circle-base-01.svg",
      tints: {
        baseTint: 0x2b57,
        handTint: 0x295e7c,
        footTint: 0x295e7c,
        backpackTint: 0x4a95,
      },
    },
    fragtastic: {
      base: "http://127.0.0.1:31337/skins/Fragtastic/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Fragtastic/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Fragtastic/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Fragtastic/player-circle-base-01.svg",
      tints: {
        baseTint: 0x62591f,
        handTint: 0x7f742a,
        footTint: 0x7f742a,
        backpackTint: 0x999999,
      },
    },
    carbon: {
      base: "http://127.0.0.1:31337/skins/Carbon/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Carbon/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Carbon/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Carbon/player-circle-base-01.svg",
      tints: {
        baseTint: 0x212121,
        handTint: 0x1c1c1c,
        footTint: 0x1c1c1c,
        backpackTint: 0x363636,
      },
    },
    professional: {
      base: "http://127.0.0.1:31337/skins/Professional/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Professional/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Professional/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Professional/player-circle-base-01.svg",
      tints: {
        baseTint: 0xf8c574,
        handTint: 0xbe7800,
        footTint: 0xbe7800,
        backpackTint: 0xa36700,
      },
    },
    desert: {
      base: "http://127.0.0.1:31337/skins/Desert/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Desert/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Desert/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Desert/player-circle-base-01.svg",
      tints: {
        baseTint: 0xd19b4e,
        handTint: 0xaa6d16,
        footTint: 0xaa6d16,
        backpackTint: 0xffcb82,
      },
    },
    forest: {
      base: "http://127.0.0.1:31337/skins/Forest/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Forest/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Forest/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Forest/player-circle-base-01.svg",
      tints: {
        baseTint: 0x999966,
        handTint: 0x848457,
        footTint: 0x848457,
        backpackTint: 0x666633,
      },
    },
    target: {
      base: "http://127.0.0.1:31337/skins/Target/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Target/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Target/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Target/player-circle-base-01.svg",
      tints: {
        baseTint: 0xff0000,
        handTint: 0xd40000,
        footTint: 0xd40000,
        backpackTint: 0xb70000,
      },
    },
    arctic: {
      base: "http://127.0.0.1:31337/skins/Arctic/player-base-01.svg",
      hands: "http://127.0.0.1:31337/skins/Arctic/player-hands-01.svg",
      feet: "http://127.0.0.1:31337/skins/Arctic/player-feet-01.svg",
      backpack: "http://127.0.0.1:31337/skins/Arctic/player-circle-base-01.svg",
      tints: {
        baseTint: 0xe3e3e3,
        handTint: 0xeeeeee,
        footTint: 0xeeeeee,
        backpackTint: 0xdcdcdc,
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

    window.survevCustomSkinMessenger.sendMessage('apply-skin', { id, customPaths });

    console.log(`[custom-skin] Requested skin apply: ${id}`);
  }


  function restoreOriginal() {
    window.survevCustomSkinMessenger.sendMessage('restore-skin');
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
        img: "http://127.0.0.1:31337/skins/Turkey/loot-shirt-outfitTurkey.svg",
      },
      developer: {
        name: "Developer Swag",
        rarity: "Mythic",
        desc: "The limited edition print.",
        img: "http://127.0.0.1:31337/skins/Developr/loot-shirt-outfitDev.svg",
      },
      designer: {
        name: "Game Designr",
        rarity: "Epic",
        desc: "For those who know.",
        img: "http://127.0.0.1:31337/skins/Designr/loot-shirt-outfitGD.svg",
      },
      moderator: {
        name: "Game Moderatr",
        rarity: "Epic",
        desc: "For those who wield the power of the pan.",
        img: "http://127.0.0.1:31337/skins/Moderatr/loot-shirt-outfitMod.svg",
      },
      wheat: {
        name: "Splintered Wheat",
        rarity: "Stock",
        desc: "Splinter rounds not included.",
        img: "http://127.0.0.1:31337/skins/Wheat/loot-shirt-outfitWheat.svg",
      },
      noir: {
        name: "Neo Noir",
        rarity: "Epic",
        desc: "The last Nevelskoy...",
        img: "http://127.0.0.1:31337/skins/Noir/loot-shirt-outfitNoir.svg",
      },
      weathered: {
        name: "Weathered Red",
        rarity: "Rare",
        desc: "Reminder of a glorious army.",
        img: "http://127.0.0.1:31337/skins/Weathered/loot-shirt-outfitWeathered.svg",
      },
      stifled: {
        name: "Stifled Blue",
        rarity: "Rare",
        desc: "Reminder of a fallen army.",
        img: "http://127.0.0.1:31337/skins/Stifled/loot-shirt-outfitStifled.svg",
      },
      siberian: {
        name: "Siberian Assualt",
        rarity: "Uncommon",
        desc: "For cold weather operations.",
        img: "http://127.0.0.1:31337/skins/Siberian/loot-shirt-outfitSpetsnaz.svg",
      },
      green: {
        name: "Greencloak",
        rarity: "Epic",
        desc: "King of the woods.",
        img: "http://127.0.0.1:31337/skins/Green/loot-shirt-outfitGreen.svg",
      },
      tallow: {
        name: "Tallow's Little Helper",
        rarity: "Uncommon",
        desc: "A nice helping hand.",
        img: "http://127.0.0.1:31337/skins/Tallow/loot-shirt-outfitTallow.svg",
      },
      imperial: {
        name: "Imperial Seal",
        rarity: "Uncommon",
        desc: "The Chrysanthemum Seal.",
        img: "http://127.0.0.1:31337/skins/Imperial/loot-shirt-outfitImperial.svg",
      },
      woodcutter: {
        name: "Woodcutter's Wrap",
        rarity: "Common",
        desc: "Fancy a pancake?",
        img: "http://127.0.0.1:31337/skins/Woodcutter/loot-shirt-outfitLumber.svg",
      },
      poncho: {
        name: "Poncho Verde",
        rarity: "Rare",
        desc: "A touch of green in the desert.",
        img: "http://127.0.0.1:31337/skins/Poncho/loot-shirt-outfitPoncho.svg",
      },
      valiant: {
        name: "Valiant Pineapple",
        rarity: "Rare",
        desc: "Not your average fruit.",
        img: "http://127.0.0.1:31337/skins/Valiant/loot-shirt-outfitValiant.svg",
      },
      tarkhany: {
        name: "Tarkhany Regal",
        rarity: "Rare",
        desc: "Only the finest for the finest.",
        img: "http://127.0.0.1:31337/skins/Tarkhany/loot-shirt-outfitTarkhany.svg",
      },
      water: {
        name: "Water Elemental",
        rarity: "Uncommon",
        desc: "Flow like the river.",
        img: "http://127.0.0.1:31337/skins/Water/loot-shirt-outfitWater.svg",
      },
      celestial: {
        name: "Celestial Garb",
        rarity: "Epic",
        desc: "Heavenly attire for the divine.",
        img: "http://127.0.0.1:31337/skins/Celestial/loot-shirt-outfitHeaven.svg",
      },
      falling: {
        name: "Falling Star",
        rarity: "Epic",
        desc: "Like a shooting star.",
        img: "http://127.0.0.1:31337/skins/Falling/loot-shirt-outfitFalling.svg",
      },
      island: {
        name: "Island Time",
        rarity: "Uncommon",
        desc: "No time like island time.",
        img: "http://127.0.0.1:31337/skins/Island/loot-shirt-outfitIsland.svg",
      },
      aquatic: {
        name: "Aquatic Avenger",
        rarity: "Rare",
        desc: "Protector of the deep.",
        img: "http://127.0.0.1:31337/skins/Aquatic/loot-shirt-outfitAquatic.svg",
      },
      coral: {
        name: "Coral Guise",
        rarity: "Uncommon",
        desc: "Now thats coral.",
        img: "http://127.0.0.1:31337/skins/Coral/loot-shirt-outfitCoral.svg",
      },
      initiative: {
        name: "The Initiative",
        rarity: "Common",
        desc: "For those within the Initiative.",
        img: "http://127.0.0.1:31337/skins/Initiative/loot-shirt-outfitInitiative.svg",
      },
      jumpsuit: {
        name: "PARMA Jumpsuit",
        rarity: "Common",
        desc: "Next generation inversion.",
        img: "http://127.0.0.1:31337/skins/Jumpsuit/loot-shirt-outfitParma.svg",
      },
      core: {
        name: "The Core Jumpsuit",
        rarity: "Rare",
        desc: "Special issue for staffers at Bunker 1.",
        img: "http://127.0.0.1:31337/skins/Core/loot-shirt-outfitParmaPrestige.svg",
      },
      casanova: {
        name: "Casanova Silks",
        rarity: "Common",
        desc: "I tried to warn them.",
        img: "http://127.0.0.1:31337/skins/Casanova/loot-shirt-outfitCasanova.svg",
      },
      newblack: {
        name: "The New Black",
        rarity: "Common",
        desc: "My lucky day!",
        img: "http://127.0.0.1:31337/skins/NewBlack/loot-shirt-outfitNewBlack.svg",
      },
      jester: {
        name: "Jesters Folly",
        rarity: "Common",
        desc: "I'm here for a withdrawl.",
        img: "http://127.0.0.1:31337/skins/Jester/loot-shirt-outfitJester.svg",
      },
      woodland: {
        name: "Woodland Combat",
        rarity: "Common",
        desc: "Common component of PARMA survival caches.",
        img: "http://127.0.0.1:31337/skins/Woodland/loot-shirt-outfitWoodland.svg",
      },
      fortune: {
        name: "Royal Fortune",
        rarity: "Rare",
        desc: "Fit for a king.",
        img: "http://127.0.0.1:31337/skins/Fortune/loot-shirt-outfitRoyalFortune.svg",
      },
      lime: {
        name: "Key Lime",
        rarity: "Common",
        desc: "Not for eating.",
        img: "http://127.0.0.1:31337/skins/Lime/loot-shirt-outfitKeyLime.svg",
      },
      cobalt: {
        name: "Cobalt Shell",
        rarity: "Common",
        desc: "It means bluish.",
        img: "http://127.0.0.1:31337/skins/Cobalt/loot-shirt-outfitCobaltShell.svg",
      },
      fragtastic: {
        name: "Fragtastic",
        rarity: "Common",
        desc: "Pin not included. Maybe.",
        img: "http://127.0.0.1:31337/skins/Fragtastic/loot-shirt-outfitFragtastic.svg",
      },
      carbon: {
        name: "Carbon Fiber",
        rarity: "Uncommon",
        desc: "Military-grade, fine spunt filament.",
        img: "http://127.0.0.1:31337/skins/Carbon/loot-shirt-outfitCarbonFiber.svg",
      },
      professional: {
        name: "The Professional",
        rarity: "Uncommon",
        desc: "True survivrs wear the dark gloves.",
        img: "http://127.0.0.1:31337/skins/Professional/loot-shirt-outfitDarkGloves.svg",
      },
      desert: {
        name: "Desert Camo",
        rarity: "Common",
        desc: "Stealth in the sand.",
        img: "http://127.0.0.1:31337/skins/Desert/loot-shirt-outfitDesertCamo.svg",
      },
      forest: { 
      name: "Forest Camo",
      rarity: "Common",
      desc: "Be one with the trees.",
      img: "http://127.0.0.1:31337/skins/Forest/loot-shirt-outfitCamo.svg",
      },
      target: {
        name: "Target Practice",
        rarity: "Common",
        desc: "On the plus side, they won't see you bleed.",
        img: "http://127.0.0.1:31337/skins/Target/loot-shirt-outfitRed.svg",
      },
      arctic: {
        name: "Arctic Avenger",
        rarity: "Common",
        desc: "No business like snow business.",
        img: "http://127.0.0.1:31337/skins/Arctic/loot-shirt-outfitWhite.svg",
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
})();
