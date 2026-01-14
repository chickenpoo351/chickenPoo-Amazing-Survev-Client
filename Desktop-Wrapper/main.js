const { app, BrowserWindow, session, ipcMain } = require("electron");
const path = require("path");
const express = require("express");

function startModServer(port = 31337) {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
  });

  app.use("/mods", express.static(path.join(__dirname, "mods")));
  app.use("/skins", express.static(path.join(__dirname, "skins")));

  return new Promise(resolve => {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log("Mod server running on port", port);
      resolve(server);
    });
  });
}

async function createWindow() {
  const MOD_PORT = 31337;
  await startModServer(MOD_PORT);

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // Filter console spam
  win.webContents.on("console-message", (event, level, message) => {
    if (
      message.includes("Autofill.enable") ||
      message.includes("Autofill.setAddresses") ||
      message.includes("ERR_CERT") ||
      message.includes("ERR_CONNECTION") ||
      message.includes("ERR_NAME")
    ) {
      event.preventDefault();
    }
  });

  win.webContents.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );

  // Block unwanted requests / patch scripts
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ["*://*/*"] },
    (details, callback) => {
      const url = details.url;

      if (
        url.includes("fuseplatform.net") ||
        url.includes("cloudflareinsights.com")
      ) {
        return callback({ cancel: true });
      }
      if (url === "https://survev.io/js/Dw7nj_xY.js") {
        return callback({
          redirectURL: "http://127.0.0.1:31337/mods/DW7nj_xY.patched.js"
        });
      }
      if (url === "https://survev.io/js/L5e7910t.js") {
        return callback({
          redirectURL: "http://127.0.0.1:31337/mods/L5e7910t.patched.js"
        });
      }

      callback({});
    }
  );

  win.loadURL("https://survev.io");
  win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);

ipcMain.on('apply-skin', (event, { id, customPaths }) => {
  console.log(`Applying skin: ${id}`);
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  senderWindow.webContents.send('apply-skin', { id, customPaths });
  event.sender.send('skin-applied', { id, customPaths });
});

ipcMain.on('restore-skin', (event) => {
  console.log('Restoring original skin');
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  senderWindow.webContents.send('restore-skin');
  event.sender.send('skin-restored');
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
