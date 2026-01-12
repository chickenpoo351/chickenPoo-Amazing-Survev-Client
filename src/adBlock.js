(() => {
  const REMOVE_SELECTORS = [
    ".ad-block-header"
  ];

  function removeAds() {
    for (const selector of REMOVE_SELECTORS) {
      document.querySelectorAll(selector).forEach(el => {
        el.remove();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeAds, { once: true });
  } else {
    removeAds();
  }

  const observer = new MutationObserver(removeAds);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  const style = document.createElement("style");
  style.textContent = `
    .ad-block-header {
      display: none !important;
      visibility: hidden !important;
    }
  `;
  document.documentElement.appendChild(style);
})();
