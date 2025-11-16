(function initFPSandPing() {
    // --- Overlay root container ---
    const overlayRoot = document.createElement("div");
    Object.assign(overlayRoot.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2147483647,
        fontFamily: "monospace",
    });
    window.top.document.body.appendChild(overlayRoot);

    // --- Helper to create overlay elements ---
    const createOverlay = (color, topOffset) => {
        const el = window.top.document.createElement("div");
        Object.assign(el.style, {
            position: "fixed",
            top: `${topOffset}px`,
            left: "10px",
            background: "rgba(0,0,0,0.65)",
            color,
            padding: "2px 6px",
            borderRadius: "5px",
            fontSize: "15px",
            lineHeight: "1",
            pointerEvents: "none",
            display: "none",
            transition: "top 0.25s ease",
        });
        overlayRoot.appendChild(el);
        return el;
    };

    const fpsOverlay = createOverlay("#0f0", 10);
    const pingOverlay = createOverlay("#0ff", 30);

    // --- FPS tracking ---
    let lastFrame = performance.now();
    let frames = 0;
    let fps = 0;
    function measureFPS(ts) {
        frames++;
        if (ts - lastFrame >= 1000) {
            fps = frames;
            frames = 0;
            lastFrame = ts;
        }
        requestAnimationFrame(measureFPS);
    }
    requestAnimationFrame(measureFPS);

    // --- Ping tracking ---
    let currentSocket = null;
    let lastSend = 0;
    let lastRecv = performance.now();
    let smoothedPing = 0;
    const pingSamples = [];
    const OriginalWS = window.WebSocket;
    window.WebSocket = function (url, ...args) {
        const ws = new OriginalWS(url, ...args);
        ws.addEventListener("open", () => {
            if (/\/play\?gameId=/.test(url)) {
                console.log("[Overlay] Hooked gameplay socket:", url);
                currentSocket = ws;
                pingSamples.length = 0;
                smoothedPing = 0;
            }
        });
        const origSend = ws.send.bind(ws);
        ws.send = (data) => {
            if (ws === currentSocket) lastSend = performance.now();
            origSend(data);
        };
        ws.addEventListener("message", (ev) => {
            if (ws !== currentSocket) return;
            const now = performance.now();
            const size = ev.data?.byteLength || ev.data?.length || 0;
            const delta = now - lastSend;
            if (size < 64 && delta > 0 && delta < 2000) {
                pingSamples.push(delta);
                if (pingSamples.length > 10) pingSamples.shift();
                smoothedPing =
                    pingSamples.reduce((a, b) => a + b, 0) / pingSamples.length;
            }
            lastRecv = now;
        });
        return ws;
    };
    window.WebSocket.prototype = OriginalWS.prototype;

    // --- Visibility helpers ---
    function isVisible(el) {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            parseFloat(style.opacity || "1") > 0
        );
    }

    // --- Core logic ---
    const gameWrapper = document.querySelector("#game-area-wrapper");

    function updateVisibility() {
        const spectateWrapper = document.querySelector("#ui-spectate-options-wrapper");
        const spectateOptions = document.querySelector("#ui-spectate-options");
        const deathContainer = document.querySelector("#ui-stats");

        const spectating =
            spectateWrapper &&
            getComputedStyle(spectateWrapper).display !== "none" &&
            spectateWrapper.getBoundingClientRect().height > 10;

        const dead = isVisible(deathContainer);

        const inGame =
            gameWrapper &&
            window.getComputedStyle(gameWrapper).display !== "none" &&
            currentSocket?.readyState === 1;

        // show overlays only in game
        fpsOverlay.style.display = inGame ? "block" : "none";
        pingOverlay.style.display = inGame ? "block" : "none";

        // position logic
        const baseTopFPS = 10;
        const baseTopPing = 45;
        let offset = 0;
        if (dead) offset += 80;        // death screen offset
        if (spectating) offset += 95;  // spectate offset

        fpsOverlay.style.top = `${baseTopFPS + offset}px`;
        pingOverlay.style.top = `${baseTopPing + offset}px`;
    }

    // --- Regular updates ---
    setInterval(() => {
        updateVisibility();
        if (fpsOverlay.style.display === "none") return;
        fpsOverlay.textContent = `FPS: ${fps}`;
    }, 500);

    setInterval(() => {
        updateVisibility();
        if (pingOverlay.style.display === "none") return;
        const now = performance.now();
        let pingText = "Ping: (idle)";
        if (
            currentSocket &&
            currentSocket.readyState === 1 &&
            now - lastRecv < 3000
        ) {
            const pingMs = Math.round(smoothedPing);
            pingText = `Ping: ${pingMs} ms`;
            pingOverlay.style.color =
                pingMs < 70 ? "#0f0" : pingMs < 120 ? "#ff0" : "#f00";
        }
        pingOverlay.textContent = pingText;
    }, 500);

    // expose overlays for debugging
    window.FPSOverlay = fpsOverlay;
    window.PingOverlay = pingOverlay;
})();
